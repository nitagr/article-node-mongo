const Comment =require('../models/comment');
const Article =require('../models/article');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signupUser = async (req, res) =>{

    let user = new User(req.body);
    let username = req.body.username;
    try{
        let userCheck = await User.findOne({username},"username password");
        if(userCheck){
            res.status(500).json({status:500,message:'username already taken'});
        } else{
            user = await user.save();
            var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
            res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
            res.status(200).json({status:200, message:'success', data:user});
        }
    }  catch(err){
        console.log(err.message);
        res.status(err.status).json({status:err.status, message:err.message});
    }
}

exports.loginUser = async (req, res) => {

    let username = req.body.username;
    let password = req.body.password;
    try{
        let user = await User.findOne({ username },"username password");

        if(!user){
            return res.status(401).json({status:401, message: 'Wrong username or Password'});
        }
        user.comparePassword(password, (err, isMatch) => {

            if (!isMatch) {
                return res.status(401).json({ message: "Wrong Username or password" });
            }
            const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
            expiresIn: "60 days"
            });
                res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
                res.status(200).json({status:200, message:'login successful', token:token,user:user});
            })
    } catch(err) {
            res.status(err.status).json({status:err.status, message: err.message});
        }
}

exports.users = async (req, res)=>{
    try{
        let userss = await User.find();
        res.status(200).json({status:200, message:'success',data:userss});
    } catch(err){
        console.log('inside users');
        console.log(err.message);
        res.status(err.status).json({status:err.status, message:err.message});
    }
}