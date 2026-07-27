const router = require("express").Router();
const passport = require("passport");

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

router.get(
    "/google/redirect",
    passport.authenticate("google", {
        failureRedirect: "/auth/login/failed",
    }),
    (req, res) => {
        // We'll change this later to your React frontend URL
        res.redirect("http://localhost:5173/dashboard");
    }
);

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.session.destroy(() => {
            res.redirect("http://localhost:5173");
        });
    });
});

router.get("/current_user", (req, res) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Not authenticated",
        });
    }

    res.json({
        success: true,
        user: req.user,
    });
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "Authentication failed",
    });
});

module.exports = router;