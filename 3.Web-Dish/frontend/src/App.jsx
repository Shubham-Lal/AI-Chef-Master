import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { useAuthContext } from './hooks/useAuthContext';

import LocationListener from "./hooks/LocationListener";
import NavBarHeader from './components/NavBarHeader';

import Home from './pages/Home';
import SingleDish from './pages/SingleDish';
import Cooking from './pages/Cooking';
import TeamPage from './pages/TeamPage';
import CreateAccount from './components/LoginSineupPage/CreateAccount';
import LoginIn from './components/LoginSineupPage/LoginIn';
import ChefIntelligence from './components/ChefIntelligence';

import SeasonalDishes from './components/Seasonal-Top/SeasonalDishes';
import DishPage from './pages/DishPage';
import FeedbackForm from './components/FeedbackForm';
import IndianStates from './components/Dishes/IndianStates';

import LuxuryDishes from './components/Dishes/Luxury-Dishes/LuxuryDishes';
import Spanish from './components/Dishes/Luxury-Dishes/Spain/Spanish';
import SpanishLuxuryBreakFast from './components/Dishes/Luxury-Dishes/Spain/SpanishLuxuryBreakFast';
import SpanishLuxuryLunch from './components/Dishes/Luxury-Dishes/Spain/SpanishLuxuryLunch';
import SpanishLuxuryDinner from './components/Dishes/Luxury-Dishes/Spain/SpanishLuxuryDinner';

import Indian from './components/Dishes/Luxury-Dishes/India/Indian';
import IndianLuxuryBreakFast from './components/Dishes/Luxury-Dishes/India/IndianLuxuryBreakFast';
import IndianLuxuryLunch from './components/Dishes/Luxury-Dishes/India/IndianLuxuryLunch';
import IndianLuxuryDinner from './components/Dishes/Luxury-Dishes/India/IndianLuxuryDinner';

import MasalaDosa from './components/Dishes/Luxury-Dishes/India/BreakFastSingleItems/MasalaDosa';
import MasalaDosaCook from './components/Dishes/Luxury-Dishes/India/BreakFastSingleItems/MasalaDosaCook';
import IdliSambar from './components/Dishes/Luxury-Dishes/India/BreakFastSingleItems/IdliSambar';
import IdliSambarCook from './components/Dishes/Luxury-Dishes/India/BreakFastSingleItems/IdliSambarCook';
import Poha from './components/Dishes/Luxury-Dishes/India/BreakFastSingleItems/Poha';
import PohaCook from './components/Dishes/Luxury-Dishes/India/BreakFastSingleItems/PohaCook';
import AlooParatha from './components/Dishes/Luxury-Dishes/India/BreakFastSingleItems/AlooParatha';
import AlooParathaCook from './components/Dishes/Luxury-Dishes/India/BreakFastSingleItems/AlooParathaCook';

import QuickDishes from './components/Dishes/Quick-Dishes/QuickDishes';
import HealthyDishes from './components/Dishes/Healthy-Dishes/HealthyDishes';
import ChooseRegion from './components/ChooseRegions/ChooseRegion';
import ChooseWorldCountries from './components/ChooseRegions/ChooseWorldCountries';
import ChooseIndia from './components/ChooseRegions/ChooseIndia'
import ChooseVegNonVeg from './components/ChooseRegions/ChooseVegNonVeg';
import CreateMenu from './components/Dishes/Create-Menu/CreateMenu';
import UserProfile from './components/ProfileSetting/UserProfile'
import SavedRecipes from './components/ProfileSetting/SavedRecipes';
import RecipesHistory from './components/ProfileSetting/RecipesHistory';
import UpgradePremium from './components/ProfileSetting/UpgradePremium';
import SavedMenu from './components/ProfileSetting/SavedMenu';
import ChanaMasala from './components/Dishes/Healthy-Dishes/High-Protein/SingleDishItems/ChanaMasala';
import ChanaMasalaCook from './components/Dishes/Healthy-Dishes/High-Protein/SingleDishItems/ChanaMasalaCook';
import RecommendedQuickDishes from './components/Dishes/Quick-Dishes/RecommendedQuickDishes';
import SuggestedRandomQuickDishes from './components/Dishes/Quick-Dishes/SuggestedRandomQuickDishes';
import HighProteinSeeMore from './components/Dishes/Healthy-Dishes/High-Protein/HighProteinSeeMore';
import LowCaloriesSeeMore from './components/Dishes/Healthy-Dishes/Low-Calories/LowCaloriesSeeMore';
import GlutenFreeSeeMore from './components/Dishes/Healthy-Dishes/Gluten-Free/GlutenFreeSeeMore';
import KetoSeeMore from './components/Dishes/Healthy-Dishes/Keto/KetoSeeMore';
import SugarFreeSeeMore from './components/Dishes/Healthy-Dishes/Sugar-Free/SugarFreeSeeMore';
import VegetablesSeeMore from './components/Dishes/Healthy-Dishes/Vegetables/VegetablesSeeMore';
import TopDishes from './components/Seasonal-Top/TopDishes';
import CulinaryCategories from './components/Choices/CulinaryCategories/CulinaryCategories';
import Beverages from './components/Choices/CulinaryCategories/Beverages';
import Snacks from './components/Choices/CulinaryCategories/Snacks';
import Desert from './components/Choices/CulinaryCategories/Desert';
import Soup from './components/Choices/CulinaryCategories/Soup';
import Bakery from './components/Choices/CulinaryCategories/Bakery';
import Settings from './components/Settings';
import NotFound from './pages/NotFound';

