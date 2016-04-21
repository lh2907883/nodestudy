'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//默认的数组结构支持for of
var arr = [12, 23, 34, 45, 56];
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var value = _step.value;

        console.log(value);
    }

    //只所以支持for of,是应该数组在它的原型属性上扩展了一个属性名为Symbol.iterator的遍历器生成方法,调用这个方法可以得到遍历器对象
    //所以下面是上面代码的"手动执行"版本
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

var arrIterator = arr[Symbol.iterator]();
do {
    //遍历器对象调用next方法会返回一个对象{value:xx,done:bool},value是遍历得到的值,done指示是否还需要遍历
    var s = arrIterator.next();
    console.log(s);
} while (!s.done);

//下面为User类自定义一个遍历器生成方法(该方法返回一个遍历器)
var User = function User(name, gender, age) {
    //Object.assign方法是对象属性拷贝(类似jquery的$.extend)
    //{name, gender, age}是通过解构赋值把函数形参解构成{name:name, gender:gender, age:age}对象
    Object.assign(this, { name: name, gender: gender, age: age });
};
User.prototype[Symbol.iterator] = function () {
    var self = this;
    var index = 0;
    return {
        next: function next() {
            if (index == 0) {
                index++;
                return { value: self.name };
            } else if (index == 1) {
                index++;
                return { value: self.gender };
            } else if (index == 2) {
                index++;
                return { value: self.age };
            } else {
                return { done: true };
            }
        },
        //在return,break等情况下会调用return方法
        return: function _return() {
            console.log('中途退出啦!');
            return { done: true };
        }
    };
};
var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
    for (var _iterator2 = new User('dcs', true, 18)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _value = _step2.value;

        console.log(_value);
        if (_value === true) {
            break;
        }
    }

    //如果你有一个类似数组的对象想用遍历器,可以添加该对象的[Symbol.iterator]成员为数组的遍历器生成方法
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

var objArr = _defineProperty({
    0: 'hello',
    1: 'everyone',
    2: '!',
    length: 3
}, Symbol.iterator, Array.prototype[Symbol.iterator]);
//现在可以愉快的遍历这个对象了
var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
    for (var _iterator3 = objArr[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _value2 = _step3.value;

        console.log(_value2);
    }
    //for of遍历对象,实际上也可以理解为遍历对象的遍历器,因此下面的代码和上面的代码是等价的
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

var _iteratorNormalCompletion4 = true;
var _didIteratorError4 = false;
var _iteratorError4 = undefined;

try {
    for (var _iterator4 = objArr[Symbol.iterator]()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var _value3 = _step4.value;

        console.log(_value3);
    }
} catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
} finally {
    try {
        if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
        }
    } finally {
        if (_didIteratorError4) {
            throw _iteratorError4;
        }
    }
}
