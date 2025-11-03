import express from 'express';
const pokemon = (await import('pokemon')).default;
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));


// root route
app.get('/', (req, res) => {
   res.render('home.ejs')
});

// make 4 individual routes for the express app , need node package, another for api, must receive user imput

// route one animal name 
app.get('/pokemon', (req, res) => {
   const allPokemon = pokemon.all();
   res.render('pokemon.ejs', { 
      pokemonList: allPokemon
   });
});

app.listen(3000, () => {
   console.log('server started');
});