const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const validator = require('validator')
const User = require('./userModel.js')

const tempUserSchema = new Schema({
    username:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    jobtitle:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        required:true
    },
    storecode:{
        type:String,
        required:true
    }
})

//static signup method

tempUserSchema.statics.signUp = async function(username,password,jobtitle,fullname,storecode) {
    
    if(!username || !password || !jobtitle || !fullname || !storecode){
        throw Error ('All fields must be filled')
    }
    if (!validator.isStrongPassword(password,{minLength:4})){
        throw Error ('Password requires minimum 4 characters: 1 lowercase, 1 uppercase 1 symbol, 1 number')
    }
// { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, 
//returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10,
// pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }
    const exists =  await User.findOne({"username":username})
    const existsInTemp =  await this.findOne({"username":username})
    //check username not taken in users or temp
    if (exists || existsInTemp){
        throw Error("Username already in use")
    }

    const storeExists = await User.findOne({"storecode":storecode})

    if(!storeExists){
        throw Error("Store code not found")
    }
    //password hash
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    const tempUser = await this.create({
        username,
        password:hash,
        jobtitle,
        fullname,
        storecode
    })
    return tempUser
}



module.exports = mongoose.model('TempUser',tempUserSchema)