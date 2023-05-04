import express from "express";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

import aws from "aws-sdk";

const ses = new aws.SES({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});

router.post("/email", (req, res) => {
  console.log("request.body is " + JSON.stringify(req.body));

  const { email, message, subject } = req.body;
  console.log("extracted values are: " + email, message, subject);
  sesTest(email, "mail@journals.gg", message, subject)
    .then((val) => {
      console.log("returned" + val);
      res.send("successful");
    })
    .catch((err) => {
      res.send("error" + err);
    });
});

function sesTest(emailTo, emailFrom, message, subject) {
  console.log("Input parameters:", emailTo, emailFrom, message, subject);
  const params = {
    Destination: {
      ToAddresses: [emailTo],
    },
    Message: {
      Body: {
        Text: {
          Data: "From" + emailFrom + "\n" + message,
        },
      },
      Subject: {
        Data: `${subject}`,
      },
    },
    Source: emailFrom,
  };
  return ses.sendEmail(params).promise();
}

export default router;
