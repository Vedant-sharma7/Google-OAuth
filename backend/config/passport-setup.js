const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");
const User = require("../models/user-model");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
            callbackURL: "/auth/google/redirect",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let currentUser = await User.findOne({
                    googleID: profile.id,
                });

                if (currentUser) {
                    console.log("Existing user logged in");
                    return done(null, currentUser);
                }

                const newUser = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleID: profile.id,
                    profilePicture: profile.photos[0].value,
                });

                console.log("New user created");

                done(null, newUser);
            } catch (error) {
                done(error, null);
            }
        }
    )
);