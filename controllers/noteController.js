const Note = require("../models/Note");
const { formatDate, truncate, stripTags } = require("../helpers/helper.js");

module.exports = {
  showNotes: async (req, res) => {
    try {
      const notes = await Note.find({ user: req.user.id })
        .populate("user")
        .sort({ createdAt: "desc" });
      res.render("notes/index", {
        notes,
        formatDate,
        truncate,
        stripTags,
      });
    } catch (err) {
      console.log(err);
      res.render("error/500");
    }
  },

  showAdd: (req, res) => {
    res.render("notes/add");
  },

  addNote: async (req, res) => {
    try {
      req.body.user = req.user.id;
      await Note.create(req.body);
      res.redirect("notes");
    } catch (err) {
      console.error(err);
      res.render("error/500");
    }
  },

  showSingleNote: async (req, res) => {
    try {
      console.log(req.params);
      let note = await Note.findById(req.params.id).populate("user");
      console.log(note);

      if (!note) {
        return res.render("error/404");
      }
      res.render("notes/show", { note, formatDate });
    } catch (err) {
      console.error(err);
      return res.render("error/404");
    }
  },

  showEdit: async (req, res) => {
    console.log(req.body);
    console.log(req.params);
    try {
      const note = await Note.findOne({
        _id: req.params.id,
      });
      if (!note) {
        return res.render("error/404");
      }

      if (note.user != req.user.id) {
        res.redirect("/notes");
      } else {
        res.render("notes/edit", {
          story,
        });
      }
    } catch (err) {
      console.error(err);
      return res.render("error/500");
    }
  },

  updateNote: async (req, res) => {
    try {
      let note = await Note.findById(req.params.id);

      if (!note) {
        return res.render("error/404");
      }

      if (note.user != req.user.id) {
        res.redirect("/notes");
      } else {
        note = await Note.findOneAndUpdate(
          {
            _id: req.params.id,
          },
          req.body,
          { new: true, runValidators: true }
        );

        res.redirect("/index");
      }
    } catch (err) {
      console.error(err);
      return res.render("error/500");
    }
  },

  deleteNote: async (req, res) => {
    try {
      let story = await Story.findById({ _id: req.params.id });
      if (!story) {
        res.render("error/404");
      }

      if (story.user != req.user.id) {
        res.redirect("/stories");
      } else {
        await Story.deleteOne({ _id: req.params.id });
        res.redirect("/index");
      }
    } catch (err) {
      console.error(err);
      return res.render(404);
    }
  },
};
