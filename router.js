const express = require ("express");
const router = express.Router();

router.get("/", function (req, res) {
    res.send("Siz home sahifasidasiz");
});

router.get("/menu", (req, res) => {
    res.send("Siz menu sahifasidasiz");
});

router.get ("/community", (req, res) => {
    res.send("Siz jamiyat sahifasidasiz");
});

module.exports = router;