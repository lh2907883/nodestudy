//1.文件内容输出到终端
// var fs = require('fs');
// fs.createReadStream('a.txt').pipe(process.stdin)

//2.终端输入pipe到终端输出
// process.stdin.pipe(process.stdout)

//3.stream转化成普通回调，拿到buffer
var concat = require('concat-stream');
var reverseStream = concat(function(buffer) {
    console.log(buffer);
    console.log(buffer.toString().split("").reverse().join(""));
})
var fs = require('fs');
fs.createReadStream('a.txt').pipe(reverseStream);