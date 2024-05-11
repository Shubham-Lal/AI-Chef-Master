import { useState, useEffect } from "react";
import Typewriter from "../components/Typewriter";
import RecipeDetails from "../components/RecipeDetails";
import biryani from '../data/biryani.jpeg'

export default function Dish({ lightMode }) {
    const [recipeDetails, setRecipeDetails] = useState(null);

    useEffect(() => {
        const recipe = {
            name: "Chicken Biryani",
            image: biryani, // Assuming you have an image for biryani
            ingredients: [
                "2 cups basmati rice",
                "500 grams chicken, cut into pieces",
                "2 onions, thinly sliced",
                "2 tomatoes, chopped",
                "1/2 cup yogurt",
                "2 tablespoons ginger-garlic paste",
                "1 tablespoon biryani masala",
                "1 teaspoon turmeric powder",
                "1 teaspoon red chili powder",
                "1/2 teaspoon garam masala",
                "1/4 cup chopped mint leaves",
                "1/4 cup chopped coriander leaves",
                "4 cups water",
                "Salt to taste",
                "Oil or ghee for cooking"
            ],
            steps: [
                "Wash and soak basmati rice in water for 30 minutes. Drain the water and keep the rice aside.",
                "In a bowl, marinate the chicken pieces with yogurt, ginger-garlic paste, biryani masala, turmeric powder, red chili powder, half of the chopped mint leaves, half of the chopped coriander leaves, and salt. Let it marinate for at least 1 hour.",
                "In a large pan or pot, heat oil or ghee. Add the thinly sliced onions and fry until golden brown. Remove half of the fried onions and set aside for garnishing.",
                "In the same pan with the remaining fried onions, add the marinated chicken pieces along with chopped tomatoes. Cook until the chicken is partially cooked and the tomatoes are softened.",
                "In a separate pot, bring 4 cups of water to a boil. Add the soaked and drained rice along with whole spices like bay leaf, cardamom, cloves, and cinnamon. Cook the rice until it is 70% done. Drain the excess water and keep the partially cooked rice aside.",
                "Layer the partially cooked rice over the partially cooked chicken in the pan. Sprinkle the remaining chopped mint leaves and coriander leaves on top. Also, drizzle some saffron milk (optional) over the rice for added flavor and color.",
                "Cover the pan tightly with a lid and cook on low heat for about 20-25 minutes or until the chicken is fully cooked and the rice is done.",
                "Once done, gently mix the layers of chicken and rice before serving. Garnish with the reserved fried onions and serve hot with raita or salan."
            ]
        };

        setRecipeDetails(recipe);
    }, []);

    return (
        <div className="flex flex-col w-full md:w-5/6 mx-auto min-h-[calc(100dvh-56px)] items-center justify-center px-2 mt-24">
            {/* <img src='/assets/CompanyLogo.png' alt="" className="w-36 h-36" /> */}
            <Typewriter text="Chef Intelligence" delay={200} />

            {recipeDetails && (<RecipeDetails recipe={recipeDetails} lightMode={lightMode} />)}
        </div>
    );
}
