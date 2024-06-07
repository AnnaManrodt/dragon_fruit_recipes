import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppProvider from './providers/AppProvider'
import SingleRecipePage from './pages/SingleRecipePage';

import HomePage from './pages/HomePage';
import LoginSignup from './pages/LoginSignupPage';
import RecipeSearch from './pages/RecipeSearchPage';
import SearchResults from './pages/SearchResult';
import SingleRecipe from './pages/SingleRecipePage';
import CreateRecipe from './pages/CreateRecipe';
import UserInfo from './pages/UserPage';
import UserInfoPage from './pages/UserInfoPage';
import ViewCreatedRecipe from './pages/ViewCreatedRecipe';
import VeiwSavedRecipe from './pages/ViewSavedRecipe';


import Header from './componets/Header';
import Footer from './componets/Footer';

function App() {


  return (
      <AppProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/search" element={<RecipeSearch />} />
            <Route path="/search/results" element={<SearchResults/>} />
            <Route path="/singleresult" element={<SingleRecipePage/>} />
            <Route path="/recipe" element={<SingleRecipe />} />
            <Route path="/create" element={<CreateRecipe />} />
            <Route path="/user" element={<UserInfo />} />
            <Route path="user/userinfo" element={<UserInfoPage />} />
            <Route path="user/created" element={<ViewCreatedRecipe />} />
            <Route path="user/saved" element={<VeiwSavedRecipe />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AppProvider>
  )
}

export default App
