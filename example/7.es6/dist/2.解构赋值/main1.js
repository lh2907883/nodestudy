'use strict';

var f0 = function f0(name, gender) {
    console.log('name:' + name + ';gender:' + gender);
};
//arg是一个数组
var f1 = function f1() {
    for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
        arg[_key] = arguments[_key];
    }

    f0.apply(this, arg);
};
f1('dcs', '1');
