var BtcStatusBarView, CompositeDisposable, BtcPrice, subscriptions,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

BtcPrice = require('./btc-price');

CompositeDisposable = require('atom').CompositeDisposable;

subscriptions = new CompositeDisposable;

BtcStatusBarView = (function(superClass) {
  extend(BtcStatusBarView, superClass);

  function BtcStatusBarView() {
    this.build = bind(this.build, this);
    return BtcStatusBarView.__super__.constructor.apply(this, arguments);
  }

  BtcStatusBarView.prototype.initialize = function(statusBar) {
    this.statusBar = statusBar;
    subscriptions.add(atom.commands.add('atom-workspace', {
      'btc-status-bar:toggle': (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this)
    }));
    subscriptions.add(atom.commands.add('atom-workspace', {
      'btc-status-bar:refresh': (function(_this) {
        return function() {
          return _this.build();
        };
      })(this)
    }));
    this.observeDisplay = atom.config.observe('btc-status-bar.display', (function(_this) {
      return function(newValue, previous) {
        return _this.build();
      };
    })(this));
    return this.initEls();
  };

  BtcStatusBarView.prototype.initEls = function() {
    this.classList.add('btc-box', 'inline-block');
    this.setAttribute('id', 'btc-status-bar');
    this.one_into_usd = document.createElement('span');
    this.one_into_usd.textContent = '1 BTC = $';
    this.usd_price = document.createElement('span');
    this.appendChild(this.one_into_usd);
    this.appendChild(this.usd_price);

    return this;
  };

  BtcStatusBarView.prototype.attach = function() {
    var minutes, refresh;
    this.build();
    minutes = atom.config.get('btc-status-bar.refresh');
    if (minutes > 0) {
      refresh = minutes * 60 * 1000;
      return setInterval(((function(_this) {
        return function() {
          return _this.build();
        };
      })(this)), refresh);
    }
  };

  BtcStatusBarView.prototype.toggle = function() {
    if (this.hasParent()) {
      return this.detach();
    } else {
      return this.attach();
    }
  };

  BtcStatusBarView.prototype.hasParent = function() {
    var bar, has;
    has = false;
    bar = document.getElementsByTagName('btc-status-bar');

    return has;
  };

  BtcStatusBarView.prototype.detach = function() {
    var bar, el, parent;
    bar = document.getElementsByTagName('btc-status-bar');
    if (bar !== null) {
      if (bar.item() !== null) {
        el = bar[0];
        parent = el.parentNode;
        if (parent !== null) {
          return parent.removeChild(el);
        }
      }
    }
  };

  BtcStatusBarView.prototype.destroy = function() {
    var ref;
    if ((ref = this.tile) != null) {
      ref.destroy();
    }
    return this.detach();
  };

  BtcStatusBarView.prototype.build = function() {
    return BtcPrice((function(_this) {
      return function(coin) {
        _this.usd_price.textContent = coin;

        if (atom.config.get('btc-status-bar.display') === 'left') {
          _this.tile = _this.statusBar.addLeftTile({
            priority: 100,
            item: _this
          });
        } else {
          _this.tile = _this.statusBar.addRightTile({
            priority: 100,
            item: _this
          });
        }
      };
    })(this));
  };

  return BtcStatusBarView;

})(HTMLDivElement);

module.exports = document.registerElement('btc-status-bar', {
  prototype: BtcStatusBarView.prototype
});
