const { Resend } = require('resend');

const sendVerificationEmail = async (email, verificationLink) => {
  try {
    // Make sure RESEND_API_KEY is in your .env and Render Environment Variables!
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // You must use this specific address unless you add a custom domain in Resend
      to: email, // IMPORTANT: On the free tier, Resend ONLY allows sending to the email address you signed up with!
      subject: 'Verify your email address',
      html: `<h2>Welcome to our App!</h2>
        <p>Please click the link below to verify your account:</p>
        <a href="${verificationLink}" style="padding: 10px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Verify My Email</a>
        <br><br>
        <p>Or paste this link into your browser:</p>
        <p>${verificationLink}</p>`
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log("[RESEND SUCCESS] Message sent:", data.id);
    return true;
  } catch (error) {
    console.error("Failed to send verification email with Resend:", error);
    throw new Error(`Could not send verification email: ${error.message || error}`);
  }
};

module.exports = sendVerificationEmail;