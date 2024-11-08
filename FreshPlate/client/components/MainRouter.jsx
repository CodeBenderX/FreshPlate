import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import HomePage from "../components/Home.jsx";
import Footer from "./Footer.jsx";

export default function MainRouter() {
  return (
    <div>
      <Layout/>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer/>
    </div>
  )
}
