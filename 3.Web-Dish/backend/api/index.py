from flask import Flask, request, jsonify,url_for,redirect,session,render_template
from pymongo import MongoClient
from pymongo.errors import PyMongoError
import mysql.connector
from flask_jwt_extended import create_access_token ,jwt_required ,create_refresh_token ,JWTManager,get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS,cross_origin
from flask_dance.contrib.google import make_google_blueprint, google
from msal import ConfidentialClientApplication
import os
from flask_session import Session
import identity
import identity.web
import requests
from datetime import datetime, timedelta
from dotenv import load_dotenv
load_dotenv()
from pathlib import Path
import json
import urllib
import msal
import random
import string 
import base64
from flask_apscheduler import APScheduler
from email.message import EmailMessage
from flask_mail import Mail ,Message
from functools import lru_cache


app = Flask(__name__)
CORS(app, origins="*", supports_credentials=True)

os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
app.secret_key = os.urandom(12)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
jwt = JWTManager(app)
scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()


client = MongoClient(os.getenv('MONGODB_URL'))
db = client['AI_Chef_Master']

mysql = mysql.connector.connect(
    host=os.getenv('MYSQL_HOST'),
    user=os.getenv('MYSQL_USER'),
    password=os.getenv('MYSQL_PASSWORD'),
    database=os.getenv('MYSQL_DATABASE')
)

# google login 
app.config["GOOGLE_OAUTH_CLIENT_ID"] = os.getenv('GOOGLE_OAUTH_CLIENT_ID')
app.config["GOOGLE_OAUTH_CLIENT_SECRET"] = os.getenv('GOOGLE_OAUTH_CLIENT_SECRET')


