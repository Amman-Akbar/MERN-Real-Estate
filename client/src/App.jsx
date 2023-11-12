import React from 'react'
import { Routes , Route, BrowserRouter} from 'react-router-dom'
import Home from './Routes/Home'
import About from './Routes/About'
import Login from './Routes/Login'
import SignOut from './Routes/SignOut'
import Profile from './Routes/Profile'
import Header from './Components/Header.component'

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="about" element={<About/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="signout" element={<SignOut/>}/>
    </Routes></BrowserRouter>
  )
}

export default App