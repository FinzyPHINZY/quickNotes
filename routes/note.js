const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const noteController = require("../controllers/noteController");
const Note = require("../models/Note");

// @desc         Show all notes
// @route        GET /notes
router.get("/", ensureAuth, noteController.showNotes);

// @desc         Show add page
// @route        GET /notes/add
router.get("/add", ensureAuth, noteController.showAdd);

// @desc         Process add form
// @route        POST /notes/
router.post("/", ensureAuth, noteController.addNote);

// @desc         Show single note
// @route        GET /notes/:id
router.get("/:id", ensureAuth, noteController.showSingleNote);

// @desc         Show edit page
// @route        GET /notes/edit/:id
router.get("/edit/:id", ensureAuth, noteController.showEdit);

// @desc    Update note
// @route   PUT /notes/:id
router.put("/:id", ensureAuth, noteController.updateNote);

// @desc        Delete Note
// @route        Delete /notes/:id
router.delete("/delete/:id", ensureAuth, noteController.deleteNote);

module.exports = router;
