const router = require("express").Router();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require('dotenv').config();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


// token
const generateAccessToken = (id) => {
    return jwt.sign({ id }, `${process.env.JWT_SECRET_KEY}`);
};

/************* create user ***********/
const createUser = (async (req, res) => {
    try {
        if (req.body) {
            const data = await User(req.body);
            await data.save();
            delete data._doc.pass;
            res.send(data);
        } else {
            let detail = "user not register";
            res.status(400).send({ detail });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})

/***********  login User **************/
const loginUser = (async (req, res) => {
    try {
        const user = res.local;
        const id = user._id;
        if (res.local) {
            const token = await generateAccessToken(id);
            delete user.pass;
            res.send({ ...user, token });
        } else {
            let detail = "Unauthenticated User";
            res.status(401).send({ detail });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = { loginUser, createUser }