let [a1, [[a2], a3]] = [1, [[2], 3]]; 
console.log('解构[a1, [[a2], a3]] = [1, [[2], 3]]: a1 = ' + a1 + ', a2 = ' + a2 + ', a3 = ' + a3);
console.log('\n')

{
    let add = (a, b) => {return a + b};
    let concat = (arr1, arr2) => {return arr1.concat(arr2)};
    console.log('add 1,2 = ' + add(1,2));
    console.log('concat [1,2,3] and [4,5] = ' + concat([1,2,3], [4,5]));

    //在不改变func代码的情况下, 实现"累计函数",例如下面的add_multi,concat_multi
    let multi = (func) => {
        return (...args) => {
            return args.reduce((obj1, obj2) => {
                return func(obj1, obj2);
            })
        }
    }
    let add_multi = multi(add);
    let concat_multi = multi(concat);
    console.log('add_multi 1,2,3,4,5 = ' + add_multi(1,2,3,4,5));
    console.log('concat_multi [1,2,3] & [4,5] & [6, "hehe"] = ' + concat_multi([1,2,3], [4,5], [6, "hehe"]));
}