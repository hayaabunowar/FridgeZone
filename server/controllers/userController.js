const User = require('../models/userModel.js')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt = require('bcrypt')

const createToken = (_id) => {
    return jwt.sign({_id:_id},process.env.SECRET,{expiresIn:'2d'})
}


//login
const loginUser = async(req,res)=>{
    const {username,password} = req.body
    try{
        const user = await User.login(username,password)
        const token = createToken(user._id)
        //find jobtitle from db
        const jobtitle = user.jobtitle
        const storecode = user.storecode
        res.status(200).json({username,token,jobtitle,storecode})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}


//view

const viewUsers = async(req,res)=>{
    const{storecode} = req.body
    //console.log(storecode)
    try{
        const users = await User.find({"storecode":storecode,"jobtitle":{$ne:"HeadChef"}}).sort({username:+1})
        res.status(200).json(users)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}


//change pass

const changePass = async(req,res)=>{
    const{storecode,newPass,_id} = req.body
    try{
        if (!validator.isStrongPassword(newPass,{minLength:4})){
            throw Error ('Password requires minimum 4 characters: 1 lowercase, 1 uppercase 1 symbol, 1 number')
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newPass,salt)
        const userUpdated = await User.findOneAndUpdate({"storecode":storecode,"_id":_id},{"password":hash},{new:true})
        res.status(200).json(userUpdated)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}


//signUp

const signUpUser = async(req,res)=>{
    //not needed got temp user
    const{username,password,jobtitle,fullname,storecode} = req.body
    try{
        const user = await User.signUp(username,password,jobtitle,fullname,storecode)
        //create token
        const token = createToken(user._id)
        
        res.status(200).json({username,token,jobtitle,storecode})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

const deleteUser = async(req,res)=>{
    const{storecode,_id} = req.body
    try{
        const userRemoved = await User.deleteOne({"storecode":storecode,"_id":_id},{new:true})
        res.status(200).json(userRemoved)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

const changeRole = async(req,res)=>{
    const{storecode,newRole,_id} = req.body

    try{
        const newRoleUser = await User.findOneAndUpdate({"storecode":storecode,"_id":_id},{"jobtitle":newRole},{new:true})
        res.status(200).json(newRoleUser)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
    
}


module.exports = {
    loginUser,
    signUpUser,
    viewUsers,
    changePass,
    deleteUser,
    changeRole
}