const App = () => {
    // const { user } = useAuthContext();
    const [location, setLocation] = useState({ pathname: '' });

    return (
        <BrowserRouter>
            <LocationListener setLocation={setLocation} />

            {(location.pathname !== '/chef-intelligence' && location.pathname !== '/chef-intelligence/generatedDish' && location.pathname !== '/chef-intelligence/archives') && (
                <NavBarHeader />
            )}

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/cooking' element={<Cooking />} />
                <Route path='/teampage' element={<TeamPage />} />
                <Route path='/signup' element={<CreateAccount />} />
                <Route path='/login' element={<LoginIn />} />
                <Route path='chef-intelligence/*' element={<ChefIntelligence />} />

                <Route path='/SeasonalDishes' element={<SeasonalDishes />} />
                <Route path="/dish/:dishName" element={<DishPage />} />
                <Route path='/feedback' element={<FeedbackForm />} />
                <Route path='All-Indian-Dishes/*' element={<IndianStates />} />

                <Route path='/Luxury-Dishes' element={<LuxuryDishes />} />
                <Route path='/Luxury-Dishes/Spanish' element={<Spanish />} />
                <Route path='/Luxury-Dishes/Spanish/SpanishLuxuryBreakFast' element={<SpanishLuxuryBreakFast />} />
                <Route path='/Luxury-Dishes/Spanish/SpanishLuxuryLunch' element={<SpanishLuxuryLunch />} />
                <Route path='/Luxury-Dishes/Spanish/SpanishLuxuryDinner' element={<SpanishLuxuryDinner />} />
                <Route path='/Luxury-Dishes/Indian' element={<Indian />} />
                <Route path='/Luxury-Dishes/Indian/IndianLuxuryBreakFast' element={<IndianLuxuryBreakFast />} />
                <Route path='/Luxury-Dishes/Indian/IndianLuxuryLunch' element={<IndianLuxuryLunch />} />
                <Route path='/Luxury-Dishes/Indian/IndianLuxuryDinner' element={<IndianLuxuryDinner />} />
                <Route path='/Masala-Dosa' element={<MasalaDosa />} />
                <Route path='/Masala-Dosa-Cook' element={<MasalaDosaCook />} />
                <Route path='/Idli-Sambar' element={<IdliSambar />} />
                <Route path='/Idli-Sambar-Cook' element={<IdliSambarCook />} />
                <Route path='/Poha' element={<Poha />} />
                <Route path='/Poha-Cook' element={<PohaCook />} />
                <Route path='/Aloo-Paratha' element={<AlooParatha />} />
                <Route path='/Aloo-Paratha-Cook' element={<AlooParathaCook />} />

                <Route path='/Quick-Dishes' element={<QuickDishes />} />
                <Route path='/Healthy-Dishes' element={<HealthyDishes />} />
                <Route path='/RecommendedQuickDishes' element={<RecommendedQuickDishes />} />
                <Route path='/SuggestedRandomQuickDishes' element={<SuggestedRandomQuickDishes />} />
                <Route path='/HighProteinSeeMore' element={<HighProteinSeeMore />} />
                <Route path='/LowCaloriesSeeMore' element={<LowCaloriesSeeMore />} />
                <Route path='/GlutenFreeSeeMore' element={<GlutenFreeSeeMore />} />
                <Route path='/KetoSeeMore' element={<KetoSeeMore />} />
                <Route path='/SugarFreeSeeMore' element={<SugarFreeSeeMore />} />
                <Route path='/VegetablesSeeMore' element={<VegetablesSeeMore />} />

                <Route path='/chana-masala' element={<ChanaMasala />} />
                <Route path='/chana-masala-cook' element={<ChanaMasalaCook />} />

                <Route path='/Create-Menu' element={<CreateMenu />} />

                <Route path='/Pesarattu-info' element={<SingleDish />} />
                <Route path='/ChooseVegNonVeg' element={<ChooseVegNonVeg />} />
                <Route path='/ChooseRegion' element={<ChooseRegion />} />
                <Route path='/rest-of-the-world' element={<ChooseWorldCountries />} />
                <Route path='/choose-india' element={<ChooseIndia />} />
                <Route path='/UserProfile' element={<UserProfile />} />
                <Route path='/saved-recipes' element={<SavedRecipes />} />
                <Route path='/recipes-history' element={<RecipesHistory />} />
                <Route path='/upgrade-premium' element={<UpgradePremium />} />
                <Route path='/saved-menu' element={<SavedMenu />} />
                <Route path='/RecommandedQuickDishes' element={<RecommendedQuickDishes />} />
                <Route path='/TopDishes' element={<TopDishes />} />
                <Route path='/CulinaryCategories' element={<CulinaryCategories />} />
                <Route path='/Beverages' element={<Beverages />} />
                <Route path='/Snacks' element={<Snacks />} />
                <Route path='/Desert' element={<Desert />} />
                <Route path='/Soup' element={<Soup />} />
                <Route path='/Bakery' element={<Bakery />} />
                <Route path='/Settings' element={<Settings />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

// import AndhraPradesh from './components/Dishes/All-NavItem/AndhraPradeshState/AndhraPradesh';
// import AndhraPradeshLuxuryBreakFast from './components/Dishes/All-NavItem/AndhraPradeshState/AndhraPradeshLuxuryBreakFast';
// import AndhraPradeshLuxuryLunch from './components/Dishes/All-NavItem/AndhraPradeshState/AndhraPradeshLuxuryLunch';
// import AndhraPradeshLuxuryDinner from './components/Dishes/All-NavItem/AndhraPradeshState/AndhraPradeshLuxuryDinner';
// import ArunachalPradesh from './components/Dishes/All-NavItem/ArunachalPradeshState/ArunachalPradesh';
// import ArunachalPradeshLuxuryBreakFast from './components/Dishes/All-NavItem/ArunachalPradeshState/ArunachalPradeshLuxuryBreakFast';
// import ArunachalPradeshLuxuryLunch from './components/Dishes/All-NavItem/ArunachalPradeshState/ArunachalPradeshLuxuryLunch';
// import ArunachalPradeshLuxuryDinner from './components/Dishes/All-NavItem/ArunachalPradeshState/ArunachalPradeshLuxuryDinner';

{/* <Route path='/All-Indian-Dishes/Andhra Pradesh' element={<AndhraPradesh />} />
<Route path='/All-Indian-Dishes/Andhra Pradesh/AndhraPradeshLuxuryBreakFast' element={<AndhraPradeshLuxuryBreakFast />} />
<Route path='/All-Indian-Dishes/Andhra Pradesh/AndhraPradeshLuxuryLunch' element={<AndhraPradeshLuxuryLunch />} />
<Route path='/All-Indian-Dishes/Andhra Pradesh/AndhraPradeshLuxuryDinner' element={<AndhraPradeshLuxuryDinner />} />             
<Route path='/All-Indian-Dishes/Arunachal Pradesh' element={<ArunachalPradesh />} />
<Route path='/All-Indian-Dishes/Arunachal Pradesh/ArunachalPradeshLuxuryBreakFast' element={<ArunachalPradeshLuxuryBreakFast />} />
<Route path='/All-Indian-Dishes/Arunachal Pradesh/ArunachalPradeshLuxuryLunch' element={<ArunachalPradeshLuxuryLunch />} />
<Route path='/All-Indian-Dishes/Arunachal Pradesh/ArunachalPradeshLuxuryDinner' element={<ArunachalPradeshLuxuryDinner />} /> */}