const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const User = require("../models/User");

router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;