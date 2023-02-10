const express = require("express");
const app = express();
const cors = require("cors");
// const db = require('./db')
const PORT = 8080;
const otpRouter = require("./routes/optRoutes");
const githubRouter = require("./routes/githubRoutes")
const { database } = require("./firebaseConfig");
// const { database } = require('./firebaseConfig')
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// module.exports = {app, database}
// app.get('/verify/:to', async (req, res) => {
//   const to = req.params.to

//   client.verify
//     .services(serviceId)
//     .verifications.create({ to, channel: 'sms' })
//     .then((verification) => {
//       res.json(verification)
//     })
//     .catch((err) => {
//       res.json(err)
//     })
// })

// app.get('/check/:to/:code', async (req, res) => {
//   const to = req.params.to
//   const code = req.params.code
//   client.verify
//     .services(serviceId)
//     .verificationChecks.create({ to, code })
//     .then((verification) => {
//       res.json(verification)
//     })
//     .catch((err) => {
//       res.json(err)
//     })
// })

app.get("/", async (req, res) => {
  try {
    const phoneNumberRef = database.collection("users");
    const response = await phoneNumberRef.get();
    let responseArr = [];

    response.forEach((doc) => {
      responseArr.push(doc.data());
    });
    res.send(responseArr);
  } catch (err) {
    res.send(err);
  }
});

app.use("/api/auth", otpRouter);
app.use("/api/github", githubRouter);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT} port`);
});
