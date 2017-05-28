const express = require ('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello Homophoner!');
})

router.use('/word_sets', require('./word_sets'));

module.exports = router;
