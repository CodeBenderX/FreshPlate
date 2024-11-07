import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from './Home'
import Recipe from './Recipe'
import Contact from './Contact'
import LoginForm from './LoginForm'
import Register from './Register'

export default function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route>
          <Route exact path="/" element={<Home />} />
          <Route path="recipe" element={<Recipe />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  )
}