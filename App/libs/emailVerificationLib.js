const nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');


let sendEmail = (sendEmailOptions) => {

    let account = {
        auth: {
            api_user: "zealous_zayn", 
            api_key: "arfin@143" 
        }
    }

    let transporter = nodemailer.createTransport(sgTransport(account));

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Meet Planner 👻" imzayn93@gmail.com', // sender address
        to: sendEmailOptions.email, // list of receivers
        subject: sendEmailOptions.subject, // Subject line
        text: `Dear ${sendEmailOptions.name},
               Thank you for being a part of Meet Planner, I hope you will enjoy the service .
        `, // plain text body
        html: sendEmailOptions.html // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        else{
            console.log('Message successfully sent.', info);
        }
       
    });

}

module.exports = {
    sendEmail: sendEmail
  }