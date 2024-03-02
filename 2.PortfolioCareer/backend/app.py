from flask import Flask,request,jsonify,redirect ,session ,url_for 

from flask_dance.contrib.google import make_google_blueprint, google
from flask_jwt_extended import JWTManager,jwt_required,create_access_token ,get_jwt_identity,get_current_user
from pymongo import MongoClient

from gridfs import GridFS
import hashlib
from flask_cors import CORS
import os
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
import urllib.parse
import json
import requests
from dotenv import  load_dotenv
load_dotenv()

from pathlib import Path
from datetime import datetime,timedelta

load_dotenv()

#auth
from authlib .integrations .flask_client import OAuth

#mail
from flask_mail import Mail ,Message

app  = Flask(__name__)
CORS(app, origins=os.getenv('FRONTEND_URL'), supports_credentials=True)

app.secret_key = os.urandom(12)

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)
jwt = JWTManager(app)

# client = MongoClient('mongodb://localhost:27017/')
client = MongoClient(os.getenv('MONGODB_URI'))
db = client['AI_database']

app.config["GOOGLE_OAUTH_CLIENT_ID"] = os.getenv('GOOGLE_OAUTH_CLIENT_ID')
app.config["GOOGLE_OAUTH_CLIENT_SECRET"] = os.getenv('GOOGLE_OAUTH_CLIENT_SECRET')

google_blueprint = make_google_blueprint(
    client_id=os.getenv('GOOGLE_OAUTH_CLIENT_ID'),
    client_secret=os.getenv('GOOGLE_OAUTH_CLIENT_SECRET'),
    scope=["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile", "openid"]
)
app.register_blueprint(google_blueprint, url_prefix="/login")

# app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
# app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT'))
# app.config['MAIL_USE_SSL'] = os.getenv('MAIL_USE_SSL') == 'True'
# app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
# app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')

app.config['UPLOAD_FOLDER'] = 'files'

# mail = Mail(app)
fs = GridFS(db)

@app.route("/")
def index():
    if not google.authorized:
        return redirect(url_for("google.login"))
    return redirect(url_for("google_callback"))

@app.route("/callback")
def google_callback():
    if not google.authorized:
        return jsonify({"error": "Failed to log in."}),  400
    resp = google.get("/oauth2/v1/userinfo")
    assert resp.ok, resp.text
    user_info = resp.json()

    exist_user = db.AllUser.find_one({'email':user_info['email']},{'first_name':1})

    if (not exist_user):
        db.AllUser.insert_one({'first_name':user_info['given_name'] ,'last_name': user_info['family_name'],'email':user_info['email']})

    token = create_access_token(identity=user_info['email'])
    
    user_info['access_token'] = token
    
    user_info_str = urllib.parse.quote(json.dumps(user_info))
    
    return redirect(f"{os.getenv('FRONTEND_URL')}/login?data={user_info_str}", code=302)

@app.route('/chef/signup' ,methods =['POST'])
def sign_up():

    if request.method  == 'POST':
        data = request.get_json()

        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
        password = data.get('password')
        password_repeat= data.get('password_repeat')
        


        exist_user  =db.AllUser.find_one({'email':email},{'first_name':1})

        if exist_user:
            return jsonify({"message":"User Already registered"}),409
        if password != password_repeat:
            return jsonify({'message':'Password not match'})
        db.AllUser.insert_one({'first_name':first_name ,'last_name':last_name,'email':email,'password':password})
        
        return jsonify({'message':'SignUp Successful'}),201
  
@app.route('/chef/login' ,methods =['POST'])
def login():
    if request.method =='POST':
        data=request.get_json()

        email = data.get('email')
        password  = data.get('password')
        session['email'] = email
        
        login_user = db.AllUser.find_one({'email':email ,'password':password})
        if login_user:
            access_token = create_access_token(identity= email)
           
            login_user = db.AllUser.find_one({'email':email},{'first_name':1 ,'last_name':1})

            kname = login_user['first_name']+" "+login_user['last_name']
            session['is_login'] = True
            return jsonify(message = 'Login Successful',access_token = access_token ,email = email ,name = kname)
        else:
            return  jsonify({'message':'Invalid email and password'}),401

