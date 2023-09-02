const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());

app.use(express.json());
app.get("/api", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/submit", (req, res) => {
  const requestBody = req.body;
  if (req.is("json") && Object.keys(requestBody).length != 0) {
    res.send(true);
  } else {
    res.send(false);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
