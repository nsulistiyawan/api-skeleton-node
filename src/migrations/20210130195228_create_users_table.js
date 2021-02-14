export const up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.bigIncrements('id');
    table.string('email', 100);
    table.string('password', 64);
    table.boolean('is_active').defaultTo(1);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated').defaultTo(knex.fn.now());
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('users');
};
