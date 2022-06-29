const express = require("express");
const { protectRoute } = require("../auth/protect");
const { roomView,createRoom } = require("../controllers/roomController");

const router = express.Router();

router.get("/", protectRoute, roomView);
router.post("/create", protectRoute, createRoom);

module.exports = router;