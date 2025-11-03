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

// route one all animals
app.get('/pokemon', (req, res) => {
   const allPokemon = pokemon.all();
   res.render('pokemon.ejs', { 
      pokemonList: allPokemon
   });
});

// route two random animal 
app.get('/pokeRand', (req, res) => {
   const randomPokemon = pokemon.random();
   const pokemonId = pokemon.getId(randomPokemon);
   
   res.render('pokeRand.ejs', { 
      name: randomPokemon,
      id: pokemonId
   });
});


// Search form route
app.get('/pokemon/search', (req, res) => {
   res.render('pokemon-search.ejs');
});




// Search result route
app.get('/pokemon/result', (req, res) => {
   const searchId = parseInt(req.query.id);
   const pokemonName = pokemon.getName(searchId);
   
   if (pokemonName) {
      res.render('pokemon-result.ejs', { 
         name: pokemonName,
         id: searchId,
         found: true
      });
   } else {
      res.render('pokemon-result.ejs', { 
         name: 'Not Found',
         id: searchId,
         found: false
      });
   }
});

app.listen(3000, () => {
   console.log('server started');
});