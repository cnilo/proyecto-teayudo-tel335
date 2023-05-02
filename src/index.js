const express = require("express");
const userRoutes = require("./routes/user");
require("dotenv").config();

const port = process.env.PORT || 9000;

const app = express();

// middleware
app.use("/api",userRoutes);

app.listen(port, () => console.log('server listening on port',port));