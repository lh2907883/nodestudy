var http = require('http');  
var server = http.createServer(function (request, response) {  
    var j = 0;  
    for (var i = 0; i < 1000000; i++) {  
        j += 2 / 3;  
    }  
    response.end(j + '');  
    console.log('end');
});  
server.listen(8881);  
console.log('Server running at http://127.0.0.1:8881/');  