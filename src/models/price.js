import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../db'

import { PriceConfiguration } from './priceConfiguration'

class Price extends Model {}

Price.init(
    {
        name: DataTypes.STRING
    },
    { sequelize, modelName: 'price'}    
)

Price.hasMany(PriceConfiguration, {
    foreignKey: 'price_id',
    sourceKey: 'id',
    as: 'pricing',
    onDelete: 'CASCADE'
})

exports.Price = Price