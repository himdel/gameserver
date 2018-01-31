## gameserver

a simple insecure game server for a redux app

It..

* serves `index.html` on `/`,
* serves `node_modules`,
* provides a `/games` json endpoint,
* listens on a [https://socket.io/](socket.io) websocket, supporting the following events:
  * `login` - `{user: "name", game_id: (id from /games)}`
    * authenticates the user
    * sends a list of previous actions in the games
    * creates a new action of type `login`
  * `action` - `{...}`
    * saves the action in the db
    * broadcasts it to all connected clients


For database, postgres is supported, migrations are done using `yarn run db-migrate`.  
(But first, create `database.json` from `database.sample.json`, and make sure the database exists and the user can access it.)


TODO:
  create game endpoint  
  the ui bits
