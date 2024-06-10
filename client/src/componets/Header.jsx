import React from "react";
import {NavLink} from "react-router-dom";
import {useAppContext} from "../providers/AppProvider";
import Cookie from "js-cookie";
import "../style/header.css";

export default function Header() {

  const {currentUser} = useAppContext();

  function logout(){
    Cookie.remove("auth-cookie")
    window.location.href = "/"
  }

  return (
    
    <div>
      <nav className="main-nav">
        <img src="/assets/dragonfruit.png" alt="Logo" id="logo"/>
        <h1 className="flex">DragonFruit Delights</h1> 
        <div className="links">
        {(currentUser === undefined || currentUser === null) ? (
          <>
            <div className="login">
              <NavLink to="/login">   Login/Sign up   </NavLink>
            </div>
            <br/>
            <div className="navlinks">
              <NavLink to="/">   Home   </NavLink>
              <span>|</span>
              <NavLink to="/recipes">   Search Recipes  </NavLink>
            </div>
          </>
          ) : (
            <>
              <div className="login">
              <NavLink to="/login" onClick={logout}>   Logout   </NavLink>
              <span>|</span>
              <NavLink to="/user">   Profile   </NavLink>
              </div>
              <br/>
              <div className="navlinks">
              <NavLink to="/">   Home   </NavLink>
              <span>|</span>
              <NavLink to="/recipes">   Search Recipes  </NavLink>
              <span>|</span>
              <NavLink to="/create">   Create Recipes   </NavLink>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};



