const db = require('./db');

db.games()
  .then(console.log);

// db.games()
// db.actions(game)

// db.add_game('name')
// db.add_action(game, data)
