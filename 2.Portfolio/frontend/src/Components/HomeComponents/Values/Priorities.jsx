import { Link } from "react-router-dom";
import { ChefCard1 } from "../Pocket/ChefCard1";
import { v4 as uuidv4 } from "uuid";
export default function Priorities() {
  return (
    <>
      <ChefCard1
        key={uuidv4()}
        heading={"Customer priorities"}
        description={
          "Our focus is on delivering a user-friendly interface that empowers individuals to create personalized recipes with ease. We understand that each person's culinary journey is unique, so our platform is designed to be intuitive, allowing users to tailor recipes to their taste preferences, dietary needs, or health goals. By offering a simple yet powerful interface, we aim to inspire creativity and make cooking accessible to everyone.In addition to our personalized recipe feature, we seamlessly integrate curated content into the user experience. This curated content includes nutritional insights and lifestyle tips that promote overall well-being. Our platform goes beyond just providing recipes—it also educates users on how different foods can impact their health and fitness, helping them make informed choices. Whether it's tips on balanced eating, advice on food sustainability, or guidance on exercise and wellness, we strive to offer valuable information that supports a healthier lifestyle.By combining a user-friendly interface with thoughtfully curated content, we create a holistic cooking experience that not only helps users prepare delicious meals but also guides them toward better health and wellness. This approach allows us to stand out in the culinary tech industry while meeting the needs of a diverse and health-conscious user base."
        }
        video={"assets/1.mp4"} link={"/Priorities"}      ></ChefCard1>
    </>
  );
}

