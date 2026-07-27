const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

const keys = require("./config/keys");

require("./config/passport-setup");

const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(
    session({
        secret: keys.session.cookieKey,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose
    .connect(keys.mongoDB.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Backend is running",
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});