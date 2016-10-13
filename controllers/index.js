'use strict';

var express = require('express'),
    path = require('path'),
    router  = express.Router();


//Render index page for home page
// router.get('/',function(req,res) {
//   res.sendFile(path.join(__dirname + '/../views/index.html'));
// });
//

router.use('/', require('./home'));
router.use('/home', require('./home'));
router.use('/stats', require('./home'));
router.use('/admin', require('./home'));

router.use('/data', require('./data'));

router.use('/recommend', require('./recommend'));

router.use('/feed', require('./feed'));

module.exports = router;
