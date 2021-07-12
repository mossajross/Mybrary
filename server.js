const express = require("express");
const mongoose = require("mongoose");
if (process.env.MOD_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");

const port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to mongoose"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("/authors", authorRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
