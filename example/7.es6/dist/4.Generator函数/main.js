"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

require("babel-core/register");
require("babel-polyfill");

{
    var generator = regeneratorRuntime.mark(function generator(one) {
        var two, three;
        return regeneratorRuntime.wrap(function generator$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log('generator begin');
                        console.log(one);
                        _context.next = 4;
                        return 'hello';

                    case 4:
                        two = _context.sent;

                        console.log(two);
                        _context.next = 8;
                        return 'everyone';

                    case 8:
                        three = _context.sent;

                        console.log(three);
                        return _context.abrupt("return", '!');

                    case 11:
                    case "end":
                        return _context.stop();
                }
            }
        }, generator, this);
    });
    //generator方法(声明的时候比普通函数多个*)可以看做一个特殊的遍历器生成方法
    //调用generator函数,并不会执行它,只是返回了它的遍历器,通过调用遍历器的next方法来依次返回generator函数的中间状态

    console.log('-----------------step1,基础----------------');
    var iterator = generator(1);
    console.log('before first iterator.next()');
    console.log(iterator.next());
    //这个2会作为yield 'hello'的返回值传递给generator, 而第一次调用next方法时的形参没有使用(这个时候要想传参,可以在调用遍历器方法时传递(eg: let iterator = generator(1);))
    console.log(iterator.next(2));
    console.log(iterator.next(3));

    console.log('-------------------------------------');
    //一旦next方法的返回对象的done属性为true，for of循环就会中止，且不包含该返回对象，所以最后的"!"不包括在for of循环中
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = generator()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var v = _step.value;

            console.log('value is:' + v);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    console.log('-------------------------------------');
    //解构赋值也会用到for of
    var arr = [].concat(_toConsumableArray(generator()));
    console.log(arr);
}

{
    console.log('------------------step2,异常处理---------------');
    var _generator = regeneratorRuntime.mark(function _generator() {
        return regeneratorRuntime.wrap(function _generator$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return 'try';

                    case 3:
                        _context2.next = 8;
                        break;

                    case 5:
                        _context2.prev = 5;
                        _context2.t0 = _context2["catch"](0);

                        console.log('内部捕获');

                    case 8:
                        console.log("通过i.throw('a'),执行到了这里");
                        _context2.next = 11;
                        return 'what';

                    case 11:
                        throw new Error('generator函数内部抛的异常');

                    case 14:
                        _context2.next = 16;
                        return 'hehe2';

                    case 16:
                        _context2.next = 18;
                        return 'hehe3';

                    case 18:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _generator, this, [[0, 5]]);
    });
    var i = _generator();
    console.log(i.next());
    try {
        //调用遍历器对象的throw方法可以被generator函数内部的异常处理块捕获到(就是try catch块)
        //会执行catch块的代码,完了后继续执行,直到遇到yield语句,并且依然可以返回yield的值
        var what = i.throw('a');
        console.log(what);
        //再次调用throw方法时,由于generator函数内部的异常处理块已经运行过了,所以这次的异常被当前上下文的catch捕获到
        i.throw('b');
    } catch (e) {
        console.log('外部捕获');
    }
    try {
        //由于generator函数内部抛了异常,所以i.next()返回{ value: undefined, done: true },并且JavaScript引擎认为这个generator函数已经运行结束了。
        console.log(i.next());
    } catch (e) {}
    console.log(i.next());
}

{
    console.log('------------------step3,重要概念---------------');
    var _generator2 = regeneratorRuntime.mark(function _generator2() {
        return regeneratorRuntime.wrap(function _generator2$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _generator2, this);
    });
    var _i = _generator2();
    //调用遍历器对象的遍历器生成方法,得到的结果就是遍历器对象本身...(比较绕,下面代码可以证明)
    //进一步理解得到的结论:一个遍历器对象的遍历器对象就是它本身
    console.log(_i[Symbol.iterator]() === _i);
}

