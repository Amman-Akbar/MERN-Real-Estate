import React from 'react'
import { Routes , Route, BrowserRouter} from 'react-router-dom'
import Home from './Routes/Home'
import About from './Routes/About'
import SignIn from './Routes/SignIn'
import SignUp from './Routes/SignUp'
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
      <Route path="sign-in" element={<SignIn/>}/>
      <Route path="sign-up" element={<SignUp/>}/>
    </Routes></BrowserRouter>
  )
}

export default App