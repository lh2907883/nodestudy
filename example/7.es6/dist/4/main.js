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
