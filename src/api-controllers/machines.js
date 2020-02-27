import { Machine } from '../models/machine'
import { Price } from '../models/price'
import { PriceConfiguration } from '../models/priceConfiguration'

const pricingModels = require('../../prices.json')

const handleUpdateMachinePricingModel = async ctx => {
    const machineId = ctx.params.machineId
    try {
        const machine = await Price.findByPk(machineId)
        if (machine) {
            const pmId = ctx.params.pmId
            const pm = await Price.findByPk(pmId)
            if(pm){
                await machine.update({price_id: pmId})
                ctx.body = machine
            }
            else {
                ctx.throw(404, 'Princing Model does not exist!')
            }
        }
        else {
            ctx.throw(404, 'MAchine does not exist!')
        }
    } 
    catch (err) {
        ctx.throw(404, JSON.stringify({error: err.message}))
    }
 }
const handleGetMachinePricingModel = async ctx => {
    const machineId = ctx.params.machineId
    try {
      const machine = await Machine.findByPk(machineId)
      if (machine) {
        const pricingModelIdOfMachine = machine.price_id
        const pricingModel = await Price.findByPk(pricingModelIdOfMachine, {
          include: [{ model: PriceConfiguration, as: 'pricing' }]
        })
        if (pricingModel) {
          ctx.body = pricingModel
        } else {
          ctx.body = pricingModels.default_pricing
        }
      } else {
        ctx.throw(404, 'Machine not found.')
      }
    } catch (e) {
      ctx.throw(404, JSON.stringify({ success: false, message: e.message }))
    }
  }

const handleDeleteMachinePricingModel = async ctx => {
    const machineId = ctx.params.machineId
    try {
        const machine = await Machine.findByPk(machineId)
        if(machine) {
            await machine.update({ price_id: null })
            ctx.body = machine
        }
        else {
            ctx.throw(404, 'Machine does not exist!')
        }
    } catch (err) {
        ctx.throw(404, JSON.stringify({ error: err.message }))
    }
}


module.exports = {
    handleGetMachinePricingModel,
    handleUpdateMachinePricingModel,
    handleDeleteMachinePricingModel
}