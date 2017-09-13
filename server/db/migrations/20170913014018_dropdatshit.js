exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('tasks', function (table) {
      table.dropColumn('list_id');
    }),
    knex.schema.dropTable('lists'),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('lists', function (table) {
      table.increments('id').primary();
      table.string('name');
      table.integer('user_id')
        .references('id')
        .inTable('users');
      table.timestamps(true, true);        
    }),
    knex.schema.table('tasks', function (table) {
      table.integer('list_id')
      .references('id')
      .inTable('lists');
    }),
  ]);
};