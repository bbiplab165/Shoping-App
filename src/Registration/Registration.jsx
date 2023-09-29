import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Style from "./Registration.module.css"

function Registration() {
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate()

    async function handleRegist(e) {
        e.preventDefault()
        const res = await axios.post("http://localhost:3000/create", { name, email, password })
        console.log(res);
        navigate("/")
    }
    return (
        <div className={Style.main}>
            <div className={Style.div}>
                <div className={Style.name}>
                    <label>Name:</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} className={Style.input}/>
                </div>
                <div className={Style.email}>
                    <label>Email:</label>
                    <input type="Email" onChange={(e) => setEmail(e.target.value)} className={Style.input}/>
                </div>
                <div className={Style.password}>
                    <label>Password:</label>
                    <input type="password" onChange={(e) => setPass(e.target.value)} className={Style.input}/>
                </div>
                <button onClick={handleRegist}>Register</button>
            </div>
        </div>
    )
}

export default Registration