const cors = require("cors");
const express = require("express");
// TODE:add a stripe key
const stripe = require("stripe")(process.env.PUBLISHABLE_KEY);
const uuid = require("uuid");

const app = express();
const PORT = process.env.PORT || 5000;

//middelware
app.use(express.json());

app.use(cors());

app.use(require("./routes/payment.routes"));

app.get("/", (req, res) => {
  res.send("server is working");
});
app.listen(PORT, () => {
  console.log(`Server is runnig http://localhost:${PORT}/`);
});