@app.route('/chef/createDish',methods = ['POST'])
@jwt_required()
def create_dish():
    
    user_info = get_jwt_identity()
    
    login_user = db.AllUser.find_one({'email':user_info})

    kname = login_user['first_name']+" "+login_user['last_name']

    #dish_name =  request.form.get('name')
    #veg_non_veg = request.form.get('veg_non_veg')
    # description = request.form.get('description')

    #pop_state = request.form.get('popularity_state')

    #cuisine = request.form.get('cuisine')
    #kitchen_equi = request.form.get('kitchen_equipments')
    #course_type= request.form.get('course_type')

    temp = request.get_json()
    instructions = request.get_json()
    dish_name  = temp['name']
    veg_non_veg = temp['veg_non_veg']
    description = temp['description']
    pop_state = temp['popularity_state']
    cuisine = temp['cuisine']
    #image = temp['image'] #comment
    cooking_time = temp['cooking_time']
    kitchen_equip = temp['kitchen_equipments']
    course = temp['courses']

    ingre = temp['ingredients']
    instru = temp['instructions']

    formatted_time = datetime.datetime.now().strftime("%H:%M:%S")
    formatted_date = datetime.datetime.now().strftime("%Y-%m-%d")
    
    db.Dish.insert_one({"created_by":kname ,"indegrients": ingre,"instructions":instru ,"description":description,"dish_name":dish_name,"veg_non_veg":veg_non_veg,"popularity_state":pop_state,"Cuisine":cuisine,"cooking_time":cooking_time,"kitchen_equipments":kitchen_equip,"courses":course,"Created_date":formatted_date,"Created_time":formatted_time,"email":user_info})
    
    return jsonify({'message':'Dished Saved Successfully'}),201

    
@app.route('/myAccount',methods = ['GET'])
@jwt_required()
def myAccount():

    user_info = get_jwt_identity()   
    login_user = db.AllUser.find_one({'email':user_info},{'first_name':1 ,'last_name':1})
    name = login_user['first_name']+" " +login_user['last_name']
    '''
    if filterCuisine =="Indian" or filterCuisine == "Chinese":
        dis = db.Dish.find({"created_by":name ,"Cuisine":filterCuisine,"email":user_info})
        
        output =[]
        for dish in dis:
            dish_data = {
                "id":str(dish['_id']),
                "name" :dish['dish_name'],
                "cuisine":dish['Cuisine'],
                "veg_non":dish['veg_non_veg'],
                "course_type":dish['courses'],
                "Created_date":dish['Created_date'],
                "Created_time":dish['Created_time'],
                "description":dish['description']   
            }
            output.append(dish_data)

        print("heello 8")
        return jsonify(output)
    
    else:
    
    '''
    All_dis = db.Dish.find({'email':user_info})
    output3  =[]

    for dish in All_dis:
        dish_data = {
                "id":str(dish['_id']),
                "name" :dish['dish_name'],
                "cuisine":dish['Cuisine'],
                "veg_non":dish['veg_non_veg'],
                "course_type":dish['courses'],
                "created_date":dish['Created_date'],
                "created_time":dish['Created_time'],
                "description":dish['description']   
        }
        output3.append(dish_data)

    return jsonify(output3)
    


@app.route('/api/dish/filter/<string:id>/id/',methods =['GET'])
@jwt_required()
def  filter_by_id(id):

    dishes = db.Dish.find({'_id':id})

    return jsonify(dishes)

@app.route('/show')
@jwt_required()
def show():
    user_info  = get_jwt_identity()
    login_user = db.AllUser.find_one({'email':user_info},{'first_name':1 ,'last_name':1})
    name = login_user['first_name']  +" " + login_user['last_name']
    return jsonify({'name':name ,'email':user_info}) 
    
@app.route('/api/contact',methods =['POST'])
def contact():

    data = request.get_json()
    name = data['name']
    email = data['email']
    message =data['message']

    db.Contact.insert_one({'name':name,'email':email ,'message':message})

    return jsonify({"message":"Message submitted succesfully"})

@app.route('/career' ,methods = ['POST'])
def carrer():
    if request.method =="POST":
        applied_for = request.form.get("appliedFor")
        personal = request.form.get("personal")
        experiences = request.form.get("experiences")
        education = request.form.get("education")
        skills = request.form.get('skills')
        socials_json = request.form.get('socials')
        socials = json.loads(socials_json) if socials_json else {}
        all_questions = request.form.get("allQuestions")
        voluntary_questions = request.form.get("voluntaryDisclosures")

        ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpeg'}
        certificate = request.files["certificate"]
        filename = certificate.filename
        timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
        new_filename = f"{timestamp}-{filename}"

        if '.' in new_filename and new_filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS:
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], new_filename)
            certificate.save(file_path)

            db.carrers.insert_one({
                'applied_for': applied_for,
                'personal': personal,
                'experience': experiences,
                'education': education,
                'skills': skills,
                'socials': socials,
                'all_questions': all_questions,
                'voluntary_questions': voluntary_questions,
                'certificate': file_path
            })
            return jsonify({'message':'Application submitted successfully'}), 201
        else:
            return jsonify({'message': 'Invalid file format'}), 400

def calculate_hash(content):
    md5 = hashlib.md5()
    md5.update(content)
    return md5.hexdigest()

if __name__ =="__main__":
    app.run(debug= True)