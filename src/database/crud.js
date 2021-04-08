// -------------------------------------------------------------------------------
// Node modules
// -------------------------------------------------------------------------------

const Sequelize = require('sequelize')
const {Users} = require('../models/users.model')
require('dotenv').config()


// -------------------------------------------------------------------------------
// Server configuration
// -------------------------------------------------------------------------------

const sqlUri = 'mariadb://root:root@localhost:3306/fyf'
const conn = new Sequelize(sqlUri)


// -------------------------------------------------------------------------------
// Logic
// -------------------------------------------------------------------------------

const connectDatabase = async () => {
    
    // const conn = await new Sequelize('mariadb://root:root@localhost:3306/fyf')
    // conn
    //     .authenticate()
    //     .then(() => console.log("connected!"))

    // console.log(Users)
    // const query = Users.findAll()
    // console.log(query)
    
}


// -------------------------------------------------------------------------------
// Export modules
// -------------------------------------------------------------------------------

module.exports = {connectDatabase, conn}