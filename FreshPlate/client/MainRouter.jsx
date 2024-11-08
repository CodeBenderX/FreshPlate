import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../client/core/Layout.jsx";
import HomePage from "../client/core/Home.jsx";
import Footer from "../client/core/Footer.jsx";

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
