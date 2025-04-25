const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3000, DB_ADRESS = "mongodb://127.0.0.1:27017/yabsdelal" } = process.env;

require("dotenv").config();

mongoose.connect(DB_ADRESS, {});

const app = express();
app.use("/", require("./routes/index"));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log(`App use MongoDB on adress ${DB_ADRESS}`);
});
  