import { useNavigate } from "react-router-dom";
import Style from "./Navigation.module.css"


import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from "react";

function Navigation() {
    const [admin, setAdmin] = useState(false)
    const navigate = useNavigate()

    const token = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        const isadmin = JSON.parse(localStorage.getItem('admin'))
        console.log(isadmin);
        setAdmin(isadmin)
    },[])

    function handleHome() {
        navigate("/Home")
    }

    function handleAbout() {
        navigate("/About")
    }
    function handleCart() {
        navigate("/Cart")
    }

    function handleAddProduct(){
        navigate("/AddProduct")
    }
    function handleLogin(){
        navigate("/")
    }

    return (
        <div className={Style.main}>
            <div className={Style.home}>
                <Tooltip title="Home">
                    <button onClick={handleHome}>Shoping App</button>
                </Tooltip>
            </div>
            <div className={Style.rightSection}>
                <button onClick={handleAbout}>About</button>
                <button onClick={handleCart}>Cart</button>
                {admin?(<button onClick={handleAddProduct}>Add Product</button>):(token?(<button>Logout</button>):(<button onClick={handleLogin}>Login</button>))}
            </div>
        </div>
    )
}


export default Navigation
