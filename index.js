const dotenv = require('dotenv');
const express = require('express');
dotenv.config();

const session = require('express-session');

const PORT = process.env.PORT || 1234;
const router = require('./app/router');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(express.static('public'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use((request, response, next) => {
  //Si la liste n'existe pas, il faut la créer ! (req.session.bookmarks = [])
  if (request.session.deck === undefined) {
    //le tableau de favoris n'a pas encore été créé pour ce user, on l'ajoute à sa session
    request.session.deck = [];
  }
  //on rend dispo pour toutes les vues le tableau de favoris en l'ajoutant à l'object response.locals
  //toutes nos vues disposeront d'une variable bookmarks contenant le tableau des favoris
  response.locals.deck = request.session.deck;

  next();
});


app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
