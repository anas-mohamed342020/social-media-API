const router = require('express').Router();
const { auth } = require('../../middlewear/auth');
const { handelValidation } = require('../../middlewear/handleValidation');
const { search } = require('../../servises/search');
const { endpoint } = require('./endPoints');
const { block } = require('./reportController/blockPost');
const { allreports } = require('./reportController/getAllReports');
const { report } = require('./reportController/report');
const { searchreport } = require('./reportController/searchreport');
const { createReport, blockVal ,nodata} = require('./validation');




router.post('/report/create',auth(endpoint.create),handelValidation(createReport),report)
router.post('/post/block',auth(endpoint.block),handelValidation(blockVal),block)
router.get('/report/getreports',auth(endpoint.block),handelValidation(nodata),allreports)
router.get('/report/search/:searchKey',auth(endpoint.all),handelValidation(search),searchreport)

module.exports = router