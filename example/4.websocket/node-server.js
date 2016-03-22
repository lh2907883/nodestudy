var fs = require('fs');
var path = require('path');

var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 8088, host: '192.168.1.103' });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    if(message instanceof Buffer){
      //如果是buffer,表示接受到的是客户端传递的二进制数据,并且里面的前255字节是文件名,需要手动取出来
      var indexEnd = message.indexOf(0);
      var filename = message.slice(0, indexEnd).toString();
      //255字节之后的是文件内容
      handlers.file(filename, message.slice(255))
    }
    else if(typeof message == 'string'){
      handlers.text(message);
    }

    //向网页发送Buffer,那边收到的是blob对象
    ws.send(message);
  });

  // ws.send('something');
  wss.broadcast('welcome');
});

var handlers = {
  text: function(text){
    console.log('received: %s', text);
  },
  file: function(filename, buffer){
    var filepath = path.join(__dirname, 'temp', filename);
    fs.writeFile(filepath, buffer, function(err){
      if (err) throw err;
      console.log("Write Success!");
    });
  }
}