const express = require('express')
const bcrypt = require("bcrypt")
let Database = require('./models/database')
let UserModel = require("./models/schema")
const bodyparser = require("body-parser")
const app = express()
const port = 5000

app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.set('view engine','ejs');

 const createUser = (result)=>{
        let user = new UserModel({
            first_name:result.first_name,
            last_name: result.last_name,
            phone_number:result.phone_number,
            email: result.email,
            password: result.password
        })

        user
        .save()
        .then((doc) => {
          console.log(doc);
        })
        .catch((err) => {
          console.error(err);
        });
}

app.get('/', (req,res)=>{
  res.render('register')
})

app.post("/",(req,res)=>{
  let result = JSON.parse(JSON.stringify(req.body))
  let locals = {
    first_name: result.first_name,
    last_name: result.last_name,
    phone_number: result.phone_number,
    email: result.email,
    password: result.password
  }
  res.render('register', locals)
  createUser(result) 
})

const login = (users, callback)=>{
  let credentials = {
    email: users.email,
    password: users.password
  }
  console.log("your credentials", credentials.password)
  UserModel.findOne({
    email: credentials.email
  })
  .then(doc =>{
    console.log("user documment",doc)
    if (doc){
      bcrypt.compare(credentials.password, doc.password).then(function(result){
        if(result){
          console.log("login successful")
          callback(null, {message: "you have successfully been logged in"})
        }else{
          callback(new Error("your password is incorrect"))
        }
      })
    }else{
      callback(new Error("invalid credentials"))
    }
  })
  .catch(err=>callback(err))
}

app.get('/login',(req,res)=>{
  res.render('login')
})

app.post('/login',(req,res)=>{
  let result = JSON.parse(JSON.stringify(req.body))
  login(result, (err, message) => {
    if (err) {
      res.send("<h1>" + err.message + "</h1>")
    } else {
      res.send("<h1>" + message.message + "</h1>")
    }
  })
})

app.listen(port , ()=>{
  console.log(`App running on port${port}`)
})
let db = new Database()
db._connect()
  .then((response) => {
    console.log("Database connection Successful")
  })
  .catch(err=> console.error("database connection error",err))