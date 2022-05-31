import { toHaveFocus } from "@testing-library/jest-dom/dist/matchers";
import React from "react";
//import bootstrap from "bootstrap";

import { Link,Navigate } from "react-router-dom";
import './navbar.css'
//import { BrowserRouter, Link } from "react-router-dom";

class Navbars extends React.Component {

  state={
    isLoggedIn:false,
    isLoggedOut:false,
    username:""
  }
  
  componentDidMount()
  {
    if(localStorage.getItem("userId"))
    {
      console.log("nav bar ");
      let userid=JSON.parse(localStorage.getItem("userId")).id;

      let userName=JSON.parse(localStorage.getItem(""+userid)).user.firstName;
      
      this.setState({username:userName,isLoggedIn:true});
    }
  }
 
render()
{

 

  const logout=(e)=>{

    e.preventDefault();
    localStorage.clear();
    this.setState({isLoggedOut:true});

  }
  if(this.state.isLoggedOut)
  {
    return (
       
        <Navigate to="/login" />
    
    );
  }

  return (
    <div>

      <div className="navbar-container">
        <div className="navbar-container-left">
          <div className="navbar-left-element">
          <Link to="/home">Home</Link> 
          </div>
          <div className="navbar-left-element">
           <Link to="/about">About</Link> 
          </div>
          <div className="navbar-left-element">
           <Link to="/topproducts">Top Products</Link> 
          </div>
        </div>
        <div className="navbar-container-right">
          {
            this.state.isLoggedIn?( 
              <>
              <div className="navbar-right-element">
          <button className="btn delete-btn" onClick={(f) => logout(f)}>Logout</button>
          </div>
              <div className="navbar-right-element currentuser">
             <span> {this.state.username}</span>
          </div>
          
          </>
            ):(
              <>
              <div className="navbar-right-element">
          <Link to="/login">Signin</Link> 
          </div>
          <div className="navbar-right-element">
          <Link to="/register">Signup</Link> 
          </div>
          </>
            )
          }
          
        </div>

      </div>
     


    </div>
  )

  }
}

export default Navbars;
