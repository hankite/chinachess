const express = require("express");
const { protectRoute } = require("../auth/protect");
const { playView,createRoom } = require("../controllers/playController");

const router = express.Router();

router.get("/", protectRoute, playView);

module.exports = router;