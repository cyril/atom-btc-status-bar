'use strict';

const https = require('https');

var price;

price = function(cb) {
  var get;
  get = function(r) {
    var bd;
    bd = '';
    r.on('data', function(d) {
      bd += d;
    }).on('end', function() {
      var b;
      b = JSON.parse(bd);
      cb(b[0]['price_usd']);
    });
  };

  return https.get({
    host: 'api.coinmarketcap.com',
    path: '/v1/ticker/bitcoin/?convert=USD'
  }, get);
};

module.exports = price;
