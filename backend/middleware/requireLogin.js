const jwt = require("jsonwebtoken");
const JWT_SECRET = "oivfdkhkvsuj348kjg";
const User = require("../models/user-model");

module.exports = (req, res, next) => {
    const {authorization} = req.headers
    // const authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMGJkMDJmYzdlZGJjMWZhMDg1ZjRiZCIsImlhdCI6MTYyODE2NDM4NH0.POkKxrTUoqCXs1qfh54snIaeGcXPuXbKwlBMscQdLyQ"

    if (!authorization) {
        res.status(401).json({ error: "you must be authorized in" })
    }
    const token = authorization
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "you must be logged in" })
        }
        const { id } = payload
        console.log("iddddd", id)
        User.findById(id).then(user => {
            req.user = {token,loginuser:user}
            next()
        })
    })
}
