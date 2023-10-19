const UserModel = require("../models/user")
// import {bcrypt} from 'bcrypt';

KEY = "fbmfbmbfdbmnbfdb"
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
// import  transporter  from "../config/emailConfig";
const transporter = require("../config/emailConfig")
const { use } = require("../routes/userRoute");
const saltRounds = 10;

// registration 


async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    // console.log("jhjkhj", name, email, password)

    const verifyEmail = await UserModel.findOne({ useremail: email })
    if (verifyEmail) {
        res.send({ "status": "failed", "message": "Email is already exists" })
    } else {
        if (name && email && password) {

            try {
                const salt = await bcrypt.genSalt(saltRounds);
                const hashPassword = await bcrypt.hash(password, salt);

                const doc = new UserModel({
                    username: name,
                    useremail: email,
                    userpassword: hashPassword
                })
                await doc.save()

                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                
                const savedUser = await UserModel.findOne({ useremail: email })
                //generate JWT Tokens
                const token = jwt.sign({ userID: savedUser._id },
                    process.env.JWT_SECREt_KEY, { expiresIn: '5d' }
                )

                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////                
                // return res.json({ doc })
                res.status(201).send({ "status": "success", "message": "registration Successfull", "token": token })
            } catch (error) {
                console.log(error)
                res.send({ "status": "failed", "message": "unable to register " })
            }

        } else {
            res.send({ "status": "failed", "message": "All fields are required " })
        }
    }

}



/// login

async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const userAuth = await UserModel.findOne({ useremail: email })
            if (userAuth != null) {
                const isMatch = await bcrypt.compare(password, userAuth.userpassword);
                if ((userAuth.useremail === email) && isMatch) {

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    // generate JWT Token

                    const token = jwt.sign({ userID: userAuth._id }, process.env.JWT_SECREt_KEY, { expiresIn: "5d" });


                    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    res.send({ "status": "Success", "message": "Login Successfull", token: token })
                } else {
                    res.send({ "status": "failed", "message": "Email or Password are not Valid" })
                }
            }
            else {
                res.send({ "status": "failed", "message": "You are not Registered User" })
            }
        } else {
            res.send({ "status": "failed", "message": "all fields are required" })
        }
    } catch (error) {
        console.log(error)
    }
}


////change Password

async function handleUserChangePassword(req, res) {
    try {
        const { password } = req.body
        if (password) {
            try {
                const salt = await bcrypt.genSalt(saltRounds)
                const newhashPassword = await bcrypt.hash(password, salt)
                await UserModel.updateOne({ _id: req.user._id }, { $set: { userpassword: newhashPassword } }

                )
                res.send({ "status": "Success", "message": "Password Change Successfull", })
                // console.log(req.user)
            } catch (error) {
                console.log(error)
            }
        } else {
            res.send({ "status": "failed", "message": "All Fields are Required" })
        }
    } catch (error) {

    }
}


//user Logout

async function handleUserLogout(req, res) {
    res.send({ "user": req.user })
}


////password reset by email

async function handleUserPasswordResetByEmail(req, res) {
    const { email } = req.body;
    if (email) {
        const userEmail = await UserModel.findOne({ useremail: email })
        if (userEmail) {
            const secretcode = userEmail._id + process.env.JWT_SECREt_KEY;
            const newToken = jwt.sign({ userID: userEmail._id }, secretcode, { expiresIn: '15m' })
            const link = `http://127.0.0.1:3000/api/user/reset/${userEmail._id}/${newToken}`
            console.log("link", link)
            const info = await transporter.sendMail({
                from: process.env.EMAIL_FORM, // sender address
                to: userEmail.useremail, // list of receivers
                subject: "Food Recipe Password Reset Link", // Subject line
                text: "Hello world?", // plain text body
                html: `<a href=${link}>Click Here</a> to Reset Your Password`, // html body
            })
            console.log("Message sent: %s", info);
            res.send({ "status": "success", "message": "password reset email send please check your email", "info": info })
        } else {
            res.send({ "status": "failed", "message": "Email are Invalid" })
        }

    } else {
        res.send({ "status": "failed", "message": "Email are required" })
    }
}


///userpassword reset

async function userPasswordReset(req, res) {
    const { password } = req.body;
    const { id, token } = req.params;
    // console.log("id", id, "token", token);
    const user = await UserModel.findById(id);
    const newToken = user._id + process.env.JWT_SECREt_KEY;
    // console.log("token",newToken)
    try {
        jwt.verify(token, newToken);
        if (password) {
            // console.log("password",password)
            const salt = await bcrypt.genSalt(saltRounds);
            const newhashPassword = await bcrypt.hash(password, salt)
            // console.log("newhashPassword",newhashPassword)
            await UserModel.findByIdAndUpdate(user._id, { $set: { userpassword: newhashPassword } })
            res.send({ "status": "success", "message": "password reset successfully" })
        } else {
            res.send({ "status": "failed", "message": "All fields are required" })
        }


    } catch (error) {
        console.log("error", error)
        res.send({ "status": "failed", "message": "Invalid Token" })
    }
}

module.exports = { handleUserSignup, handleUserLogin, handleUserChangePassword, handleUserLogout, handleUserPasswordResetByEmail, userPasswordReset }