const request = require('supertest')
const server = require('../src')

const BASE_URL = '/machines'

const pricingModels = require('../prices.json')

const { sequelize: db } = require('../src/db')

const { Price } = require('../src/models/price')
const { Machine } = require('../src/models/machine')
const { PriceConfiguration } = require('../src/models/priceConfiguration')



let VALID_MACHINE_ID
let VALID_MACHINE_ID_WITHOUT_PRICING
let VALID_PRICE_ID
let VALID_PRICE_CONFIG_ID

beforeAll(async () => {
    const pricing = await Price.create({
        name: 'Test'
    })
    const priceConf = await PriceConfiguration.create({
        name: 'Test',
        value: 1,
        cost: 1,
        price_id: pricing.id
    })
    const machineWithPricing = await Machine.create({
        name: 'Test Machine',
        price_id: pricing.id
    })
    const machineWithoutPricing = await Machine.create({
        name: 'Test Machine without pricing'
    })
    VALID_PRICE_ID = pricing.id
    VALID_PRICE_CONFIG_ID = priceConf.id
    VALID_MACHINE_ID = machineWithPricing.id
    VALID_MACHINE_ID_WITHOUT_PRICING = machineWithoutPricing.id
    console.log('Jest starting!')
})

// close the server after each test
afterAll(async () => {
    await Machine.destroy({ where: { id: VALID_MACHINE_ID } })
    await Machine.destroy({ where: { id: VALID_MACHINE_ID_WITHOUT_PRICING } })
    await PriceConfiguration.destroy({
        where: { id: VALID_PRICE_CONFIG_ID }
    })
    await Price.destroy({ where: { id: VALID_PRICE_ID } })
    await db.close()
    server.close()
    console.log('server closed!')
})

describe('get endpoints of machines', () => {
    test('get machine pricing model and pricing configuration', async () => {
        const response = await request(server).get(
            `${BASE_URL}/${VALID_MACHINE_ID}/prices`
        )
        expect(response.status).toEqual(200)
        expect(response.body.name).toBeTruthy()
        expect(response.body.pricing).toBeTruthy()
    })
    test('get machine pricing model without it configured that returns default pricing model', async () => {
        const response = await request(server).get(
            `${BASE_URL}/${VALID_MACHINE_ID_WITHOUT_PRICING}/prices`
        )
        expect(response.status).toEqual(200)
        expect(response.body).toEqual(pricingModels.default_pricing)
    })
})

describe('put endpoints of machines', () => {
    test('put machine with invalid machineId should return not found', async () => {
        const invalidId = -1
        const response = await request(server).put(
            `${BASE_URL}/${invalidId}/prices/${VALID_PRICE_ID}`
        )
        expect(response.status).toEqual(404)
    })
    test('put machine with invalid pricingModelId should return not found', async () => {
        const invalidId = -1
        const response = await request(server).put(
            `${BASE_URL}/${VALID_MACHINE_ID}/prices/${invalidId}`
        )
        expect(response.status).toEqual(404)
    })
})

describe('delete endpoints of machines', () => {
    test('delete pricing model from machine', async () => {
        const response = await request(server).delete(
            `${BASE_URL}/${VALID_MACHINE_ID}/prices/${VALID_PRICE_ID}`
        )
        expect(response.body.price_id).toBeFalsy()
    })
})