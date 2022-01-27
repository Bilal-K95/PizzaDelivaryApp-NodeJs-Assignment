const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const jwtSecret = "asd889asdas5656asdasbilal";
const app = express();
const PORT = 3001;
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//nodemailer package
const nodemailer = require("nodemailer");

//jwt token
function autenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token == null) {
    res.json({ err: 1, msg: "Token not match" });
  } else {
    jwt.verify(token, jwtSecret, (err, data) => {
      if (err) {
        res.json({ err: 1, msg: "Token incorrect" });
      } else {
        console.log("Match");
        next();
      }
    });
  }
}

// DB connection

const DB = "mongodb://localhost:27017/menu";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connection succes fully");
  })
  .catch((err) => {
    console.log("no connection");
  });

//model schemas
const menuSchema = require("./model/menuSchema");
const userSchema = require("./model/userSchema");
const orderSchema = require("./model/orderSchema");

app.get("/", (req, res, next) => {
  throw new error("somthing went wrong");
  res.json({ msg: "default routes" });

  // res.redirect("/");
});

app.post("/log", (req, res) => {
  userSchema.findOne({ email: req.body.email }, (err, data) => {
    if (err) throw err;
    else {
      if (data != null) {
        if (data.password === req.body.password) {
          let payload = {
            email: data.email,
          };
          const token = jwt.sign(payload, jwtSecret, { expiresIn: 3600000 });
          res.json({ err: 0, msg: "Login Success", token: token });
          //res.send(data)
        } else res.send({ err: 1, msg: "Password incorrect" });
      } else {
        res.send({ err: 2, msg: "User not found" });
      }
    }
  });
});
// userSchema.findOne({ email: req.body.email }, (err, data) => {
//   if (err) {
//     res.json({ err: 1, msg: "Email or password is not correct" });
//   } else if (data == null) {
//     res.json({ err: 1, msg: "Email or password is not correct" });
//   } else {
//     let payload = {
//       email: req.body.email,
//     };
//     const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 });
//     res.json({ err: 0, msg: "Login Success", token: token });
//   }
// });

// app.get("/log", (req, res) => {
//   console.log(req.body.email)
//   userSchema.find({email:req.body.email},(err,data)=>
//   {
//     if(err) throw err;
//     res.send(data)

//   })
//  });

app.post("/signup", (req, res) => {
  console.log(req.body);
  // res.send("hello from other side");

  let name = req.body.name;
  let email = req.body.email;
  let mobile = req.body.mobile;
  let address = req.body.address;
  let password = req.body.password;
  //store data or append data in post.json
  let ins = new userSchema(req.body);
  ins.save((err) => {
    if (err) {
      res.json({ err: 1, msg: "Not Registered" });
    } else {
      res.json({ err: 0, msg: "Registered" });
      console.log(ins);
    }
  });
});

app.get("/menu", autenticateToken, (req, res) => {
  menuSchema.find({}, (err, data) => {
    if (err) throw err;
    else {
      res.send(data);
    }
  });
});

app.post("/order", autenticateToken, (req, res) => {
  console.log(req.body.email);
  let tmp = new orderSchema({ email: req.body.email, list: req.body.list });
  console.log(req.body.email);
  tmp.save((err) => {
    if (err) res.send({ err: 1, msg: "failed to save your orders." });
    else {
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
        html: "<h1>your pizza ordered successfully </h1>",
      }),
        (err, response) => {
          if (err) {
            console.log("err");
          } else {
            console.log("mail send successfully");
          }
        };

      // ("use strict");

      // // async..await is not allowed in global scope, must use a wrapper
      // async function main() {
      //   // Generate test SMTP service account from ethereal.email
      //   // Only needed if you don't have a real mail account for testing
      //   // let testAccount = await nodemailer.createTestAccount();

      //   // create reusable transporter object using the default SMTP transport
      //   let transporter = nodemailer.createTransport({
      //     host: "smtp.gmail.com",
      //     port: 465,
      //     secure: false, // true for 465, false for other ports
      //     auth: {
      //       user: "bilalshaikh.fake.acc@gmail.com", // generated ethereal user
      //       pass: "@@9764641992", // generated ethereal password
      //     },
      //   });

      //   // send mail with defined transport object
      //   let info = await transporter.sendMail({
      //     from: "bilalshaikh.fake.acc@gmail.com", // sender address
      //     to: "bilalshaikh.fake.acc@gmail.com", // list of receivers
      //     subject: "Hello ✔", // Subject line
      //     text: "Hello world?", // plain text body
      //     html: "<b>Hello world?</b>", // html body
      //   });

      //   console.log("Message sent: %s", info.messageId);
      //   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      //   // Preview only available when sending through an Ethereal account
      //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      //   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      // }

      // main().catch(console.err);

      res.send({ err: 0 });
    }
  });
});

//custom middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send("something broken");
});

//wrong url error
app.use((req, res, next) => {
  res.status(404).send({
    status: 404,
    error: "not found",
  });
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`working on port ${PORT}`);
});
