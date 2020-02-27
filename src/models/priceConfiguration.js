import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../db'

class PriceConfiguration extends Model {}

PriceConfiguration.init(
    {   
        price: DataTypes.DOUBLE,
        name: DataTypes.STRING,
        value: DataTypes.DOUBLE,
    },
    { sequelize, modelName: 'priceConfiguration' }
)

exports.PriceConfiguration = PriceConfiguration