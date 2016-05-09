var formidable = require('formidable'),
    fs = require('fs'),
    path = require('path'),
    http = require('http'),
    util = require('util');

http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    //创建表单上传
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = path.resolve("tmpl/");
    //保留后缀
    form.keepExtensions = true;
    //设置单文件大小限制    
    form.maxFieldsSize = 2 * 1024 * 1024;
    //form.maxFields = 1000;  设置所以文件的大小总和

    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });
  }
  else{
    fs.readFile(path.join(__dirname, req.url), "binary", function(err, file) {
      if(!err){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(file, "binary");
        res.end();
      }
      else{
        res.writeHead(404);
        res.end();
      }
    });
  }
}).listen(8077);