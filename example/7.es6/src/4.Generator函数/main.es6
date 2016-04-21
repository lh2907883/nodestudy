require("babel-core/register");
require("babel-polyfill");

{
    console.log('-----------------step1,基础----------------');
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

{
    console.log('------------------step2,异常处理---------------');
    let generator = function* () {
        try {
            yield 'try';
        } 
        catch (e) {
            console.log('内部捕获');
        }
        console.log("通过i.throw('a'),执行到了这里")
        yield 'what';
        throw new Error('generator函数内部抛的异常');
        yield 'hehe1';
        yield 'hehe2';
        yield 'hehe3';
    }
    let i = generator();
    console.log(i.next());
    try {
        //调用遍历器对象的throw方法可以被generator函数内部的异常处理块捕获到(就是try catch块)
        //会执行catch块的代码,完了后继续执行,直到遇到yield语句,并且依然可以返回yield的值
        var what = i.throw('a');
        console.log(what);
        //再次调用throw方法时,由于generator函数内部的异常处理块已经运行过了,所以这次的异常被当前上下文的catch捕获到
        i.throw('b');
    } 
    catch (e) {
        console.log('外部捕获');
    }
    try{
        //由于generator函数内部抛了异常,所以i.next()返回{ value: undefined, done: true },并且JavaScript引擎认为这个generator函数已经运行结束了。
        console.log(i.next());
    }
    catch(e){}
    console.log(i.next());
}

{
    console.log('------------------step3,重要概念---------------');
    let generator = function* () {}
    let i = generator();
    //调用遍历器对象的遍历器生成方法,得到的结果就是遍历器对象本身...(比较绕,下面代码可以证明)
    //进一步理解得到的结论:一个遍历器对象的遍历器对象就是它本身
    console.log(i[Symbol.iterator]() === i);
}

{
    console.log('------------------step4,yield*---------------');
    function* generator(){
        yield* ["a", "b", "c"];
    }
    let i = generator();
    //yield*语句会把当前状态切换给["a", "b", "c"]的遍历器,这时调用i.next()实际上是在遍历["a", "b", "c"]的值
    //进一步理解得到的结论:yield*语句会把当前generator函数状态切换给后面的参数的遍历器(这个遍历器通过调用参数原型上的[Symbol.iterator]方法得到)
    console.log(i.next());
    console.log(i.next());
    console.log(i.next());
    console.log('------------------------------------------');
    let g1 = function* () {
        yield '1.1'
        yield '1.2'
        yield '1.3'
    }
    let g2 = function* () {
        yield '1'
        let ig1 = g1()
        //这时我们套用上面的结论,有如下解释:
        //yield*语句会把当前g2函数状态切换给后面的参数(ig1)的遍历器(由于ig1本身就是一个遍历器对象,所以ig1的遍历器对象就是ig1)
        //所以g2这时相当于 function* (){
        //  yield '1'
        //  yield '1.1'
        //  yield '1.2'
        //  yield '1.3'
        //  yield '2'
        //}
        yield* ig1
        yield '2'
    }
    let ig2 = g2();
    console.log(ig2.next());
    console.log(ig2.next());
    console.log(ig2.next());
    console.log(ig2.next());
    console.log(ig2.next());
}

{
    console.log('------------------step5,改写上一节的例子---------------');
    //方式一:
    let User = function(name, gender, age){
        Object.assign(this, {name, gender, age});
    }
    User.prototype[Symbol.iterator] = function* (){
        try{
            //generator函数的this对象之所以指向User对象是因为generator函数被赋值给了User的原型
            yield this.name
            yield this.gender
            yield this.age
            var isEnd = true;
        }
        catch(e){

        }
        //不管什么原因都会执行finally代码块,哪怕你break遍历器
        finally{
            if(!isEnd){
                console.log('中途退出啦!');
            }
        }
    }
    for (let value of new User('dcs', true, 18)) {
        console.log(value);
        if(value === true){
            break;
        }
    }
    console.log('------------------------------------------');
    //逼格更高的方式二
    let generator = function* (){
        yield this.name
        yield this.gender
        yield this.age
    }
    generator.prototype.return = function(){
        console.log('中途退出啦!')
    }
    User.prototype[Symbol.iterator] = generator;
    for (let value of new User('dcs', true, 18)) {
        console.log(value);
        if(value === true){
            break;
        }
    }
}