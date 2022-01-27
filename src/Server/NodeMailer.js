const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

const PORT = 5000;

let transport = nodemailer.createTransport({
  service: "gmail",
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: "bilalshaikh.fake.acc@gmail.com",
    pass: "@@9764641992",
  },
});

transport.sendMail({
  from: "bilalshaikh.fake.acc@gmail.com",
  to: "bilalshaikh.fake.acc@gmail.com",
  subject: "test mail",
  text: "test mail from nodemailer",
}),
  (err, response) => {
    if (err) {
      console.log("err");
    } else {
      console.log("mail send successfully");
    }
  };

app.listen(PORT, () => {
  console.log("server started on port" + PORT);
});
