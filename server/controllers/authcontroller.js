const User = require('../data/User');
const jwt = require('jsonwebtoken')

async function auth_register(req, res) {
    try {
        let { username, password, email } = req.body;
        const isPresentEmail = await User.find({ email });
        const isPresentUsername = await User.find({ username });
        const jwtSec = process.env.JWT_SECRETKEY;
        if (isPresentEmail.length == 0) 
        {
            if (isPresentUsername.length == 0) 
            {
                const createdUser = await User.create({username,email,password})
                console.log(createdUser._id);
                const token = jwt.sign({userId:createdUser._id},jwtSec)
                console.log("The Token is: ",token)
                res.cookie('token',token).status(200).json(JSON.stringify({
                    status:true,
                    message:"Account Created Succesfully"
                }))
            }
            else
            {
                res.status(200).json(JSON.stringify({
                    status:false,
                    message:"Username already exist"
                }));
                return;
            }
        }
        else 
        {
            res.status(200).json(JSON.stringify({
                status: false,
                message: "Email Already Exist Try Logging In!!!!"
            }));
            return;
        }
    } catch (error) {
        console.log("auth_register Error here dev: ", error)
        res.status(500).json(JSON.stringify({ status: false, message: "Some error has occured try after some time" }));
    }
}
async function auth_login(req, res) {
    try {
        let { username, password } = req.body;
        console.log(username, password);
        res.status(200).json(JSON.stringify({
            status: true,
            message: "User Authenticated"
        }));
    } catch (error) {
        console.log("auth_login Error here dev: ", error)
        res.status(500).json(JSON.stringify({ status: false, message: "Some error has occured try after some time" }));
    }
}
async function auth_checkAuth(req, res) {
    try {
        res.status(200).json(JSON.stringify({
            status: true,
            message: "User Verified"
        }));
    } catch (error) {
        console.log("auth_checkAuth Error here dev: ", error)
        res.status(500).json(JSON.stringify({ status: false, message: "Some error has occured try after some time" }));
    }
}

module.exports = { auth_register, auth_login, auth_checkAuth }