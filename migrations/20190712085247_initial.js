
exports.up = async function(knex) {
  await knex.schema.createTable('users', tbl => {
      tbl.increments('id')
      tbl.string('name', 255).notNullable()
      tbl.string('username', 255).notNullable().unique()
      tbl.string('password', 255).notNullable()
      tbl.timestamps(true, true)
  })

  await knex.schema.createTable('tests', tbl => {
      tbl.increments('id')
      tbl.integer('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
      tbl.integer('pullups').notNullable()
      tbl.integer('situps').notNullable()
      tbl.integer('pushups').notNullable()
      tbl.decimal('run', 4, 2)
      tbl.boolean('underwater_one').notNullable()
      tbl.boolean('underwater_two').notNullable()
      tbl.decimal('swim', 4, 2)
      tbl.timestamps(true, true)
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('tests')
  await knex.schema.dropTableIfExists('users')
};
