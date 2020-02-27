import Router from 'koa-router'

import {
    handleGetPricing,
    handleCreatepricing,
    handleGetIndividualPricing,
    handleUpdatePricing,
    handleGetPricesforSpecificPricing,
    handleAddNewPriceConfiguration,
    handleDeletePriceConfiguration
} from '../api-controllers/pricing.js'

const router = new Router()

router.get('/pricing-models', handleGetPricing)
router.post('/pricing-models', handleCreatepricing)
router.get('/pricing-models/:pmId', handleGetIndividualPricing)
router.put('/pricing-models/:pmId', handleUpdatePricing)
router.get('/pricing-models/:pmId/prices', handleGetPricesforSpecificPricing)
router.post('/pricing-models/:pmId/prices', handleAddNewPriceConfiguration)
router.delete('/pricing-models/:pmId/prices/:priceId', handleDeletePriceConfiguration)

module.exports = router










