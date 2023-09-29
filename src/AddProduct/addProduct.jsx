import { useNavigate } from "react-router-dom"

import Style from "./AddProduct.module.css"
import Navigation from "../Navigation/Navigation"
import { useState } from "react"
import axios from "axios"

function AddProduct() {
    const navigate = useNavigate()
    const [title,setTitle]=useState('')
    const [catagory,setCatagory]=useState('')
    const [description,setDescription]=useState('')
    const [price,setPrice]=useState('')
    const [image,setImage]=useState('')

    async function handlesubmit(){
        console.log(title,catagory,description);
        const data=await axios.post("http://localhost:3000/createProduct",{title,catagory,description,price,image})
        console.log(data);
    }
    return (
        <div className={Style.main}>
            <Navigation/>
            <div className={Style.container}>
                <label>Title : </label>
                <input type="text" onChange={(e)=>setTitle(e.target.value)}/>
                <label>Catagory : </label>
                <input type="text" onChange={(e)=>setCatagory(e.target.value)}/>
                <label>Description : </label>
                <input type="text" onChange={(e)=>setDescription(e.target.value)}/>
                <label>Price : </label>
                <input type="number" onChange={(e)=>setPrice(e.target.value)}/>
                <label>Image : </label>
                <input type="text" onChange={(e)=>setImage(e.target.value)}/>
                <button onClick={handlesubmit}>Add Product</button>
            </div>
        </div>
    )
}

export default AddProduct