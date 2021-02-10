const express = require('express');
const otpGenerator = require('otp-generator')
const app = express();
app.use(express.json());
require('dotenv').config();

var AWS = require('aws-sdk');
AWS.config.update({region:'ap-south-1'});


app.post('/ses', (req, res) => {
    
    console.log("Message = " + req.body.message + newotp);
    console.log("Number = " + req.body.number);
    console.log("Subject = " + req.body.subject);
    var params = {
        Destination: { 
          CcAddresses: [
            'agamjot3@gmail.com'
            
          ],
          ToAddresses: [
            'agamjot@nexgsolution.com'
            
          ]
        },
        Message: { 
          Body: {
            Text: {
             Charset: "UTF-8",
             Data: "TEXT_FORMAT_BODY"
            }
           },
           Subject: {
            Charset: 'UTF-8',
            Data: 'Test email'
           }
          },
        Source: 'admin@nexgsolution.com'
          
      },
    
      
      const sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
      
      sendPromise.then(
        function(data) {
          res.status(200).json({
              success:true,
              data
          })
        }).catch(
          function(err) {

            res.status(400).json({
                success:true,
                data:err
            })
        });
      
});

app.listen(5000, () => console.log('SMS Service Listening on PORT 3000'))