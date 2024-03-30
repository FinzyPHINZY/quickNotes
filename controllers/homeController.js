const Note = require("../models/Note");

module.exports = {
  getLogin: (req, res) => {
    res.render("login");
  },

  getHome: async (req, res) => {
    try {
      const notes = await Note.find({ user: req.user.id });
      res.render("index", {
        name: req.user.firstName,
        notes,
      });
    } catch (err) {
      console.error("homepage error", err);
      res.render("error/500");
    }
  },
};
