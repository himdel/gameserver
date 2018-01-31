const db = require('./db');
const http = require('./http');

http.app.get('/games', function(req, res) {
  db.games()
    .then((games) => {
      res.json(games);
    });
});

// db.games()
// db.actions(game)

// db.add_game('name')
// db.add_action(game, data)
