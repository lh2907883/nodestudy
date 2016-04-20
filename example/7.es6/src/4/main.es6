require("babel-core/register");
require("babel-polyfill");

{
    function* generator(one){
        console.log('generator begin')
        console.log(one);
        let two = yield 'hello';
        console.log(two);
        let three = yield 'everyone';
        console.log(three);
        return '!';
    }
    //generator方法(声明的时候比普通函数多个*)可以看做一个特殊的遍历器生成方法
    //调用generator函数,并不会执行它,只是返回了它的遍历器,通过调用遍历器的next方法来依次返回generator函数的中间状态
    let iterator = generator(1);
    console.log('before first iterator.next()')
    console.log(iterator.next());
    //这个2会作为yield 'hello'的返回值传递给generator, 而第一次调用next方法时的形参没有使用(这个时候要想传参,可以在调用遍历器方法时传递(eg: let iterator = generator(1);))
    console.log(iterator.next(2));
    console.log(iterator.next(3));

    console.log('-------------------------------------');
    //一旦next方法的返回对象的done属性为true，for of循环就会中止，且不包含该返回对象，所以最后的"!"不包括在for of循环中
    for(let v of generator()){
        console.log('value is:' + v);
    }

    console.log('-------------------------------------');
    //解构赋值也会用到for of
    var arr = [...generator()]
    console.log(arr);
}