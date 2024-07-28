const express = require('express');
const router = express.Router();
const verifyDataController = require('./../controller/verifyDataController');
const validateVerifyData = require('./../middleware/verifyDataMiddleware');

router.get('/', verifyDataController.getRelationsVerifyData);
router.post('/', validateVerifyData, verifyDataController.createVerifyData);
router.put('/:id', validateVerifyData, verifyDataController.updateVerifyData);
router.delete('/:id', verifyDataController.deleteVerifyData);

module.exports = router;