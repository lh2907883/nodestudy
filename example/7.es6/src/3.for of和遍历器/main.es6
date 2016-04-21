//默认的数组结构支持for of
let arr = [12,23,34,45,56];
for (let value of arr) {
    console.log(value);
}

//只所以支持for of,是应该数组在它的原型属性上扩展了一个属性名为Symbol.iterator的遍历器生成方法,调用这个方法可以得到遍历器对象
//所以下面是上面代码的"手动执行"版本
let arrIterator = arr[Symbol.iterator]();
do{
    //遍历器对象调用next方法会返回一个对象{value:xx,done:bool},value是遍历得到的值,done指示是否还需要遍历
    var s = arrIterator.next();
    console.log(s);
}
while(!s.done);

//下面为User类自定义一个遍历器生成方法(该方法返回一个遍历器)
let User = function(name, gender, age){
    //Object.assign方法是对象属性拷贝(类似jquery的$.extend)
    //{name, gender, age}是通过解构赋值把函数形参解构成{name:name, gender:gender, age:age}对象
    Object.assign(this, {name, gender, age});
}
User.prototype[Symbol.iterator] = function(){
    const self = this;
    let index = 0;
    return {
        next: function(){
            if(index == 0){
                index++;
                return {value:self.name};
            }
            else if(index == 1){
                index++;
                return {value: self.gender};
            }
            else if(index == 2){
                index++;
                return {value: self.age};
            }
            else{
                return {done: true};
            }
        },
        //在return,break等情况下会调用return方法
        return: function(){
            console.log('中途退出啦!')
            return {done: true};
        }
    };
}
for (let value of new User('dcs', true, 18)) {
    console.log(value);
    if(value === true){
        break;
    }
}

//如果你有一个类似数组的对象想用遍历器,可以添加该对象的[Symbol.iterator]成员为数组的遍历器生成方法
let objArr = {
    0: 'hello', 
    1: 'everyone', 
    2: '!', 
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
}
//现在可以愉快的遍历这个对象了
for (let value of objArr) {
    console.log(value);
}
//for of遍历对象,实际上也可以理解为遍历对象的遍历器,因此下面的代码和上面的代码是等价的
for (let value of objArr[Symbol.iterator]()) {
    console.log(value);
}