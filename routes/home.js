const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Note = require("../models/Note");

// router.get("/", homeController.getIndex);

// const Story = require('../models/Story')

// @desc    Login/Landing page
// @route   GET /
router.get("/", ensureGuest, homeController.getLogin);

// @desc    Homepage
// @route   GET /index
router.get("/index", ensureAuth, homeController.getHome);

module.exports = router;
