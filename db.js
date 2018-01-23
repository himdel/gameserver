const { Pool, Client } = require('pg');
const db = require('./database.json')['dev'];

const pool = new Pool({
  user: db.user,
  host: db.host,
  database: db.database,
  password: db.password,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
})

process.on('exit', () => pool.end());


function _game_id(game) {
  return Object.prototype.toString.call(game) === '[object Object]' ? game.id : game;
}

module.exports.games = function games() {
  return pool.query('SELECT * FROM games')
    .then(res => res.rows)
    .catch(e => console.error(e.stack));
}

module.exports.actions = function actions(game) {
  let game_id = _game_id(game);

  const query = {
    text: game ? 'SELECT * FROM actions WHERE game_id = $1' : 'SELECT * FROM actions',
    values: game ? [ game_id ] : [],
  };

  return pool.query(query)
    .then(res => res.rows)
    .catch(e => console.error(e.stack));
}

module.exports.add_game = function add_game(name) {
  return pool.query('INSERT INTO games (name) VALUES ($1) RETURNING *', [name])
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack));
}

module.exports.add_action = function add_action(game, data) {
  let game_id = _game_id(game);

  return pool.query('INSERT INTO actions (game_id, data) VALUES ($1, $2) RETURNING *', [game_id, data])
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack));
}
