exports.up = function(knex) {
  return knex.schema
    .createTable('projects', tbl => {
      tbl.increments();
      tbl
        .text('name', 128)
        .unique()
        .notNullable();
      tbl.text('description').notNullable();
      tbl.boolean('completed').defaultTo(false);
    })
    .createTable('actions', tbl => {
      tbl.increments();
      tbl.text('notes').notNullable();
      tbl.text('description').notNullable();
      tbl.boolean('completed').defaultTo(false);
      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('projects').dropTableIfExists('actions');
};
