import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './Routes/Home'
import About from './Routes/About'
import SignIn from './Routes/SignIn'
import SignUp from './Routes/SignUp'
import Profile from './Routes/Profile'
import Header from './Components/Header.component'
import ProtectedRoute from './Components/ProtectedRoute'
import CreateListing from './Routes/CreateListing'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="create-listing" element={<CreateListing />} />
        </Route>
        <Route path="sign-up" element={<SignUp />} />
      </Routes></BrowserRouter>
  )
}

export default App