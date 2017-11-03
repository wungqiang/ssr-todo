exports.debounce = function (fn, delay) {
  var timer = null;
  return function () {
    var self = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(self, args);
    }, delay);
  };
};

exports.throttle = function (fn, threhhold) {
  threhhold = threhhold || 300;
  var last, deferTimer;

  return function () {
    var self = this;
    var args = arguments;
    var now = new Date().getTime();

    if (last && now < last + threhhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(self, args);
      }, threhhold);
    } else {
      last = now;
      fn.apply(self, args);
    }
  };
};

exports.ensureProps =  function (obj, propChain) {
    var current = obj || {};
    var props = propChain.split('.');
    var chain = [];
    var prop;
    while (prop = props.shift()) {
        chain.push(prop);
        current[prop] = current[prop] || {};
        if (typeof current[prop] !== 'object') {
            // TODO: data type error track
            return false;
        }
        current = current[prop];
    }
    return true;
};

exports.formatDate = formatDate;

exports.formatTime = formatTime;

exports.formatDatetime = function (time, seperator) {
    var date = new Date(time);
    return formatDate(time, seperator) + ' ' + formatTime(time);
};

exports.panNumber = panNumber;

function formatDate(time, seperator) {
    var date = new Date(time);
    seperator = seperator || '-';
    return date.getFullYear() + seperator +
        panNumber(date.getMonth() + 1) + seperator +
        panNumber(date.getDate());
}

function formatTime(time) {
    var date = new Date(time);
    return panNumber(date.getHours()) + ':' +
        panNumber(date.getMinutes()) + ':' +
        panNumber(date.getSeconds());
}

function panNumber(num) {
    return num < 10 ? ('0' + num) : num;
}
