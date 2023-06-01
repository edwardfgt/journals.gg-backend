import express from "express";
import dotenv from "dotenv";
dotenv.config();

const emailRouter = express.Router();

import aws from "aws-sdk";

const ses = new aws.SES({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});

emailRouter.post("/", (req, res) => {
  console.log("request.body is " + JSON.stringify(req.body));

  const { email, message, subject } = req.body;
  console.log("extracted values are: " + email, message, subject);
  sesTest("mail@journals.gg", "ed@journals.gg", email, message, subject)
    .then((val) => {
      console.log("returned" + val);
      res.send("successful");
    })
    .catch((err) => {
      res.send("error" + err);
    });
});

function sesTest(emailTo, emailFrom, email, message, subject) {
  console.log("Input parameters:", emailTo, emailFrom, message, subject);
  const params = {
    Destination: {
      ToAddresses: [emailTo],
    },
    Message: {
      Body: {
        Text: {
          Data: "Sender: " + email + "\n" + "Message " + message,
        },
      },
      Subject: {
        Data: `CONTACT FORM: ${subject}`,
      },
    },
    Source: emailFrom,
  };
  return ses.sendEmail(params).promise();
}

export default emailRouter;
