require(`dotenv`).config();
const { Sequelize } = require(`sequelize`);

const database = process.env.DATABASE;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = parseInt(process.env.DB_PORT);

var sequelize = null;

function createConnection()
{
    sequelize = new Sequelize(database, dbUser, dbPassword, {

        host : dbHost,
        port : dbPort,
        dialect : `mysql`
    });    
}

function getConnection()
{
    if( sequelize === null ) 
    {
        createConnection();
    }

    return sequelize;
}

exports.getConnection = getConnection;