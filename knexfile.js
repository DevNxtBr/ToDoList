module.exports = {

    // development: {
    //   client: 'postgresql',
    //   connection: {
    //     host: 'localhost',
    //     database: 'todolist',
    //     user:     'postgres',
    //     password: 'master'
    //   },
    //   migrations: {
    //     directory: './src/database/migrations'
    //   },
    //   useNullAsDefault: true,
    // },
  
    development: {
      client: 'postgresql',
      connection: {
        host: 'ec2-34-225-162-157.compute-1.amazonaws.com',
        database: 'd60l0sr010u0pp',
        user:     'wnhywxytoncohk',
        password: '8bca8414dd25e97050b49205d285251d673103990f8d0fec960f5a96ecc2173b',
        ssl: {
          rejectUnauthorized: false
        },
      },
      migrations: {
        directory: './src/database/migrations'
      },
      useNullAsDefault: true,
    },
    
  };
  