# email configuration 
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.getenv('YOUR_EMAIL_ADDRESS')
app.config['MAIL_PASSWORD'] = os.getenv('YOUR_EMAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app) 

google_blueprint = make_google_blueprint(
    client_id=os.getenv('GOOGLE_OAUTH_CLIENT_ID'),
    client_secret=os.getenv('GOOGLE_OAUTH_CLIENT_SECRET'),
    scope=["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile", "openid"]
)
app.register_blueprint(google_blueprint, url_prefix="/login")

@app.route("/")
def index():
    if not google.authorized:
        return redirect(url_for("google.login"))
    return redirect(url_for("google_callback"))

@app.route("/callback")
def google_callback():
    if not google.authorized:
        return jsonify({"error": "Failed to log in."}), 400
    resp = google.get("/oauth2/v1/userinfo")
    assert resp.ok, resp.text

    user_info = resp.json()
    exist_user = db.User.find_one({'email': user_info['email']}, {'first_name': 1, 'user_id': 1})

    if not exist_user:
        user_id = "User" + user_info['given_name'].upper() + "-" + str(round((datetime.now().timestamp())*1000000))
        db.User.insert_one({
            'first_name': user_info['given_name'],
            'last_name': user_info['family_name'],
            'email': user_info['email'],
            'user_id': user_id
        })
    else:
        user_id = exist_user['user_id']

    user_info['user_id'] = user_id
    token = create_access_token(identity=user_info['email'])
    user_info['access_token'] = token
    user_info_str = urllib.parse.quote(json.dumps(user_info))
    
    return redirect(f"{os.getenv('FRONTEND_URL')}/login?data={user_info_str}", code=302)

# Microsoft Login
app.config["MICROSOFT_OAUTH_CLIENT_ID"] = os.getenv('MICROSOFT_OAUTH_CLIENT_ID')
app.config["MICROSOFT_OAUTH_CLIENT_SECRET"] = os.getenv('MICROSOFT_OAUTH_CLIENT_SECRET')
app.config["MICROSOFT_OAUTH_REDIRECT_URI"] = os.getenv('MICROSOFT_OAUTH_REDIRECT_URI')

@app.route("/login/microsoft")
def microsoft_login():
    msal_app = ConfidentialClientApplication(
        app.config["MICROSOFT_OAUTH_CLIENT_ID"],
        authority="https://login.microsoftonline.com/consumers",
        client_credential=app.config["MICROSOFT_OAUTH_CLIENT_SECRET"]
    )
    auth_url = msal_app.get_authorization_request_url(
        scopes=["User.Read"],
        state=os.urandom(16),
        redirect_uri=app.config["MICROSOFT_OAUTH_REDIRECT_URI"]
    )
    return redirect(auth_url)

@app.route("/microsoft/callback")
def microsoft_callback():
    code = request.args.get('code')
    if not code:
        return jsonify({"error": "Failed to log in."}), 400

    msal_app = ConfidentialClientApplication(
        app.config["MICROSOFT_OAUTH_CLIENT_ID"],
        authority="https://login.microsoftonline.com/consumers",
        client_credential=app.config["MICROSOFT_OAUTH_CLIENT_SECRET"]
    )
    result = msal_app.acquire_token_by_authorization_code(
        code,
        scopes=["User.Read"],
        redirect_uri=app.config["MICROSOFT_OAUTH_REDIRECT_URI"]
    )

    if "error" in result:
        return jsonify({"error": "Failed to log in.", "details": result["error_description"]}), 400

    if "access_token" in result:
        headers = {'Authorization': 'Bearer ' + result['access_token']}
        graph_data = requests.get("https://graph.microsoft.com/v1.0/me", headers=headers).json()

        exist_user = db.User.find_one({'email': graph_data["mail"]}, {'first_name': 1, 'user_id': 1})
        if not exist_user:
            user_id = "User"+ graph_data.get("givenName").upper() + "-" + str(round((datetime.now().timestamp())*1000000))
            user_data = {
                'first_name': graph_data.get("givenName", ""),
                'last_name': graph_data.get("surname", ""),
                'email': graph_data.get("mail", ""),
                'phone': graph_data.get("mobilePhone", ""),
                'user_id': user_id
            }
            db.User.insert_one(user_data)
        else:
            db.User.update_one({'email': graph_data["mail"]}, {'$set': {'phone': graph_data.get("mobilePhone", "")}})
            user_id = exist_user['user_id']

        user_info = {
            'first_name': graph_data.get("givenName", ""),
            'last_name': graph_data.get("surname", ""),
            'email': graph_data.get("mail", ""),
            'phone': graph_data.get("mobilePhone", ""),
            'user_id': user_id
        }

        token = create_access_token(identity=user_info['email'])
        user_info['access_token'] = token
        user_info_str = urllib.parse.quote(json.dumps(user_info))

        frontend_url = os.getenv('FRONTEND_URL') + "/login?data=" + user_info_str
        return redirect(frontend_url, code=302)
    else:
        return jsonify({"error": "Failed to log in."}), 400

# Manual Authentication
@app.route('/auth/signup', methods =['POST'])
def register():
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    country_code = request.json.get('country_code')
    phone = request.json.get('phone')
    email = request.json.get('email')
    password = request.json.get('password')

    if not (first_name and last_name and country_code and phone and email and password):
        return jsonify({'message': 'Missing required fields'}), 400
    if db.User.find_one({'email': email}):
        return jsonify({'message': 'User already exists'}), 400

    hashed_password = generate_password_hash(password)
    user_id = "User"+ first_name.upper() + "-" + str(round((datetime.now().timestamp())*1000000))
    db.User.insert_one({
        'first_name': first_name,
        'last_name': last_name,
        'country_code': country_code,
        'phone': phone,
        'email': email,
        'password': hashed_password,
        'user_id': user_id
    })
    
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/auth/login', methods=['POST'])
def loginAuth():
    email = request.json['email']
    password = request.json['password']
   
    user = db.User.find_one({'email': email})
    if not user or not check_password_hash(user['password'], password):
        return jsonify({'message': 'Invalid credentials'}), 401
    else:
        token  = create_access_token(identity= email)
    name = user['first_name']+" "+user['last_name']
    user_id = user['user_id']
    return jsonify(message = 'Login Successful', access_token = token, email = email, name = name, user_id = user_id)

@app.route('/auth/validate-token', methods=['GET'])
@jwt_required()
def validate_token():
    current_user = get_jwt_identity()
    user = db.User.find_one({'email': current_user})
    if user:
        name = user['first_name'] + " " + user['last_name']
        user_id = user['user_id']
        return jsonify(message='Token is valid', email=current_user, name=name, user_id=user_id)
    else:
        return jsonify({'message': 'Invalid token'}), 401

@app.route('/auth/forgetPassword',methods =['POST'])
def forgetP():
    email = request.json.get('email')
    newPassword = request.json.get('newPassword')

    db.User.update_one({ "email": email },{"$set": { "password": generate_password_hash(newPassword) }})
    return jsonify({'message':"password updates succesfully"})

@app.route('/start-process', methods =['POST'])
@jwt_required()
def process():
    data = request.get_json()
    result = db.CI.insert_one(data)
    return jsonify({'message': 'Data inserted successfully'}), 201

@app.route('/dishes', methods=['GET'])
@lru_cache(maxsize=None)
def get_dishes():
    dishes = db['Dish'].find()
    
    dishes_list = []
    for dish in dishes:
        dish['_id'] = str(dish['_id'])
        dishes_list.append(dish)
    
    return jsonify(dishes_list), 201

@app.route('/dishes/state', methods=['POST'])
def get_state_dishes():
    try:
        state = request.json.get('state')
        if not state:
            return jsonify({"error": "Missing state in request body"}), 400

        dishes = db['Dish'].find({"popularity_state": state})
        
        dishes_list = []
        for dish in dishes:
            dish['_id'] = str(dish['_id'])
            dishes_list.append(dish)
        
        return jsonify(dishes_list), 200
    except PyMongoError as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred while fetching the dishes"}), 500

@app.route('/dish', methods=['POST'])
def get_dish():
    try:
        dish_name = request.json.get('dish_name')
        if not dish_name:
            return jsonify({"error": "Missing dish_name in request body"}), 400

        dish = db['Dish'].find_one({"dish_name": dish_name})
        if dish:
            dish['_id'] = str(dish['_id'])
            return jsonify(dish), 200
        else:
            return jsonify({"error": "Dish not found"}), 404
    except PyMongoError as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred while fetching the dish"}), 500

@app.route('/feedback', methods=['POST'])
def add_message():
    data = request.get_json()
    email = data.get('email')
    message = data.get('message')
    reaction = data.get('reaction')

    if email and message:
        message_data = {
            'email': email,
            'message': message,
            'reaction': reaction
        }
        db.Feedback.insert_one(message_data)

        sql = "INSERT INTO Feedback (email, message, reaction) VALUES (%s, %s, %s)"
        val = (email, message, reaction if reaction is not None else None)

        cursor = mysql.cursor()
        cursor.execute(sql, val)
        mysql.commit()

        return jsonify({'message': 'Message added successfully'}), 201
    else:
        return jsonify({'error': 'Missing required fields'}), 400

# app.config['UPLOAD_FOLDER'] = 'files'
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

        # ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg', 'doc', 'docx'}
        # certificates = request.files.getlist("certificates[]")
        # certificate_paths = []
        # saved_files = []

        # for certificate in certificates:
        #     filename = certificate.filename
        #     timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
        #     new_filename = f"{timestamp}-{filename}"

        #     if '.' in new_filename and new_filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS:
        #         file_path = os.path.join(app.config['UPLOAD_FOLDER'], new_filename)
        #         certificate.save(file_path)
        #         certificate_paths.append(file_path)
        #         saved_files.append(file_path)
        #     else:
        #         for file in saved_files:
        #             try:
        #                 os.remove(file)
        #             except OSError as e:
        #                 print(f"Error: {file} : {e.strerror}")
        #         return jsonify({'message': 'Invalid file format'}), 400

        db.carrers.insert_one({
            'applied_for': applied_for,
            'personal': personal,
            'experience': experiences,
            'education': education,
            'skills': skills,
            'socials': socials,
            'all_questions': all_questions,
            'voluntary_questions': voluntary_questions,
            # 'certificates': certificate_paths
        })
        return jsonify({'message':'Application submitted successfully'}), 201

@app.route('/api/dishCreateProcess',methods = ['POST','GET'])
def  dishCreateProcess():
    data = request.get_json()
    dishN = data['dish_name']
    people = data['people']
    Dish_detail = db.Dish.find_one({'dish_name':dishN})
    #already_person = #Dish_detail['person'] 
    already_person = 1 
    if Dish_detail is None:
        return jsonify({'Message':"Dish is not Found"}),404
    else:   
        Inde =[]
        for it in Dish_detail['indegrients']:
            temp = it['name'] +" " +str((int(it['quantity'])//(already_person))*people) +"-" +it['unit']
            Inde.append(temp)
            #Inde.append(it['name'])
            #Inde.append(str(int(it['quantity'])//(already_person))*people) +" " + it['unit'])
        return jsonify({"Kitchen_equi":Dish_detail['kitchen_equipments'].split(","),"Indegrients":Inde}),201

@app.route('/api/luxuryDishes/',methods =['GET','POST'])
def luxuryDishes():
    data = request.get_json()
    dishN = data['dish_name']
    people = data['people']
    Dish_detail = db.Dish.find_one({'dish_name':dishN})
    #already_person = #Dish_detail['person'] 
    already_person = 1 
    if Dish_detail is None:
        return jsonify({'Message':"Dish is not Found"}),404
    else:   
        Inde =[]
        for it in Dish_detail['indegrients']:
            temp = it['name'] +" " + str((int(it['quantity'])//(already_person))*people) +"-" +it['unit']
            Inde.append(temp)
            #Inde.append(it['name'])
            #Inde.append(str(int(it['quantity'])//(already_person))*people) +" " + it['unit'])
        return jsonify({"Kitchen_equi":Dish_detail['kitchen_equipments'].split(","),"Indegrients":Inde}),201

@app.route('/api/quickDishes',methods =['POST','GET'])
def quickDishes():
    data = request.get_json()
    dishN = data['dish_name']
    people = data['people']
    Dish_detail = db.Dish.find_one({'dish_name':dishN})
    #already_person = #Dish_detail['person'] 
    already_person = 1 
    if Dish_detail is None:
        return jsonify({'Message':"Dish is not Found"}),404
    else:   
        Inde =[]
        for it in Dish_detail['indegrients']:
            temp = it['name'] +" " + str((int(it['quantity'])//(already_person))*people) +"-" +it['unit']
            Inde.append(temp)
            #Inde.append(it['name'])
            #Inde.append(str(int(it['quantity'])//(already_person))*people) +" " + it['unit'])
        return jsonify({"Kitchen_equi":Dish_detail['kitchen_equipments'].split(","),"Indegrients":Inde}),201
    
@app.route('/api/healtyDishes',methods =['POST','GET'])
def healtyDishes():
    data = request.get_json()
    dishN = data['dish_name']
    people = data['people']
    Dish_detail = db.Dish.find_one({'dish_name':dishN})
    #already_person = #Dish_detail['person'] 
    already_person = 1 
    if Dish_detail is None:
        return jsonify({'Message':"Dish is not Found"}),404
    else:   
        Inde =[]
        for it in Dish_detail['indegrients']:
            temp = it['name'] +" " + str((int(it['quantity'])//(already_person))*people) +"-" +it['unit']
            Inde.append(temp)
            #Inde.append(it['name'])
            #Inde.append(str(int(it['quantity'])//(already_person))*people) +" " + it['unit'])
        return jsonify({"Kitchen_equi":Dish_detail['kitchen_equipments'].split(","),"Indegrients":Inde}),201
    
@app.route('/userDetials',methods =['GET','POST'])
@jwt_required()
def  userDetials():
    temp = get_jwt_identity()
    UserData = db.User.find_one({'email':temp})
    first_name = UserData['first_name']
    last_name =UserData['last_name']
    email = UserData['email']
    name = first_name +" " +last_name
    data = request.get_json()
    country = data['country']
    state = data['state']
    dish_type = data['Dish_category']

    db.AllDetails.insert_one({'name':name,'email':email,'country':country,'state':state ,'dish_type':dish_type })
    return jsonify({"message":"User details saved successfully"}),201 

@app.route('/api/chef_id',methods =['POST','GET'])
@jwt_required()
def create_id():
    user_email = get_jwt_identity()
    user = db.User.find_one({'email':user_email})

    chef_id = "User"+user['first_name']+ str(random.randint(1000,10000))

    db.User.update_one({'email':user_email},{"$set" :{"chef_id":chef_id}})
    return jsonify({"message":"chef id created succesffuly"}),200

@app.route('/api/saveMenu',methods =['GET','POST'])
def saveMenu():
    user_email = get_jwt_identity()
    user =db.User.find_one({'email':user_email})
    name = user['first_name'] +" " +user['last_name']
    
    data = request.get_json()
    print(data)
    meal = data['meal']
    numberOfPeople = data['numberOfPeople']
    mainDishes = data['mainDishes']
    sideDishes = data['sideDishes']
    cookingTime = data['cookingTime']
    selectedEquipments = data['selectedEquipments']
    selectedIngredients = data['selectedIngredients']
    reminder = data['selectedDateTime']
    newMainDish = data['newMainDish']
    newSideDish = data['newSideDish']
    skill = data['skill'],
    beverages = data['beverages']
    cuisine = data['cuisine']
    desserts = data['desserts']
    appetizers = data['appetizers']
    
    if meal =='dinner':
        db.Menu.insert_one({
            'meal':meal,
            'mainDish':mainDishes,
            'ingredients':selectedIngredients,
            'sideDish':sideDishes,
            'kitchen_equipements':selectedEquipments,
            'no_of_people':numberOfPeople,
            'cooking_time':cookingTime,
            'reminder':reminder,
            'newMainDish':newMainDish,
            'newSideDish':newSideDish,
            'skill':skill,
            'beverages':beverages,
            'cuisine':cuisine, 
            'desserts' :desserts,
            'appetizers':appetizers
        })    
    else:
        db.Menu.insert_one({
            'meal':meal,
            'mainDish':mainDishes,
            'ingredients':selectedIngredients,
            'sideDish':sideDishes,
            'kitchen_equipements':selectedEquipments,
            'no_of_people':numberOfPeople,
            'cooking_time':cookingTime,
            'reminder':reminder,
            'newMainDish':newMainDish,
            'newSideDish':newSideDish,
            'skill':skill,
            'beverages':beverages,
            'cuisine':cuisine
        })

    reminder_time = reminder -timedelta(minutes =10)
    scheduler.add_job(
        id ='reminder',
        func= send_reminder,
        args = [user_email,meal,mainDishes,reminder],
        trigger = 'date',
        run_date = reminder_time
    )
    return jsonify({'Message':"Menu saved successfully "}),201

def send_reminder(user_email,meal,mainDishes,reminder):
    msg = Message(
        'Hello',
        sender = os.getenv('YOUR_EMAIL_ADDRESS'),
        recipients =[user_email]

    )
    msg.body =f"Your Dish {meal} with main Dishes {mainDishes} is ready to cook in {reminder} minutes"
    mail.send(msg)

# pipeline of data
'''
redirect_uri = 'http://localhost:3000/callback'

def generate_random_string(length):
    
    rand_Str = string.ascii_letters + string.digits
    return ''.join(random.choice(rand_Str) for _ in range(length))

@app.route('/login')
def login():
    state = generate_random_string(16)
    scope = 'user-read-private user-read-email user-read-recently-played playlist-read-private playlist-read-private user-top-read user-library-read user-follow-read'
    params = {
        'response_type': '',
        'client_id': '',
        'scope': scope,
        'redirect_uri': '',
        'state': ''
    }
    redirect_url = 'https://accounts.spotify.com/authorize?' + urllib.parse.urlencode(params)
    return redirect(redirect_url)

@app.route('/callback')
def callback():
    code = request.args.get('code', None)
    state = request.args.get('state', None)

    if state is None:
        return jsonify({'error': 'state_mismatch'}), 400
    else:
        auth_options = {
            'url': 'https://accounts.spotify.com/api/token',
            'data': {
                'code': code,
                'redirect_uri': redirect_uri,
                'grant_type': 'authorization_code'
            },
            'headers': {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + base64.b64encode(f'{os.getenv('CLIENT_ID')}:{os.getenv('CLIENT_SECRET')}'.encode('utf-8')).decode('utf-8')
            }
        }

        response = requests.post(auth_options['url'], data=auth_options['data'], headers=auth_options['headers'])
        token_info = response.json()
        
        # Store the token_info for further analysis
        with open('token_info.json', 'w') as json_file:
            json_file.write(json.dumps(token_info, indent=4))
        
        # Return a response
        return jsonify({'message': 'Authentication successful'})

@app.route('/refresh_token')
def refresh_token():
    refresh_token = request.args.get('refresh_token', None)

    if refresh_token is None:
        return jsonify({'error': 'missing_refresh_token'}), 400

    auth_options = {
        'url': 'https://accounts.spotify.com/api/token',
        'data': {
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token
        },
        'headers': {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + base64.b64encode(f'{os.getenv('CLIENT_ID')}:{os.getenv('CLIENT_SECRET')}'.encode('utf-8')).decode('utf-8')
        }
    }

    response = requests.post(auth_options['url'], data=auth_options['data'], headers=auth_options['headers'])
    token_info = response.json()
    # Write the modified token_info back to the file
    with open('token_info_refreshed.json', 'w') as json_file:
        json.dump(token_info, json_file, indent=4)
        
    # Load existing token_info from the file
    with open('token_info.json', 'r') as json_file:
        token_info = json.load(json_file)

    # Load refreshed token_info from the file
    with open('token_info_refreshed.json', 'r') as refreshed_json_file:
        refreshed_token_info = json.load(refreshed_json_file)

    # Update the original token_info with the refreshed access_token
    token_info['access_token'] = refreshed_token_info['access_token']

    # Write the modified token_info back to the file
    with open('token_info.json', 'w') as json_file:
        json.dump(token_info, json_file, indent=4)
        
    return jsonify({'message': 'Token have been successfully refreshed'})

'''
if __name__ == '__main__':
    app.run(debug=True)
