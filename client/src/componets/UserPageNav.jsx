import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react"
import "../style/usernav.css"
import UserInfoPage from '../pages/UserInfoPage'
import ViewCreatedRecipe from '../pages/ViewCreatedRecipe'
import ViewSavedRecipe from '../pages/ViewSavedRecipe'

export default function UserPageNav(){

  function navInfo(){
    window.location.href = "/user/userinfo"
  }
  function navCreate(){
    window.location.href = "/user/created"
  }
  function navSave(){
    window.location.href = "/user/saved"
  }

  return (
    
    <div>
      <nav className="usernav">
        <div className="usernav-container">
          <div className="needHover" onClick={navInfo}>User Info   </div>
          <span className="user-span">|</span>
          <div className="needHover" onClick={navCreate}>   Created Recipes  </div>
          <span className="user-span">|</span>
          <div className="needHover" onClick={navSave}>   Saved Recipes   </div>
        </div>
      </nav>
    </div>
  );
}