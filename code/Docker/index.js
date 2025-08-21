const express = require("express");

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  return res.json({
    message: "Hey, I am nodejs in contianer.",
  });
});

app.listen(PORT, () => {
  console.log("server is listening at PORT " + PORT);
});
