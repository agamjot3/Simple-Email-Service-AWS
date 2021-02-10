const AWS = require('aws-sdk');
 
AWS.config.update({region: 'ap-south-1'});
 
var params = {
  Destination: { 
    CcAddresses: [
      'agamjot3@gmail.com',
      
    ],
    ToAddresses: [
      'agamjot@nexgsolution.com',
      
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
  Source: 'SENDER_EMAIL_ADDRESS',
     'admin@nexgsolution.com',
    
},

var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

sendPromise.then(
  function(data) {
    console.log(data.MessageId);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });
