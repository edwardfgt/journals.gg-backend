import express from "express";
import dotenv from "dotenv";
dotenv.config();

const subscribeRouter = express.Router();

subscribeRouter.post("/", (req, res) => {
  console.log("request body is " + JSON.stringify(req.body));

  const { email, pubID } = req.body;
  console.log("extracted values are: " + email, pubID);
  subscribe(pubID, email)
    .then((response) => {
      if (response.ok) {
        res.status(200).json({ message: "Successful" });
      } else {
        throw new Error(`Response failed with status: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error: " + error.message });
    });
});

function subscribe(pubID, email) {
  const apiKey = process.env.BEEHIIV_SECRET_KEY;
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
