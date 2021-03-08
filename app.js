const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors")
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

 
app.get("/", (req, res) => {
  res.send("Hello World!");
});
let login = process.env.LOGIN || '---'
let password = process.env.PASSWORD || '---'
app.post("/sendMessage", async (req, res) => {
 

  let transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: login,
      pass: password
    },
  })
  const{name, email, phone, message}=req.body
    let info = await transporter.sendMail({
      from: "HR via portfolio", // sender address
      to: "vladimirplotnikov371@gmail.com", // list of receivers
      subject: "From portfolio", // Subject line
      html: `<b>From portfolio</b>
      <div>Send from: ${name}</div>
      <div>Email: ${email}</div>
      <div>Tel: ${phone}</div>
      <div>Message: ${message}</div>`, // html body
    });
  res.send('done')
})

let port = process.env.PORT || 3010;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
