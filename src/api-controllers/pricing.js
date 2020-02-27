import { Price } from '../models/price'
import { PriceConfiguration } from '../models/priceConfiguration'

const default_pricing = require('../../prices.json').default_pricing

const handleGetPricing = async ctx => {
    try {
        let pms = await Price.findAll({
            include: [{ model: PriceConfiguration, as: 'pricing' }]
        })
        if (pms) {
            pms.push(default_pricing)
            ctx.status = 200
            ctx.body = pms
        }
        else {
            ctx.body = {}
        }
    }
    catch (err) {
        ctx.throw(404, { error: err.message })
    }
}

const handleCreatepricing = async ctx => {
    const pm = ctx.request.body
    try {
        const newPm = await Price.create(
            {
                name: pm.name,
                pricing: pm.pricing
            },
            { include: [{ model: PriceConfiguration, as: 'pricing' }] }
        )
        ctx.status = 201
        ctx.body = { id: newPm.id }
    }
    catch (err) {
        ctx.throw({ error: err.message })
    }
}

const handleGetIndividualPricing = async ctx => {
    const pmId = ctx.params.pmId
    try {
        const pm = await Price.findByPk(pmId, {
            include: [{ model: PriceConfiguration, as: 'pricing' }]
        })
        if (pm) {
            ctx.body = pm
        }
        else {
            ctx.throw(404, 'Pricing model does not found!')
        }
    }
    catch (err) {
        ctx.throw(404, { error: err.message })
    }
}

const handleGetPricesforSpecificPricing = async ctx => {
    const pmId = ctx.params.pmId
    try {
        const pmConfigurations = await PriceConfiguration.findAll({
            where: { price_id: pmId }
        })
        if (pmConfigurations) {
            ctx.body = pmConfigurations
        }
        else {
            ctx.throw(404, 'Pricing model does not found!')
        }
    }
    catch (err) {
        ctx.throw(404, { error: err.message })
    }
}

const handleAddNewPriceConfiguration = async ctx => {
    const pmId = ctx.params.pmId
    const pmConfigurations = ctx.request.body

    try {
        const pm = await Price.findByPk(pmId)
        if (pm) {
            await PriceConfiguration.create({
                price_id: pmId,
                name: pmConfigurations.name,
                price: pmConfigurations.price,
                value: pmConfigurations.value
            })
            ctx.status = 201
        }
        else {
            ctx.throw(404, 'Pricing model does not found!')
        }
    }
    catch (err) {
        console.log(err);
        ctx.throw(404, { error: err.message })
    }
}

const handleDeletePriceConfiguration = async ctx => {
    const pmId = ctx.params.pmId
    const priceId = ctx.params.priceId
    try {
        const pm = await Price.findByPk(pmId)
        if (pm) {
            const pmconfig = await PriceConfiguration.findByPk(priceId)
            if (pmconfig) {
                await pmconfig.destroy()
                ctx.status = 204
            }
            else {
                ctx.throw(404, 'Pricing model Configuration does not found!')
            }
        }
        else {
            ctx.throw(404, 'Pricing model does not found!')
        }
    }
    catch (err) {
        ctx.throw(404, { error: err.message })
    }
}

const handleUpdatePricing = async ctx => {
    const pmId = ctx.params.pmId
    try {
        const originalPm = await Price.findByPk(pmId, {
            include: [{ model: PriceConfiguration, as: 'pricing' }]
        })

        if (originalPm) {
            const pm = ctx.request.body
            await originalPm.update({
                name: pm.name
            })
            ctx.body = originalPm
        } else {
            ctx.throw(404, 'Pricing model does not exist!')
        }
    } catch (e) {
        ctx.throw(404, { message: e.message })
    }
}


module.exports = {
    handleGetPricing,
    handleCreatepricing,
    handleGetIndividualPricing,
    handleGetPricesforSpecificPricing,
    handleAddNewPriceConfiguration,
    handleDeletePriceConfiguration,
    handleUpdatePricing
}