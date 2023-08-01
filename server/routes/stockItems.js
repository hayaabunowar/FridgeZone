const express = require('express')

const {
    getStockItems,
    getStockItem,
    createStockItem,
    deleteStockItem,
    updateStockItem,
    viewStockItems,
} = require('../controllers/stockItemController.js')
const requireAuth = require('../middleware/requireAuth.js')


const router = express.Router()
router.use(requireAuth)

// GET all stockItems
router.get('/',getStockItems)

// Get 1 stock item
router.get('/',getStockItem)

//POST stockItem
router.post('/',createStockItem)

//POST view stock items from specific store
router.post('/view',viewStockItems)


//DELETE stockItem 
router.delete('/delete', deleteStockItem)

//UPDATE stockItem
router.patch('/removequantity',updateStockItem)

module.exports = router