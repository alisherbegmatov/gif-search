require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const fetch = require('node-fetch');
const app = express();

app.use(express.static('public'));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");    

app.get('/', 
  (req, res) => {
    let term = "Raccoon";
    if (req.query.term) {
      term = req.query.term
    }
    fetch(`https://g.tenor.com/v1/search?q=${term}&key=${process.env.API_KEY}&limit=12`)
    .then(response => response.json())
    .then(
      (data) => {
        const gifs = data.results;
        res.render('home', { gifs });
      }
    );
  }
);

app.get('/hello/:name', 
  (req, res) => {
    const name = req.params.name;
    res.send(`Hello, ${name}!`);
  }
);

app.listen(3000, 
    () => {
      console.log(`Gif Search listening on http://localhost:3000/`);
    }
  );
