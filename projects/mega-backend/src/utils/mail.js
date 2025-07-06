import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendMail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      // Appears in header & footer of e-mails
      name: "Task",
      link: "https://mailgen.js/",
      // Optional product logo
      // logo: 'https://mailgen.js/img/logo.png'
    },
  });

  // Generate an HTML email with the provided contents
  var emailHTML = mailGenerator.generate(options.mailGenContent);

  //with plain text
  var eamilText = mailGenerator.generatePlaintext(options.mailGenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD,
    },
  });

  const mail = {
    from: process.env.SENDERMAIL,
    to: options.email,
    subject: options.subject,
    text: eamilText, // plain‑text body
    html: emailHTML, // HTML body
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.log("Email failed to send!" + err);
  }
};

const emailVerificationMailGenContent = (username, verificationURL) => {
  return {
    body: {
      name: username,
      intro: "Welcome to App! We're very excited to have you on board.",
      action: {
        instructions: "To get started with our App, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "verify your email",
          link: verificationURL,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

// //how to use send email
// sendMail({
//   email: user.email,
//   subject: " aaaa",
//   mailGenContent: emailVerificationMailGenContent(username, verificationURL),
// });

const forgotPasswordMailGenContent = (username, passwordResetURL) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset your password .",
      action: {
        instructions: "To change your password, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "reset password",
          link: passwordResetURL,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

// //how to send email
// sendMail({
//     email: user.email,
//     subject: " aaaa",
//     mailGenContent: emailVerificationMailGenContent(username, passwordResetURL),
//   });
