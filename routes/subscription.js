// import express from "express";
// import dotenv from "dotenv";
// dotenv.config();

// const router = express.Router();

// const API_URL = 'http://some-url.com/path'

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

// app.get('/api', (req, res) => {
//   request(
//     { url: `${API_URL}` },
//     (error, response, body) => {
//       if (error || response.statusCode !== 200) {
//         return res.status(500).json({ type: 'error', message: error.message });
//       }

//       res.json(JSON.parse(body));
//     }
//   );
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`listening on ${PORT}`));
