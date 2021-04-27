require('dotenv').config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");


/************************  jwt authentication ************************/
const authenticate = (req, res, next) => {
    try {
        const decoded = jwt.verify(
            // requesting the token from the header to authenticate
            req.headers.authorization,
            process.env.JWT_SECRET_KEY
        );
        if (decoded) {
            const data = User.findOne({ _id: decoded.id });
            // console.log(data._conditions._id);
            if (data) {
                req.body.id = data._conditions._id;
                next();
            } else {
                let detail = { "message": "only admin have the permission to access" };
                res.send(detail);
            }
        } else {
            let detail = { "message": "Unauthenticated User" };
            return res.send(detail);
        }

    } catch (err) {
        //   console.log(err)
        return res.send(err.message);
    }
}

/************************  admin Authentication ************************/
const adminAuthenticate = async (req, res, next) => {
    try {
        const decoded = await jwt.verify(
            // requesting the token from the header to authenticate
            req.headers.authorization,
            process.env.JWT_SECRET_KEY
        );
        // console.log("----------decoded :",decoded);
        if (decoded) {
            const data = await User.findOne({ _id: decoded.id });
            // console.log(data);
            if (data.role === 2) {
                next();
            } else {
                let detail = "only admin have the permission to access";
                res.send({ detail });
            }
        } else {
            let detail = "Unauthenticated User";
            return res.send({ detail });
        }

    } catch (err) {
        //   console.log(err)
        return res.send(err.message);
    }
}


/********** create User validation **************/
const createUserValidate = (async (req, res, next) => {
    try {
        const { email } = req.body;
        if (email) {
            const data = await User.findOne({ email });
            if (!data) {
                next();
            } else {
                const detail = "user already register";
                res.status(404).send({ detail });
            }
        } else {
            const detail = "data set is empty";
            res.status(400).send({ detail });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})





/********** login validation ************/
const loginValidation = (async (req, res, next) => {
    try {
        const { email, pass } = req.body;
        if (email) {
            const data = await User.findOne({ email: email });
            if (data) {
                const password = data._doc.pass;
                if (password == pass) {
                    res.local = data._doc
                    next();
                } else {
                    const detail = "incorrect password";
                    res.send({ detail });
                }
            } else {
                const detail = "user not found";
                res.status(404).send({ detail })
            }
        } else {
            const detail = "data set is empty";
            res.status(400).send({ detail });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = { authenticate, adminAuthenticate, loginValidation, createUserValidate };