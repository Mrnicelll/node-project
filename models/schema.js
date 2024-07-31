const mongoose = require("mongoose");
let validator = require('validator')
const bcrypt = require('bcrypt')
const timeStampPlugin = require('./plugins/timestamps')


const userschema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (value) => {
        return validator.isEmail(value);
      },
  },
  password: {
    type: String,
    required: true,
    min: 10,
  },
});


userschema.pre("save",function(next){
  let saltRound = 5
  let user = this
  bcrypt.hash(user.password,saltRound).then(function(hash){
    user.password = hash
    console.log(user.password)
    next()
  })
})
userschema.plugin(timeStampPlugin)
module.exports = mongoose.model("users",userschema)
