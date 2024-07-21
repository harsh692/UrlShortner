const express = require("express");

const router = express.Router();
const {handleGenerateNewShortUrl,handleRedirecting,handleGetAnalytics} = require("../controllers/url");

router.post('/',handleGenerateNewShortUrl);

router.get('/:shortId',handleRedirecting);

router.get('/analytics/:shortId',handleGetAnalytics);
module.exports = router; 