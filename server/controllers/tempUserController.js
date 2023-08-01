const TempUser = require('../models/tempUserModel.js')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id:_id},process.env.SECRET,{expiresIn:'2d'})
}

//signUp

const signUpTempUser = async(req,res)=>{
    const{username,password,jobtitle,fullname,storecode} = req.body
    try{
        const tempUser = await TempUser.signUp(username,password,jobtitle,fullname,storecode)
        //create token
        const token = createToken(tempUser._id)
        res.status(200).json({username,token,jobtitle,storecode})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}


//view temp users

const getTempUsers = async(req,res)=>{
    const{storecode} = req.body
    try{
        const tempUserArray = await TempUser.find({"storecode":storecode}).sort({expiryDate:+1})
        const resultArray = []
        for(let i=0; i<tempUserArray.length;i++){
            //here
            const tempUser = tempUserArray[i];
            resultArray.push({
                _id: tempUser._id,
                username: tempUser.username,
                jobtitle: tempUser.jobtitle,
                fullname: tempUser.fullname
             });
        }
        res.status(200).json(resultArray)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
                // obj[i].push({id:tempUser._id, username:tempUser.username,jobtitle:tempUser.jobtitle,fullname:tempUser.fullname})

}

const deleteTempUser = async(req,res)=>{
    const{_id} = req.body
    try{
        await TempUser.deleteOne({"_id":_id})
        res.status(200)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

const addTempUser = async(req,res)=>{
    const{_id} = req.body
    console.log(_id)

    try{
        const userToAdd = await TempUser.findOne({"_id":_id})

        let username = userToAdd.username
        let password = userToAdd.password
        
        let jobtitle = userToAdd.jobtitle
        let fullname = userToAdd.fullname
        let storecode = userToAdd.storecode
        //console.log(username,password,jobtitle,fullname,storecode)
        User.signUp(username,password,jobtitle,fullname,storecode)
        await TempUser.deleteOne({"_id":_id})
        res.status(200).json({"Message":"User Added"})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    signUpTempUser,
    getTempUsers,
    deleteTempUser,
    addTempUser,
}

