const path = require('path');

const dataMapper = require('../dataMapper');

const bookmarksController = {

  // méthode pour afficher les favoris
  bookmarksPage: (req, res) => {
    res.render('favoris', {
      arrayOfFig: req.session.bookmarks
    })
  },

  addBookmark: async (req, res) => {
    const id = +req.params.id;
    if (!req.session.bookmarks) {
      req.session.bookmarks = [];
    }
    const foundFig = req.session.bookmarks.find(f => f.id === id);
    if (!foundFig) {
      try {
        const figurineToAdd = await dataMapper.getOneFigurine(id);
        req.session.bookmarks.push(figurineToAdd)
        res.redirect('/bookmarks')
      } catch (error) {
        res.status(500).send(error);
      }
    } else {
      res.redirect('/bookmarks')
    }
  },

  deleteBookmark: (req, res) => {
    const id = +req.params.id;
    const foundFig = req.session.bookmarks.filter(f => f.id === id);
    const figurineNb = req.session.bookmarks.indexOf(foundFig[0]);
      req.session.bookmarks.splice(figurineNb, 1);
      res.redirect('/bookmarks');
  }
};
module.exports = bookmarksController;