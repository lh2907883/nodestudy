var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  res.render('jade' + req.params.id, req.query);
});


router.use('/users', require('./users'));

module.exports = router;
