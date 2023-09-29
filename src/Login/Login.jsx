import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import Style from "./Login.module.css"

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()
        const res = await axios.post("http://localhost:3000/login", { email, password })
        console.log(res.data);
        localStorage.setItem('token',JSON.stringify(res.data.token))
        localStorage.setItem('admin',JSON.stringify(res.data.admin))
        navigate("/Home")
    }
    return (
        <div className={Style.main}>
            <div className={Style.div}>
                <div className={Style.email}>
                    <label>Email:</label>
                    <input type="Email" onChange={(e) => setEmail(e.target.value)} className={Style.input}/>
                </div>
                <div className={Style.password}>
                    <label>Password:</label>
                    <input type="password" onChange={(e) => setPass(e.target.value)} className={Style.input}/>
                </div>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}


export default Login