#!/usr/bin/env node
"use strict";

var program = require('commander')

console.log('-------------process.argv---------------')
console.log(process.argv);
console.log('-------------end---------------')

program
  .version('0.0.1')
  .usage('[options] <file ...>')
  //把-i后面的参数传到parseInt里面,将调用后的返回值赋值给program.integer
  .option('-i, --integer <n>', 'An integer argument', parseInt)
  .option('-f, --float <n>', 'A float argument', parseFloat)
  //把-r后面的参数传到匿名方法里面,将调用后的返回值赋值给program.range
  .option('-r, --range <a>..<b>', 'A range', function(val) {
    return val.split('..').map(Number);
  })
  .option('-l, --list <items>', 'A list', function(val) {
    return val.split(',');
  })
  .option('-o, --optional [value]', 'An optional value')
  //把-c后面的参数传到匿名方法里面(meno的初始值是[1]),将调用后的返回值赋值给program.collect
  .option('-c, --collect [value]', 'A repeatable value', function(val, memo) {
    memo.push(val);
    return memo;
  }, [1])
  .option('-v, --verbose [value]', 'A value that can be increased', function(val, total) {
    return val + 1;
  }, 0)
  .parse(process.argv);
 
console.log(' int: %j', program.integer);
console.log(' float: %j', program.float);
console.log(' optional: %j', program.optional);
program.range = program.range || [];
console.log(' range: %j..%j', program.range[0], program.range[1]);
console.log(' list: %j', program.list);
console.log(' collect: %j', program.collect);
console.log(' verbosity: %j', program.verbose);
console.log(' args: %j', program.args);