const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const searchController = require('./controllers/searchController');
const cardController = require('./controllers/cardController');
const deckController = require('./controllers/deckController');


router.get('/', mainController.homePage);
router.get('/search', searchController.searchPage);
router.get('/search/element/', searchController.searchCardByElement);
router.get('/search/level/', searchController.searchCardByLevel);
router.get('/search/values/', searchController.searchCardByValue);
router.get('/search/name/', searchController.searchCardByName);



router.get('/card/:id', cardController.getOneCard);

router.get('/deck', deckController.deck);
router.get('/deck/add/:id', deckController.addDeck);
router.get('/deck/delete/:id', deckController.deleteDeck);





module.exports = router;