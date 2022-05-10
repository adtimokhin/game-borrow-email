const express = require("express");
const bodyParser = require("body-parser");

// routes
const smtpRoutes = require("./routes/smtpRoutes.js");

const app = express();

const Response = require("./response.js");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Setting the routes
app.use("/send", smtpRoutes);

app.use((err, req, res, next) => {
  const code = err.statusCode || 500;
  const message = err.message;
  const data = err.data;

  const response = new Response(code, message, data);
  res.status(code).json(response);
});

// Connecting to the database and then launching the application.
app.listen(process.env.PORT || 8080);
