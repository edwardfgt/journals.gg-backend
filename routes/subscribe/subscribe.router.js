import express from "express";
import dotenv from "dotenv";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

dotenv.config();

const subscribeRouter = express.Router();

const secret_name = "Beehiiv";

const client = new SecretsManagerClient({
  region: "us-east-1",
});

let response;

try {
  response = await client.send(
    new GetSecretValueCommand({
      SecretId: secret_name,
      VersionStage: "AWSCURRENT",
    })
  );
} catch (error) {
  console.log(error);
  throw error;
}

const secret = response.SecretString;

subscribeRouter.post("/", (req, res) => {
  const { email, pubID } = req.body;
  subscribe(pubID, email)
    .then((response) => {
      if (response.status === 200) {
        res.status(201).json({ message: "Successful" });
      } else if (response.status === 401) {
        throw new Error("Unauthorized: Invalid API Key");
      } else {
        throw new Error(`Response failed with status: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error(error);
      if (error.message === "Unauthorized: Invalid API Key") {
        res.status(401).json({ message: "Error: " + error.message });
      } else {
        res.status(500).json({ message: "Error: " + error.message });
      }
    });
});

function subscribe(pubID, email) {
  const apiKey = secret;
  const url = `https://api.beehiiv.com/v2/publications/${pubID}/subscriptions`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email: email,
      reactivate_existing: false,
      send_welcome_email: true,
      utm_source: "Journals.gg",
      referring_site: "https://journals.gg",
    }),
  };

  return fetch(url, options);
}

export default subscribeRouter;
