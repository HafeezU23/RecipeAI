const userModel = require("../models/user.model")
const firebaseAdmin  = require("../config/firebase")
const sendVerificationEmail = require('../utils/sendEmail');
const recipeModel = require("../models/recipe.model");

const UserRegisterController = async (req, res)=>{

const {fullname, username, email ,password} = req.body;

if(!fullname || !username || !email || !password){
      return res.status(400).json({
        message: "All fields are required!"
      })
}

try{

    const existingUser = await userModel.findOne({ $or :[{username:username}, {email:email}]})
     if(existingUser){
      if(existingUser.email == email){
        return res.status(400).json({
          message: "This email is already register with us!",
         
        })
      }
      if(existingUser.username == username){
        return res.status(400).json({
          message: "This username is already taken by someone!",
          
        })
      }
     }
    const firebaseUser = await firebaseAdmin.auth().createUser({
        email: email,
        password: password,
        displayName: username,
    })

    const newUser = await userModel.create({
        fullname: fullname,
        username:username,
        email:email,
        firebaseUid: firebaseUser.uid,
        isVerified: false
    })

    const verificationLink = await firebaseAdmin.auth().generateEmailVerificationLink(email);
    

    await sendVerificationEmail(email, verificationLink);


    return res.status(201).json({
        message: `user created successfully, verify account by clicking verification link we just send at ${email}`,
        user:{
            uid: firebaseUser.uid,
            email: firebaseUser.email
        }
    })

}catch(error){

     return res.status(401).json({
message: `Error creating user: ${error.message || error}`,        
    })
   
}


}

const UserLoginController = async (req, res)=>{
try{
      const {uid, email_verified} = req.user;
       
      let user = await userModel.findOne({firebaseUid: uid});

      if(!user){
        return res.status(401).json({
            message: "user not found!"
        })
      }

      if(user.isVerified == false && email_verified == true){
        user.isVerified = true;
        await user.save()
      }

      if(!user.isVerified){
        return res.status(403).json({
            message: "Email not verified, go check your inbox or spam folder to verify your email"
        })
      }

      return res.status(201).json({
        message: "User Login Successfully",
        user:{
            id:user._id,
            fullname: user.fullname,
            username: user.username,
            email:user.email,
            isVerified: user.isVerified,
            joinDate: user.createdAt
        }
      })
    }catch(error){
        return res.status(401).json({ message: `Server error during login: ${error.message}` })
    }

}

const UserDeleteAccountController = async(req, res)=>{
  try{
       const firebaseUid = req.user.uid;
       
       if(!firebaseUid){
        return res.status(401).json({
          message: "user not found!",
          error: error.message || error
        })
      }

      const recipes = await recipeModel.find({firebaseUid: firebaseUid})
      if(recipes.length > 0){
        await recipeModel.deleteMany({firebaseUid: firebaseUid})
      }
      await userModel.deleteOne({firebaseUid: firebaseUid})
      await firebaseAdmin.auth().deleteUser(firebaseUid);
      return res.status(201).json({
        success: true,
        message: "user deleted successfully"
      })


  }catch(error){
           return res.status(501).json({
            message: `Error deleting account: ${error.message || error}`
           })
  }
}

module.exports = { UserRegisterController, UserLoginController, UserDeleteAccountController }