{
    (function () {
        var generator = regeneratorRuntime.mark(function generator() {
            return regeneratorRuntime.wrap(function generator$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            return _context4.delegateYield(["a", "b", "c"], "t0", 1);

                        case 1:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, generator, this);
        });

        console.log('------------------step4,yield*---------------');

        var i = generator();
        //yield*语句会把当前状态切换给["a", "b", "c"]的遍历器,这时调用i.next()实际上是在遍历["a", "b", "c"]的值
        //进一步理解得到的结论:yield*语句会把当前generator函数状态切换给后面的参数的遍历器(这个遍历器通过调用参数原型上的[Symbol.iterator]方法得到)
        console.log(i.next());
        console.log(i.next());
        console.log(i.next());
        console.log('------------------------------------------');
        var g1 = regeneratorRuntime.mark(function g1() {
            return regeneratorRuntime.wrap(function g1$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return '1.1';

                        case 2:
                            _context5.next = 4;
                            return '1.2';

                        case 4:
                            _context5.next = 6;
                            return '1.3';

                        case 6:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, g1, this);
        });
        var g2 = regeneratorRuntime.mark(function g2() {
            var ig1;
            return regeneratorRuntime.wrap(function g2$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.next = 2;
                            return '1';

                        case 2:
                            ig1 = g1();
                            //这时我们套用上面的结论,有如下解释:
                            //yield*语句会把当前g2函数状态切换给后面的参数(ig1)的遍历器(由于ig1本身就是一个遍历器对象,所以ig1的遍历器对象就是ig1)
                            //所以g2这时相当于 function* (){
                            //  yield '1'
                            //  yield '1.1'
                            //  yield '1.2'
                            //  yield '1.3'
                            //  yield '2'
                            //}

                            return _context6.delegateYield(ig1, "t0", 4);

                        case 4:
                            _context6.next = 6;
                            return '2';

                        case 6:
                        case "end":
                            return _context6.stop();
                    }
                }
            }, g2, this);
        });
        var ig2 = g2();
        console.log(ig2.next());
        console.log(ig2.next());
        console.log(ig2.next());
        console.log(ig2.next());
        console.log(ig2.next());
    })();
}

{
    console.log('------------------step5,改写上一节的例子---------------');
    //方式一:
    var User = function User(name, gender, age) {
        Object.assign(this, { name: name, gender: gender, age: age });
    };
    User.prototype[Symbol.iterator] = regeneratorRuntime.mark(function _callee() {
        var isEnd;
        return regeneratorRuntime.wrap(function _callee$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.prev = 0;
                        _context7.next = 3;
                        return this.name;

                    case 3:
                        _context7.next = 5;
                        return this.gender;

                    case 5:
                        _context7.next = 7;
                        return this.age;

                    case 7:
                        isEnd = true;
                        _context7.next = 12;
                        break;

                    case 10:
                        _context7.prev = 10;
                        _context7.t0 = _context7["catch"](0);

                    case 12:
                        _context7.prev = 12;

                        if (!isEnd) {
                            console.log('中途退出啦!');
                        }
                        return _context7.finish(12);

                    case 15:
                    case "end":
                        return _context7.stop();
                }
            }
        }, _callee, this, [[0, 10, 12, 15]]);
    });
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = new User('dcs', true, 18)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var value = _step2.value;

            console.log(value);
            if (value === true) {
                break;
            }
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    console.log('------------------------------------------');
    //逼格更高的方式二
    var _generator3 = regeneratorRuntime.mark(function _generator3() {
        return regeneratorRuntime.wrap(function _generator3$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        _context8.next = 2;
                        return this.name;

                    case 2:
                        _context8.next = 4;
                        return this.gender;

                    case 4:
                        _context8.next = 6;
                        return this.age;

                    case 6:
                    case "end":
                        return _context8.stop();
                }
            }
        }, _generator3, this);
    });
    _generator3.prototype.return = function () {
        console.log('中途退出啦!');
    };
    User.prototype[Symbol.iterator] = _generator3;
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = new User('dcs', true, 18)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _value = _step3.value;

            console.log(_value);
            if (_value === true) {
                break;
            }
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }
}
