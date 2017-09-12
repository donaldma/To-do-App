exports.up = function (knex, Promise) {
  
    return Promise.all([
  
      knex.schema.createTable('users', function (table) {
        table.increments('id').primary();
        table.string('name');
        table.timestamps(true, true);
      }),
  
      knex.schema.createTable('lists', function (table) {
        table.increments('id').primary();
        table.string('name');
        table.integer('user_id')
          .references('id')
          .inTable('users');
        table.timestamps(true, true);        
      }),
  
      knex.schema.createTable('tasks', function (table) {
        table.increments('id').primary();
        table.integer('list_id')
        .references('id')
        .inTable('lists');
        table.string('name');
        table.boolean('completed');
        table.timestamps(true, true);                
      })
    ])
  };
  
  exports.down = function (knex, Promise) {
    return Promise.all([
      knex.schema.dropTable('users'),
      knex.schema.dropTable('lists'),
      knex.schema.dropTable('taks')
    ])
  };