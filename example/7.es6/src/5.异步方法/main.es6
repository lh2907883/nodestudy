require("babel-core/register");
require("babel-polyfill");

//这是模拟的一个异步方法
var asyncFun = function(input, callback){
    var ms = input * 2000;
    setTimeout(function(){
        var res = +(Math.random().toFixed(1));
        console.log(`input is ${input}; output is ${res}`);
        callback && callback(res);
    }, ms);
};
//这是最原始的callbackhell写法
(function(input1, input2){
    asyncFun(input1, function(res1){
        asyncFun(res1 + input2, function(res2){
            asyncFun(res1 + res2, function(res3){
                console.log(res3);
            })
        })
    })
})//(0.5, 0.2); 

console.log('-------------------------------------');
//首先把asyncFun(arg, cb)方法改造成asyncFunThunk(arg)(cb),【这里有一个约定:1.asyncFun方法的最后一个形参是callback(异步完成的回调)】
//实际上只要满足这个约定,任何异步方法都可以改造成它的Thunk版本, 下面的Thunk方法就是这样一个通用转换器(xxxFun -> xxxFunThunk)
var Thunk = function(fn){
    return function(...args){
        var ctx = this;
        return function(callback){
            args.push(callback);
            return fn.apply(ctx, args);
        }
    }
}
//这个asyncFunThunk就是asyncFun方法的Thunk版本了
//所以asyncFun(arg,cb)等价于asyncFunThunk(arg)(cb), 需要注意的是在第二步调用xxxxx(cb)的时候才真正执行了asyncFun的逻辑
var asyncFunThunk = Thunk(asyncFun);
//下面把上面的callbackhell写法改写成一个generator函数,里面有任意个状态(yield),代表着异步方法在不同阶段的阻塞
//希望的流程是执行asyncFunThunk(input1),然后阻塞直到触发异步回调拿到参数res1,再执行asyncFunThunk(res1 + input2),阻塞直到拿到异步回调的参数res2,....最后执行完成
//实现原理: 因为yield会阻塞当前代码的执行,直到调用generator().next()才会继续执行, 这个过程和异步方法的执行有木有很像?(执行异步方法后,它的回调不会立刻执行,直到触发回调才执行)
//         所以我们只需要改造两个地方:1.在yield后面开始执行异步方法(这样后续代码就阻塞了), 2:在异步方法的回调里面执行generator().next() (这样后续代码可以继续执行了)
var generator = function* (input1, input2){
    var res1 = yield asyncFunThunk(input1)
    var res2 = yield asyncFunThunk(res1 + input2)
    var res3 = yield asyncFunThunk(res1 + res2)
};
//上面的注释只是理论,先放代码
(function(input1, input2){
    var i = generator(input1, input2);
    //这时step1就是{done: false, value: asyncFunThunk(input1)}
    var step1 = i.next();
    //真正开始执行asyncFun
    step1.value(function(data1){
        //data就是回调完成的数据,我们要想办法传给generator函数,那么可以通过next方法的参数传递
        var step2 = i.next(data1);
        step2.value(function(data2){
            var step3 = i.next(data2);
            step3.value(function(data3){
                console.log(data3);
            })
        })
    })
})//(0.5, 0.2);
//【这种做法其实有两个约定:
//  1. yield语句后面必须接异步方法的Thunk版本
//  2. 异步方法的回调方法只能有一个形参(这是因为我们是通过generator().next(data)的方式传递参数的,而next方法只能传一个参数
//】
//实际上我们需要一份代码自动执行generator函数(因为generator函数里面已经有了异步方法的先后执行顺序了,写在前面的要先执行,并且后执行的异步方法可以拿到先执行的异步方法的返回值,因为他们都在一个上下文中)
//然后观察上面的代码,虽然它依然是callbackhell并且是手动执行的,但是完全可以改写成递归调用的形式,并且通过判断generator().next()返回值的done属性改成自动执行版本
var generatorRunner = function(generator){
    var mg = {
        //这个方法就是generator函数的自动执行方法
        start: function(...runArgs){
            var i = generator.apply(null, runArgs);
            var next = function(arg){
                //这里处理了异常情况
                try{
                    var res = i.next(arg);
                }
                catch(e){
                    mg._catchcb && mg._catchcb(e);
                }
                if(!res.done){
                    res.value(function(data){
                        next(data);
                    })
                }
                else{
                    //最终完成时给个callback
                    mg._endcb && mg._endcb(arg);
                }
            }
            next();
            return mg;
        },
        endCb: function(callback){
            mg._endcb = callback;
            return mg;
        },
        catch: function(callback){
            mg._catchcb  = callback;
            return mg;
        }
    }
    return mg;
}
//最后的调用
generatorRunner(generator).start(0.5, 0.2).endCb(function(data){
    console.log(data);
})

//其实已经有现成的库做了这些事情,这些库更加稳定完善
//thunkify包做了Thunk方法的事
//co包做了generatorRunner方法的事