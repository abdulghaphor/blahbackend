const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const contentRouter = require("./apis/content/routes");

// initialize app
const app = express();
global.__appdir = __dirname;

// middleware
app.use(express.json());
app.use(cors());

app.use("/", contentRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    name: err.name || "ERR_NOTSPECIFIC",
    message: err.message || "Internal Server Error",
  });
});

// run app fn
const run = async () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });
    const db = await mongoose.connect(process.env.DB_URI);
    console.log("Connected to database");
  } catch (err) {
    console.error("Unable to start server", err);
  }
};
run();
