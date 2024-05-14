import React from "react";
import Instagram from "../../Images/Instagram.svg";
import X from "../../Images/x.svg";
import LinkedIn from "../../Images/LinkedIn.svg";
import Threads from "../../Images/Threads.svg";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import "../FooterItem/index.css";

const FooterItem = () => {
  const theme = localStorage.getItem('theme');

  return (
    <div className="w-full custom-footer footer rounded-0 shadow-lg mt-0">
      <div className="text-center py-5">
        <h1 className="footer-heading mb-3">Ready to do your best work? </h1>
        <h5 className="text-2xl font-bold mb-4">Let's get you started.</h5>
        <div className="flex justify-center ">
          <Button className="footer-button p-3 hover:shadow-lg w-48 md:w-68 rounded font-sans text-white text-sm md:text-lg transform transition duration-500 hover:scale-110">
            <Link
              to="/signup"
              className="no-underline text-black"
            // style={{ color: "hsl(50, 33%, 30%)" }}
            >
              SIGN UP NOW ➪
            </Link>
          </Button>
        </div>
      </div>

      <div className="fluid-container items-center">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-3/12 md:w-4/12 sm:w-6/12 flex justify-center mb-5">
            <ul className="flex flex-col">
              <h2 className="footer-heading">Company</h2>
              <Link to="/aboutUs" onClick={() => window.scrollTo(0, 0)}>About Us</Link>
              <Link to="/Team" onClick={() => window.scrollTo(0, 0)}>Team</Link>
              <Link to="/job" onClick={() => window.scrollTo(0, 0)}>Career</Link>
              <Link to="/blogs" onClick={() => window.scrollTo(0, 0)}>Blogs</Link>
              <Link to="/news" onClick={() => window.scrollTo(0, 0)}>News</Link>
            </ul>
          </div>

          <div className="w-full lg:w-3/12 md:w-4/12 sm:w-6/12 flex justify-center mb-5">
            <ul className="list-items-styles">
              <h2 className="footer-heading">Contact</h2>
              <a href="mailto:info@aichefmaster.com?subject=Can%20you%20help%20">Help & Support</a>
            </ul>
          </div>

          <div className="w-full lg:w-3/12 md:w-4/12 sm:w-6/12 flex justify-center mb-5">
            <ul className="list-items-styles">
              <h2 className="footer-heading">Follow ACM</h2>
              <li className="flex items-center cursor-pointer" onClick={() => {
                window.location.href = "https://instagram.com"
              }}>
                <img
                  src={Instagram}
                  alt="ig"
                  className="w-[25px] h-[25px] object-cover mr-2"
                />
                Instagram
              </li>
              <li className="flex items-center cursor-pointer" onClick={() => {
                window.location.href = "https://x.com"
              }}>
                <img
                  src={theme === 'light' ? X : "https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg"}
                  alt="x"
                  className="ml-1 w-[15px] h-[15px] object-cover mr-3 shadow-xl shadow-white"
                />
                X
              </li>
              <li className="flex items-center cursor-pointer" onClick={() => {
                window.location.href = "https://www.linkedin.com/company/aichefmaster"
              }}>
                <img
                  src={LinkedIn}
                  alt="ig"
                  className="w-[25px] h-[25px] object-cover mr-2"
                />
                LinkedIn
              </li>
              <li className="flex items-center cursor-pointer" onClick={() => {
                window.location.href = "https://www.threads.net"
              }}>
                <img
                  src={Threads}
                  alt="ig"
                  className="w-[25px] h-[25px] object-cover mr-2"
                />
                Thread
              </li>
            </ul>
          </div>

          <div className="w-full lg:w-3/12 md:w-4/12 sm:w-6/12 flex justify-center mb-5">
            <ul className="list-items-styles">
              <h2 className="footer-heading">Quick Links</h2>
              <li>Privacy Policy</li>
              <li>Terms & Refund</li>
              <li>About Us</li>
              <Link to='http://aichefrecipe.com/contact'>Contact</Link>
            </ul>
          </div>

          <hr className="w-full bg-white h-1 m-3" />

          <div className="w-full my-4">
            <p className="font-bold text-center">
              © 2024 All rights reserved by Premali Kitchen Pvt Ltd
            </p>
          </div>
        </div>
      </div>
    </div >
  );
};
export default FooterItem;
