const bcrypt = require("bcrypt")
const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken');

async function create(req, res) {
    try {
        const data = req.body
        const email = data.email
        const password = data.password
        const user = await userModel.findOne({ email: email })
        if (user) {
            return res.status(400).send({ status: false, msg: "User Already present" })
        }
        bcrypt.hash(password, 10, async (err, hash) => {
            await userModel.create({ ...data, password: hash })
        })
        return res.status(200).send({ message: "User Created Successfully", data })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, msg: err.message })
    }
}

async function login(req, res) {
    try {
        const data = req.body;
        const { email, password } = data
        const userData = await userModel.findOne({ email })
        let token = ''
        if (!userData) {
            return res.status(404).send({ message: "User not registrated", data })
        }
        const userPassword = userData.password
        bcrypt.compare(password, userPassword, (err, result) => {
            if (result) {
                const userId = userData._id.toString()
                token = jwt.sign(userId, 'hello')
                const isAdmin = userData.admin
                return res.status(200).send({ message: "Login Successfully", admin: isAdmin, token: token })
            }
            else {
                return res.status(400).send({ message: "Please enter a valid password" })
            }
        })

    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { create, login }