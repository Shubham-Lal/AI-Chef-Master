import React from "react";
import "./index.css";
import LongTerm from "../CardData/LongTerm";
import RD from "../CardData/RD";
import Customer from "../CardData/Customer";
import FooterItem from "../HomeComponents/FooterItem";

const Company = () => {
  
  return (
    <div>
      <LongTerm />
      <RD />
      <Customer />
      <FooterItem />
    </div>
  );
};
export default Company;
