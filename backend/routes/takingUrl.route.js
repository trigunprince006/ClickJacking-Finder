const express = require('express')
const router = express.Router();
const urlController = require('../controller/url.controller')

router.post('/send-url',urlController)

module.exports = router;