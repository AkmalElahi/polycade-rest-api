import { Model, DataTypes } from 'sequelize'
import {sequelize} from '../db'

import { Price } from './price'

class Machine extends Model {}

Machine.init(
    {
        name: DataTypes.STRING
    },
    { sequelize, modelName: 'machine' }
)
Machine.belongsTo(Price, {
    foreignKey: 'price_id'
})

exports.Machine = Machine