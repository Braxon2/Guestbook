require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./config/dbconfig");

const messageRoutes = require("./routes/messageRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/api/v1", messageRoutes);

db.getConnection()
  .then((connection) => {
    console.log(`Connection to database ${process.env.DB_NAME} is successful`);
  })
  .catch((err) => {
    console.error("Failed to connect to MySQL database:", err.message);
    process.exit(1);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
