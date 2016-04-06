var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  require('os').cpus().forEach(function(){
    cluster.fork();
  });
  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
  cluster.on('listening', function(worker, address) {  
    console.log("A worker with #"+worker.id+" is now connected to " +
     address.address +
    ":" + address.port);  
  }); 
} else {
  http.createServer(function(req, res) {
    var j = 0;  
    for (var i = 0; i < 1000000; i++) {  
        j += 2 / 3;  
    }  
    res.end(j + '');  
    console.log('Worker #' + cluster.worker.id + ' make a response');
  }).listen(8884);
}