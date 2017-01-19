var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
 var forwardedIpsStr = req.header('x-forwarded-for');

//web3.net.peerCount //verify that the node is connnected to at least 1 peer, if not: panic
//web3.eth.syncing // if result = "false" we are good to go; if not: you can still make the calls but the blockchain won't be up to date

  res.render('home.ejs',  {title: "None"});
});
/*
app.get('/etage/:etagenum/chambre', function(req, res) {
    res.render('chambre.ejs', {etage: req.params.etagenum});
});
*/
module.exports = router;
