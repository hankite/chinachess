const express = require("express");
const { protectRoute } = require("../auth/protect");
const { homepage, message } = require("../controllers/chatController");

const router = express.Router();

router.get('/', homepage)
router.get('/api/message', message)

module.exports = router;




