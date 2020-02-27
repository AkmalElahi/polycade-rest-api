import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

import { sequelize } from './db'
import { Machine } from './models/machine'
import { Price } from './models/price'
import { PriceConfiguration } from './models/priceConfiguration'

import machine from './apis/machine'
import price from './apis/price'


const app = new Koa()
const PORT = process.env.PORT || 1337

app.use(bodyParser())


sequelize.authenticate()
  .then(() => {
    console.log('connection established')
  })
  .catch(error => {
    console.log('error in connecting to database:', error)
  })


app.use(machine.routes())
app.use(price.routes())


const server = app.listen(PORT, async () => {
  console.log(`Server listning on port ${PORT}`)
  try {
    await Price.sync()
    await PriceConfiguration.sync()
    await Machine.sync()
  } catch (err) {
    console.log(`error in sequelize : ${err.message}`)
  }
})

module.exports = server