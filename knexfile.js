module.exports = {

    development: {
      client: 'postgresql',
      connection: {
        host: 'localhost',
        database: 'todolist',
        user:     'postgres',
        password: 'master'
      },
      migrations: {
        directory: './src/database/migrations'
      },
      useNullAsDefault: true,
    },
  
    // development: {
    //   client: 'postgresql',
    //   connection: {
    //     host: '',
    //     database: '',
    //     user:     '',
    //     password: '',
    //     ssl: {
    //       rejectUnauthorized: false
    //     },
    //   },
    //   migrations: {
    //     directory: './src/database/migrations'
    //   },
    //   useNullAsDefault: true,
    // },
    
  };
  