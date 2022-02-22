const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:pinteb/pinteb');
mongoose.connect(`mongodb://127.0.0.1:27017/kayran`, {
  keepAlive: true,
  useNewUrlParser: true,
});

app.use(cors());

const router = require("./router");
// app.get('/', function (req, res) {
//     res.send('Hello World');
//  })
router(app);
app.listen(1375, () => console.log("app listen on 1375"));
