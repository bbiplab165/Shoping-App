import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from "./home/home"
import Login from './Login/Login'
import Registration from './Registration/Registration.jsx'
import Product from './product/Products'
import About from "./About/About"
import Cart from "./Cart/Cart"
import AddProduct from './AddProduct/addProduct'

import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/Home' element={<Home />} />
      <Route path='/' element={<Login />} />
      <Route path='/Registration' element={<Registration/>}/>
      <Route path='/Product' element={<Product/>}/>
      <Route path='/About' element={<About/>}/>
      <Route path='/Cart' element={<Cart/>}/>
      <Route path='/AddProduct' element={<AddProduct/>}/>
    </Routes>
  )
}

export default App
