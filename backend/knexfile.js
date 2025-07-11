// Update with your config settings. (this file is created using command knex init)

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    client: 'postgresql',
        connection: {
        database: 'knowledge',
        user:     'postgres',
        password: '199713'
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
};
