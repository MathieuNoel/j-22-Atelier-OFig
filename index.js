// Toujours commencer par importer les variables d'environnement !
require('dotenv').config();

const express = require('express');

// on importe le router
const router = require('./app/router');

// un peu de config
const PORT = process.env.PORT || 5000;

const app = express();





app.set("view engine", "ejs");

app.set("views", "./app/views");

// servir les fichiers statiques qui sont dans "integration"
app.use(express.static('integration'));

const session = require('express-session');

app.use(
  session({
  resave: true,
  saveUninitialized: true,
  secret: "Guess it!",
  cookie: {
    secure: false,
    maxAge: (1000*60*60) // ça fait une heure
  }
}));

app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  console.log("Session: ", req.session);  
  next()
});

// routage !
app.use(router);

app.use((req, res)=>{
  res.status(404).render('404');
});
// on lance le serveur
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
