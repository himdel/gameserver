const socket_io = require('socket.io')

// server - http.Server instance, or port
module.exports = function({server, action: db_action, actions: db_actions}) {
  const io = socket_io(server || 80);
  const action = (data) => {
    console.log('action', data);
    db_action(data)
      .then((action) => io.emit('action', action));
  }

  io.on('connection', function(socket) {
    const login = {
      user: null,
      game_id: null,
    }
    console.log('a user connected');

    socket.on('disconnect', function() {
      console.log('user disconnected', login);
    });

    socket.on('login', function(msg) {
      console.log('login', msg);

      login.user = msg.user;
      login.game_id = msg.game_id;

      db_actions(login.game_id)
        .then((actions) => {
          actions.forEach((action) => socket.emit('action', action));
        })
        .then(() => {
          action(Object.assign({
            type: 'login',
          }, login));
        });
    });

    socket.on('action', function(msg) {
      if (!login) {
        console.warn('unauthorized action', msg);
        return;
      }

      action(Object.assign({}, msg, login));
    });
  });

  return io;
};
