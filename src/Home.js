import Navbars from "./Navbar";
import Productlist from "./Productlist";
import { Link } from "react-router-dom";
import About from "./About";
import React from "react";

function Home(){
    return(
        <div>
            
            <Navbars/>
            <Productlist/>
            
        </div>
    );
}
export default Home;