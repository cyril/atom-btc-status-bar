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
      try {
        var b;
        b = JSON.parse(bd);
        cb(b['USD']);
      } catch (e) {
        console.log('Error parsing JSON!');
      }
    });
  };

  return https.get({
    host: 'min-api.cryptocompare.com',
    path: '/data/price?fsym=BTC&tsyms=USD'
  }, get);
};

module.exports = price;
