// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "mercury-hackathon",
      user: "postgres",
      password: "postgres",
      host: "localhost"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./src/migrations"
    },
    seeds: {
      directory: "./src/seeds"
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
