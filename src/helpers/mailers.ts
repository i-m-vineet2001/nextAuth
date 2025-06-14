// //this aproch is better for server component
// // domain.com/verifytoken/dqwdwdwd

// //this aproch is better for client component
// // domain.com/verifytoken?token=dwdwdd

// import nodemailer from 'nodemailer';
// import User from '@/models/userModel'
// import bcrypt from 'bcryptjs';

// export const sendMail = async({email,emailType,userId}:any) =>{
//     try {
//         const hashedToken = await bcrypt.hash(userId.toString(),10)

//         if(emailType === "VERIFY"){
//             await User.findByIdAndUpdate(userId,{
//                         verifyToken:hashedToken,
//                         verifyTokenExpiry:Date.now()+3600000
//                     })
//         }else if(emailType==="RESET"){
//             await User.findByIdAndUpdate(userId,{
//                 forgotPasswordToken:hashedToken,
//                 forgotPasswordTokenExpiry:Date.now()+3600000
//             })
//         }

//   // Looking to send emails in production? Check out our Email API/SMTP product!
//   var transport= nodemailer.createTransport({
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: process.env.MAILTRAP_USER,
//     pass: process.env.MAILTRAP_PASS
//   },
// });

// const mailOptions = {
//     from:'patelvineet71@gmail.com',
//     to:email,
//     subject: emailType === 'VERIFY' ?"Verify your email": "reset your password",
//     html:`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType==="VERIFY"?"Verify your email":"reset your password"} or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
// }


// const mailresponse = await transport.sendMail(mailOptions);
//     return mailresponse;

// // await User.findByIdAndUpdate(
// //     {
// //         resetPasswordToken:hasedToken,
// //         resetPasswordExpires:Date.now()+36000
// //     },
// //     {new:true,
// //         runValidators:true
// //     }
// // )

//     } catch (error:any) {
//         throw new Error(error.message);
//     }
// }



import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // Create nodemailer transporter for Mailtrap
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "8a550577d9c493",
        pass: process.env.MAILTRAP_PASS || "c1fdf8d145a84d"
      },
    });

    const verifyUrl = `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`;
    
    const mailOptions = {
      from: '"Auth System" <auth@example.com>',
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email address" : "Reset your password",
      text: `
        ${emailType === "VERIFY" ? "Please verify your email address" : "Reset your password"}
        
        Click this link: ${verifyUrl}
        
        Or copy and paste this URL into your browser:
        ${verifyUrl}
        
        This link will expire in 1 hour.
      `,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Email Verification</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <h1 style="color: #333; text-align: center;">${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}</h1>
            
            <p style="color: #666; font-size: 16px;">Hello,</p>
            
            <p style="color: #666; font-size: 16px;">
              ${emailType === "VERIFY" 
                ? "Thank you for signing up! Please click the button below to verify your email address." 
                : "You requested to reset your password. Click the button below to proceed."}
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verifyUrl}" 
                 style="background-color: #007cba; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; display: inline-block;">
                ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px;">If the button doesn't work, copy and paste this URL into your browser:</p>
            <p style="color: #007cba; word-break: break-all; font-size: 14px;">${verifyUrl}</p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              This link will expire in 1 hour for security reasons.
            </p>
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              If you didn't request this email, please ignore it.
            </p>
          </div>
        </body>
        </html>
      `
    };

    console.log("Sending email to:", email);
    console.log("Verification URL:", verifyUrl);
    
    const response = await transport.sendMail(mailOptions);
    console.log("Email sent successfully:", response.messageId);
    
    return response;
  } catch (error: any) {
    console.error("Email sending error:", error);
    throw new Error(error.message);
  }
};
