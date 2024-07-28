const express = require('express');
const router = express.Router();
const verifyDocumentController = require('../controller/verifyDocumentsController');

router.get('/', verifyDocumentController.getRelationsVerifyData);
router.put('/:id', verifyDocumentController.updateVerifyDocument);
// router.delete('/:id', verifyDataController.deleteVerifyData);

module.exports = router;