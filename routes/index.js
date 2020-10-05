
var router = require('express').Router();


router.use('/news', require('./news'));

//app.use('/api/v1', router);

module.exports = router;