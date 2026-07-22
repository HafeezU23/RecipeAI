const nodemailer = require('nodemailer')

const sendVerificationEmail= async(email, verificationLink)=>{
    
  try{
          
    const transporter = nodemailer.createTransport({
           service: "gmail",
           auth:{
            user:process.env.MAIL_ID,
            pass:process.env.MAIL_APP_PASSWORD
           }
    })

    const mailOptions = {
        from: `"Recipe AI" <${process.env.MAIL_ID}>`,
        to: email,
        subject: "Verify your email address",
        html:`<h2>Welcome to our App!</h2>
        <p>Please click the link below to verify your account:</p>
        <a href="${verificationLink}" style="padding: 10px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Verify My Email</a>
        <br><br>
        <p>Or paste this link into your browser:</p>
        <p>${verificationLink}</p>`
    }

    await transporter.sendMail(mailOptions)
    return true
  }catch(error){
    console.error("Failed to send verification email:", error);
    throw new Error(`Could not send verification email: ${error.message}`);
  }

}

module.exports = sendVerificationEmail