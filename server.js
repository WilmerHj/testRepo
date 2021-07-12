const express = require("express");
const items = require("./routes/api/items");
const users = require("./routes/api/Users")
const app = express();
const File = require("./File");
var cors = require("cors");

// Bodyparser Middleware
app.use(express.json());

app.use(cors());
app.use("/api/users", users);
app.use("/api/items", items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));