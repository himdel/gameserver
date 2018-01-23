'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('actions', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
    },
    game_id: {
      type: 'int',
      foreignKey: {
        name: 'actions_games_id_fk',
        table: 'games',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
    },
    created: {
      type: 'datetime',
      defaultValue: new String('now()'),
    },

    data: 'json',
  });
};

exports.down = function(db) {
  return db.dropTable('actions');
};

exports._meta = {
  "version": 1
};
