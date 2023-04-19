require("dotenv").config();
const mongoose = require("mongoose");
const error = require("mongoose/lib/error");


mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {console.log("DB CONNECTED....")})
.catch((error) => {console.log(error)})

const mySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

const User = new mongoose.model("User",mySchema)

module.exports = User;