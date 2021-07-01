const express = require("express");
const otpGenerator = require("otp-generator");
const app = express();
app.use(express.json());
require("dotenv").config();

const emailData = `
<p>Hey there,</p>
<br>
<p>Thanks for your patience, finally we have new apps to be tested and reviewed on Qantily.com.</p>
<br>
<p>Just log in to your account and start testing.</p>
<br>
<p>Find bugs and review the apps and get rewarded. Alternatively, <a href="https://qantily.com/">click here</a>.</p>
<br>
<p>Best Regards</p>
<p>Team Qantily</p>
<p>8851408462</p>
<img src="https://qantily.com/static/media/quantlyBanner.76638962.png" alt="Qantily" width="90px" />
`;

var AWS = require("aws-sdk");
AWS.config.update({ region: "ap-south-1" });

app.post("/ses", (req, res) => {
  console.log("toEmail = " + req.body.toEmail);

  var params = {
    Destination: {
      CcAddresses: ["agamjot3@gmail.com"],
      ToAddresses: [req.body.toEmail],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: emailData,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "An update from Qantily",
      },
    },
    Source: "noreply@qantily.com",
  };

  const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
    .sendEmail(params)
    .promise();

  sendPromise
    .then(function (data) {
      res.status(200).json({
        success: true,
        data,
      });
    })
    .catch(function (err) {
      res.status(400).json({
        success: true,
        data: err,
      });
    });
});

app.listen(5000, () => console.log("SMS Service Listening on PORT 3000"));
