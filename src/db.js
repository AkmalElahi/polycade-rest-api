import Sequelize from 'sequelize'

import { config } from '../db-config'

const sequelize = new Sequelize(
    config.DB,
    config.USERNAME,
    config.PASSWORD,
    {
        host: config.HOSTNAME,
        dialect: 'postgres'
    }
)

exports.sequelize = sequelize