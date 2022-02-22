const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:pinteb/pinteb');
mongoose.connect(`mongodb://127.0.0.1:27017/DBTest`, {
  keepAlive: true,
  useNewUrlParser: true,
});

app.use(cors());

const router = require("./router");

router(app);
app.listen(1375, () => console.log("app listen on 1375"));
