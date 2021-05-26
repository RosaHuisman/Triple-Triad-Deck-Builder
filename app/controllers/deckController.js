const dataMapper = require('../dataMapper.js');

const deckController = {

    deck: (req, res) => {
        res.render('deck');
    },

    addDeck: (req, res) => {
        const idFromUrl = Number(req.params.id);

        const found = req.session.deck.find(card => card.id === idFromUrl);

        if (found !== undefined) {
            console.log('On a déjà ajouté la carte d\'id', idFromUrl);

            res.redirect('/deck');
        } else {
            dataMapper.getCard(idFromUrl, (error, card) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log('Ajout de la carte d\'id', idFromUrl);
                    // Puis ajouter la figurine à la liste (req.session.bookmarks.push(figurine))
                    req.session.deck.push(card);
                    // rediriger vers la route /bookmarks, grâce à la méthode res.redirect
                    res.redirect('/deck');
                }
            });
        }
    },

    deleteDeck: (req, res) => {
        const idFromUrl = Number(req.params.id);
        req.session.deck = req.session.deck.filter((card) => card.id !== idFromUrl);
        res.redirect('/deck');
      }


};

module.exports = deckController;