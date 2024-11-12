import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../client/core/Layout.jsx";
import HomePage from "../client/core/Home.jsx";
import Footer from "../client/core/Footer.jsx";
import Signin from "./lib/Signin.jsx";
import Signup from "./user/Signup.jsx";
import MemberHome from "./core/MemberHome.jsx";
import MyAccount from "./user/UserAccount.jsx";
import AboutPage from "./components/About.jsx";
import Recipe from "./recipe/Recipe.jsx";
import AddRecipePage from "./recipe/AddRecipe.jsx";
import RecipeList from "./recipe/RecipeList.jsx";

export default function MainRouter() {
  return (
    <div>
      <Layout/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/member" element={<MemberHome />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/addrecipe" element={<AddRecipePage />} />
        <Route path="/recipelist" element={<RecipeList />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/account" element={<MyAccount />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer/>
    </div>
  )
}
