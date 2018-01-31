const db = require('./db');
const http = require('./http');
const io = require('./ws')({
  server: http.server,
  action: (data) => db.add_action(data.game_id, data),
  actions: db.actions,
})

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
