const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const validator = require('validator')
const userSchema = new Schema({
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

userSchema.statics.signUp = async function(username,password,jobtitle,fullname,storecode) {
    //validation
    if(!username || !password || !jobtitle || !fullname || !storecode){
        throw Error ('All fields must be filled')
    }
    if (!validator.isStrongPassword(password,{minLength:4})){
        throw Error ('Password requires minimum 4 characters: 1 lowercase, 1 uppercase 1 symbol, 1 number')
    }
// { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, 
//returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10,
// pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }
    //password hash
    // const salt = await bcrypt.genSalt(10)
    // const hash = await bcrypt.hash(password,salt)
    //        password:hash,

    const user = await this.create({
        username,
        password,
        jobtitle,
        fullname,
        storecode
    })
    return user
}

userSchema.statics.login = async function(username,password){
    if(!username || !password){
        throw Error ('Enter email and password')
    }
    const user =  await this.findOne({username})
    if (!user){
        throw Error("Username not found")
    }
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        throw Error("Incorrect Password")
    }
    return user
}



module.exports = mongoose.model('User',userSchema)