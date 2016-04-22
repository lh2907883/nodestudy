require("babel-core/register");
require("babel-polyfill");

var g = function* (){
    var res1 = yield '1'
    console.log(res1);
}
var i = g();
i.next();
i.next('aaa','ddf','3434',4);