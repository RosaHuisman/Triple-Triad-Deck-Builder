const { response } = require("express");
const dataMapper = require("../dataMapper");

const searchController = {
  searchPage: (req, res) => {
    res.render('search');
  },

  searchCardByElement: (req, res) => {
    const elementSearched = req.query.element;
    dataMapper.searchCardWithElement(elementSearched, (error, cards) => {
      if (error) {
        console.error(error)
      } else {
        response.redirect('search', {cards})
      }
    })
  },

};

module.exports = searchController;