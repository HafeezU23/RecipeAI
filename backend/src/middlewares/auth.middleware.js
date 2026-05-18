const firebaseAdmin = require("../config/firebase");

const verifyToken = async (req, res, next)=>{
     
    const header = req.headers.authorization
    
    if(!header){
        return res.status(401).json({
            message: "Error! no token found"
        })
    }

    const token = header.split(' ')[1]

    try{
            
        const decoded = await firebaseAdmin.auth().verifyIdToken(token)
        req.user = decoded;
        next()
    }catch(error){
        return res.status(401).json({
            message: "Error! Token verification failed"
        })
    }

}

module.exports = verifyToken