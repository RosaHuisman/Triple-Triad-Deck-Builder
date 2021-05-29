const dataMapper = require("../dataMapper");

const searchController = {
  searchPage: (req, res) => {
    res.render('search');
  },

  searchCardByElement: (req, res) => {
    const elementSearched = req.query.element;
    dataMapper.searchCardWithElement(elementSearched, (error, cards) => {
      if (error) {
        res.status(500).send(error);
      } else {
        const title = 'Liste des cartes ' + (elementSearched === 'null' ? ' sans élément' : `d'élement ${elementSearched}`);
        res.render('cardList', {
          cards,
          title
        })
      }
    })
  },

  searchCardByLevel: (req, res) => {
    const elementSearched = req.query.level;
    dataMapper.searchCardWithLevel(elementSearched, (error, cards) => {
      if (error) {
        res.status(500).send(error);
      } else {
        const title = 'Liste des cartes de niveau : ' + elementSearched;
        res.render('cardList', {
          cards,
          title
        })
      }
    })
  },

  searchCardByValue: (req, res) => {
    const directionSearched = req.query.direction;
    const valueSearched = Number(req.query.value)
    //const valueSearched = req.query.values.value;
    dataMapper.searchCardWithValue(directionSearched, valueSearched, (error, cards) => {
      if (error) {
        res.status(500).send(error);
      } else {

        res.render('cardList', {
          cards,
          title: `Liste des cartes de direction ${directionSearched} et avec au moins une valeur de ${valueSearched}`
        });
      }
    })
  },

  searchCardByName: (req, res) => {
    const nameSearched = req.query.name;
    dataMapper.searchWithName(nameSearched, (error, cards) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.render('cardList', {
          cards,
          title: `Liste des cartes qui comprennent ${nameSearched}`
        });
      }
    })
  }

};

module.exports = searchController;