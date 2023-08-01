const express = require('express')

const {
    getHealthReports,
    createHealthReport
} = require('../controllers/healthReportController.js')

const requireAuth = require('../middleware/requireAuth.js')

const router = express.Router()
router.use(requireAuth)


//POST createReport
router.post('/create',createHealthReport)

//POST get reports for store
router.post('/get',getHealthReports)

module.exports = router







