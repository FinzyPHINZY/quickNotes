const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = process.env.port || 8000;
const dotenv = require("dotenv");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/database");
const methodOverride = require("method-override");
const homeRoutes = require("./routes/home.js");
const authRoutes = require("./routes/auth.js");
const noteRoutes = require("./routes/note.js");
const passport = require("passport");
const path = require("path");

dotenv.config({ path: "./config/.env" });

require("./config/passport.js")(passport);

connectDB();

app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_STRING }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT} ... betta go catch it`
  );
});
