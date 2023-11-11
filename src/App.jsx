import React from 'react'
import { Routes , Route} from 'react-router-dom'
import Home from './Routes/Home'
import About from './Routes/About'
import Login from './Routes/Login'
import SignOut from './Routes/SignOut'
import Profile from './Routes/Profile'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="about" element={<About/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="signout" element={<SignOut/>}/>
    </Routes>
  )
}

export default App