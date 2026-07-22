const nodemailer = require('nodemailer')

const sendVerificationEmail= async(email, verificationLink)=>{
    
  try{
          
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      family: 4, // Force IPv4 to prevent ENETUNREACH IPv6 errors on Render
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

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

    const info = await transporter.sendMail(mailOptions);
    console.log("[NODEMAILER SUCCESS] Message sent:", info.messageId, info.response);
    return true;
  }catch(error){
    console.error("Failed to send verification email:", error);
    throw new Error(`Could not send verification email: ${error.message}`);
  }

}

module.exports = sendVerificationEmail