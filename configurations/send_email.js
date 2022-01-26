var nodemailer = require('nodemailer');
var dotEnv = require("dotenv").config();

// send email code
var transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAILID,
    pass: process.env.EMAILPASSWORD,
  },
});

function email_details(customer, sub, msges) {
  var mailOptions = {
    from: process.env.EMAILID,
    to: customer,
    subject: sub,
    html: msges,
  };
  return mailOptions;
}

// to generate random alph-numeric string
var ranDom = Math.random().toString(36).slice(2);

// function to send email when requested to reset the password
function resetPass(sendTo,userName) {
  var subject = "Request To Reset Password";
  var msg = `<body >
                    <h3>Hi ${userName},</h3>
                   <br><br>
                    
                        <p>You recently requested to reset the password for your Oliomart account. 
                            Below is your temporary Password 
                            <center><b>${ranDom}<b></center>
                           
                          <p style='color:red'><b>*Note:*</b>Change the password immediately as soon as you login.</p>
                            If you did not request a password reset, please ignore this email or reply to let us know. 
                            This password reset link is only valid for the next 30 minutes. </p>

                            <br>
                            <br>
                            <p>Thanks, Oliomart team</p>
                               
                </body>`;

  const mailOp = email_details(sendTo, subject, msg);

  transporter.sendMail(mailOp, function (error, info) {
    if (error) {
      return error
    }
    return true
  })
  return ranDom
}

// to generate random otp
var ranDomOtp = Math.floor(100000 + Math.random() * 900000);
// console.log(ranDomOtp);

function sendEmailOtp(sendTo, userName){
    
  var subject = "Email Verification";
  var msg = `<body >
                    <h3>Hi ${userName},</h3>
                   <br><br>
                    
                        <p>Your OTP is <b>${ranDomOtp}<b>
                           
                          <p style='color:red'><b>*Note:*</b>Valid for next 10 minutes</p>
                            If you did not request a OTP, please ignore this email or reply to let us know.</p>
                            <br>
                            <br>
                            <p>Thanks, Oliomart team</p>
                               
                </body>`;

  const mailOp = email_details(sendTo, subject, msg);
  transporter.sendMail(mailOp, function (error, info) {
    if (error) {
      return error
    }
    return true
  })
  return ranDomOtp
}

module.exports = {resetPass, sendEmailOtp}