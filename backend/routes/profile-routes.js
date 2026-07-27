const router = require("express").Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    next();
};

router.get("/", authCheck, (req, res) => {
    res.json({
        success: true,
        user: req.user,
    });
});

module.exports = router;