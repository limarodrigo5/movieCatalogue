exports.up = function(knex) {
    return knex.schema.createTable('links', function(table) {
      table.increments('id').primary();
      table.integer('note_id').unsigned().notNullable().references('id').inTable('movie_notes').onDelete('CASCADE');
      table.string('url').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('links');
  };