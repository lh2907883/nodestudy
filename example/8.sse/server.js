var http = require('http');
//当收到客户端的请求时,服务器会在2秒后响应
http.createServer(function(req, res) {
  var i=1;
  console.log('start')
  setTimeout(function(){
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*" //允许跨域
    });
    
    if(req.url == '/server_interval'){
      //服务端可以不调用res.end();来和客户端保持长连接
      setInterval(function(){
        res.write("id: "+i+"\n");
        i++;
        res.write("data: "+new Date()+"\n\n");
      }, 1000)
    }
    else{
      //指定客户端在收到响应后的5秒钟,再次发送长连接请求,如果不指定retry: 5000,那就根据浏览器的实现,自行在xx秒后发送长连接请求
      res.write("retry: 5000\n");
      res.write("id: "+i+"\n");
      i++;
      res.write("data: "+new Date()+"\n\n");
      //如果不实用end结束这个连接,客户端是不会再次发送长连接请求的
      res.end();
    }
    console.log('end')
  }, 2000);
}).listen(8880);