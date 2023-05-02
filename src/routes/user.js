const express = require("express");

const router = express.Router();

// TEST API
router.get('/user', (req, res) => {
    res.send("create user");
});

module.exports = router;