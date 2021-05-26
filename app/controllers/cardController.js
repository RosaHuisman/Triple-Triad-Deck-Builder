const dataMapper = require('../dataMapper.js');

const cardController = {

    getOneCard: (request, response) => {
        const cardId = Number(request.params.id);
        dataMapper.getCard(cardId, (error, card) => {
            if (error) {
                console.error(error);
            } else {
                response.render('card', {card});
            }
        })
    },
}
module.exports = cardController;