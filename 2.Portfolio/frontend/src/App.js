import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import LocationListener from "./hooks/LocationListener";
import MyNavbar from "./Components/MyNavbar";

import Home from "./Components/Home";
import LoginIn from "./Components/LoginSineupPage/LoginIn";
import CreateAccount from "./Components/LoginSineupPage/CreateAccount";
import Product from "./Components/Product";
import CareerHomePage from "./Components/Career/CareerHomePage";
import Company from "./Components/Company";
import ChefIntelligence from "./Components/ChefIntelligence";
import Blogs from "./Components/Blogs";
import News from "./Components/News";
import JobRoles from "./Components/Career/searchJobCards";
import AboutUs from "./Components/Team/About";
import Team from "./Components/Team/Team";
import Application from "./Components/Career/JobApplicationForm/Application";
import FrontendDeveloperEngineer from "./Components/Career/ListOfCareerJobs/FrontendDeveloperEngineer";
import BackendDeveloperEngineer from "./Components/Career/ListOfCareerJobs/BackendDeveloperEngineer";
import AIEngineer from "./Components/Career/ListOfCareerJobs/AIEngineer";
import ServerEngineer from "./Components/Career/ListOfCareerJobs/ServerEngineer";
import UiUxDesigner from "./Components/Career/ListOfCareerJobs/UiUxDesigner";
import AndroidApplicationDeveloperEngineer from "./Components/Career/ListOfCareerJobs/AndroidApplicationDeveloperEngineer";
import IOSApplicationDeveloperEngineer from "./Components/Career/ListOfCareerJobs/IOSApplicationDeveloperEngineer";
import FullStackDeveloperEngineer from "./Components/Career/ListOfCareerJobs/FullStackDeveloperEngineer";
import CustomerSupportAssociate from "./Components/Career/ListOfCareerJobs/CustomerSupportAssociate";
import ResearchDevelopmentEngineer from "./Components/Career/ListOfCareerJobs/ResearchDevelopmentEngineer";
import SearchJobCards from "./Components/Career/searchJobCards";
import NotFound from "./Components/NotFound";
import Chef_Intelligence from "./Components/HomeComponents/Pocket/Chef_Intelligence";
import AI_ASSISTANT from "./Components/HomeComponents/Pocket/AI_Assistant";
import Nutrition_Manager from "./Components/HomeComponents/Pocket/Nutrition_Manager";
import Growth from "./Components/HomeComponents/Values/Growth";
import Priorities from "./Components/HomeComponents/Values/Priorities";
import Focus from "./Components/HomeComponents/Values/Focus";

const App = () => {
  const { user } = useAuthContext();
  const [theme, setTheme] = useState("light");
  const [location, setLocation] = useState({ pathname: "" });

  useEffect(() => {
    document.body.setAttribute(
      "data-theme",
      localStorage.getItem("theme") || theme
    );
  }, [theme]);

  return (
    <Router>
      <LocationListener setLocation={setLocation} />

      {location.pathname !== "/chef-intelligence" &&
        location.pathname !== "/chef-intelligence/generatedDish" &&
        location.pathname !== "/chef-intelligence/archives" && (
          <MyNavbar theme={theme} setTheme={setTheme} />
        )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!user ? <LoginIn /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <CreateAccount /> : <Navigate to="/" />}
        />
        <Route path="/product" element={<Product />} />
        <Route path="/career" element={<CareerHomePage />} />
        <Route path="/company" element={<Company />} />
        <Route path="chef-intelligence/*" element={<ChefIntelligence />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/news" element={<News />} />
        <Route path="/Job" element={<JobRoles />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Team" element={<Team />} />
        <Route path="/application" element={<Application />} />
        <Route path="/AI_Assistant" element={<AI_ASSISTANT />} />
        <Route path="/Chef_Intelligence" element={<Chef_Intelligence />} />
        <Route path="/Nutrition_Manager" element={<Nutrition_Manager />} />
        <Route path="/Growth" element={<Growth />} />
        <Route path="/Priorities"r element={<Priorities />} />
        <Route path="/R&D" element={<Focus />} />

        <Route
          path="/Frontend-Developer-Engineer"
          element={<FrontendDeveloperEngineer />}
        />
        <Route
          path="/Backend-Developer-Engineer"
          element={<BackendDeveloperEngineer />}
        />
        <Route path="/AI-Engineer" element={<AIEngineer />} />
        <Route path="/Server-Engineer" element={<ServerEngineer />} />
        <Route path="/Ui-Ux-Designer" element={<UiUxDesigner />} />
        <Route
          path="/Android-Application-Developer-Engineer"
          element={<AndroidApplicationDeveloperEngineer />}
        />
        <Route
          path="/IOS-Application-Developer-Engineer"
          element={<IOSApplicationDeveloperEngineer />}
        />
        <Route
          path="/Full-Stack-Developer-Engineer"
          element={<FullStackDeveloperEngineer />}
        />
        <Route
          path="/Customer-Support-Associate"
          element={<CustomerSupportAssociate />}
        />
        <Route
          path="/Research-And-Development-Engineer"
          element={<ResearchDevelopmentEngineer />}
        />
        <Route path="/searchJobCards" element={<SearchJobCards />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
