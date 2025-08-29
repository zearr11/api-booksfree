import Sequelize from 'sequelize'
import { DB_HOST, MYSQL_DATABASE, MYSQL_DIALECT, MYSQL_PASSWORD, MYSQL_USER } from '../config/env.config.js'

const DATABASE = MYSQL_DATABASE
const DB_USER = MYSQL_USER
const DB_PASSWORD = MYSQL_PASSWORD

const HOST = DB_HOST
const DB_DIALECT = MYSQL_DIALECT

export const sequelize = new Sequelize(
  DATABASE, DB_USER, DB_PASSWORD, {
    host: HOST,
    dialect: DB_DIALECT,
    logging: false
  }
)
