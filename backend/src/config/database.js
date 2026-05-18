const mongoose = require('mongoose')

async function connectToDB(){
    try{
       await mongoose.connect(process.env.MONGO_URI)
        console.log("connect to db")
    }catch(error){
         console.log("error to connect to db", error)
    }
}


module.exports = connectToDB