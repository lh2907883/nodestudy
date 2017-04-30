var later = require('later');
//每5秒钟的规则
var sched = later.parse.text('every 5 seconds');
//测试规则出发的时间，并打印出来
var occurrences = later.schedule(sched).next(10);
for (var i = 0; i < 10; i++) {
    console.log(occurrences[i]);
}
//每5秒钟运行一次,直到调用later.clear()为止
later.setInterval(function() {
    console.log('hehe')
}, sched);