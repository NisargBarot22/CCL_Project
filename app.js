require("dotenv").config();

const express = require("express")
const bodyparser = require("body-parser")
const mongoose = require("mongoose");
const User = require("./model/model")

const app = express()

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.urlencoded({extended:false}))

app.set('view engine', 'ejs');

app.use(express.static(__dirname+"/public"));

const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery', true);

app.get("/", (req, res) => {
    res.render('SignIn.ejs', {
        invalidCredentialsMessage: ''
    })
})

app.post("/",async (req, res) => {

        const check=await User.findOne({email: req.body.email})
        if(check){
            if(check.password === req.body.password){
                res.redirect("/home");
            }else{
                res.render('SignIn.ejs', {
                    invalidCredentialsMessage: 'Invalid Email or Password'
                })
            }
        }else{
            res.render('SignIn.ejs', {
                invalidCredentialsMessage: 'Invalid Email or Password'
            })
        }    
});

app.get("/register", (req, res) => {

    res.render('SignUp1.ejs', {
        userAlreadyExits: ' '
    })
})

app.post('/register', async (req, res) => {

    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser){
            res.render('SignUp1.ejs', {userAlreadyExits: 'Email Id already exits!!!'})
        }else{
            const user = new User({
                email: req.body.email,
                password: req.body.password,
            });
            const savedUser = await user.save();
            res.redirect("/home");
            } 
        }catch (err) {
        res.status(400).send("err");
      }
  });
  

  app.get("/home", (req, res) =>{
    res.sendFile(__dirname+"/public/Home_Page/index.html");
  })


app.listen(PORT, () => {
    console.log("Listening to port: 3000");
})