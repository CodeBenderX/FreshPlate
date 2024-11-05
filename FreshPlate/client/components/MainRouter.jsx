import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from './Home'
import Recipe from './Recipe'
import Contact from './Contact'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'

export default function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recipe" element={<Recipe />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegistrationForm />} />
        </Route>
      </Routes>
    </Router>
  )
}