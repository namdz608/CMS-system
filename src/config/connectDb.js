const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('daaghceped0n3k', 'cbuadulsshhuxs', '2e2713be2ea9fb20cbb443f384c7b448a8cc5992bbd905469ea14745475226fa', {
  host: 'ec2-3-216-221-31.compute-1.amazonaws.com',
  dialect:'postgres',
  logging: false,
  dialectOptions:{
    ssl:{
      require:true,
      rejectUnauthorized:false
    }
  }
});

let connectDb= async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
module.exports = connectDb;