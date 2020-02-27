import Router from 'koa-router'

import {
    handleGetMachinePricingModel,
    handleUpdateMachinePricingModel,
    handleDeleteMachinePricingModel
} from '../api-controllers/machines'

const router = new Router()


router.put('/machines/:machineId/prices/:pmId',handleUpdateMachinePricingModel)
router.delete('/machines/:machineId/prices/:pmId', handleDeleteMachinePricingModel)
router.get('/machines/:machineId/prices',  handleGetMachinePricingModel)

module.exports = router