var btc;

btc = null;

module.exports = {
  config: {
    display: {
      type: 'string',
      'default': 'right',
      'enum': ['left', 'right']
    },
    refresh: {
      type: 'integer',
      'default': 60
    }
  },
  activate: function() {
  },
  deactivate: function() {
    if (btc != null) {
      btc.destroy();
    }

    return btc = null;
  },
  consumeStatusBar: function(statusBar) {
    var BtcStatusBarView;
    BtcStatusBarView = require('./btc-status-bar-view');
    btc = new BtcStatusBarView();
    btc.initialize(statusBar);
    return btc.attach();
  }
};
