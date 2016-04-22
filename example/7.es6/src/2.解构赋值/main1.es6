let f0 = function(name, gender){
    console.log(`name:${name};gender:${gender}`);
}
//arg是一个数组
let f1 = function(...arg){
    f0.apply(this, arg);
}
f1('dcs', '1');