// var net = require('net') ;
var http = require('http');
var https = require('https');

var handler = function(isHttps, reqOpt, res){
    var _http = isHttps ? https : http;
    _http.request(reqOpt, function(e1){
        if (e1.statusCode == 200) {
            //buffer拼接要用下面的方法,不是简单的+=
            var chunks = [];
            var size = 0;
            e1.on('data', function (chunk) {
                chunks.push(chunk);
                size += chunk.length;
            }).on('end', function(){
                var data = null;
                switch(chunks.length){
                    case 0:
                        data = new Buffer(0);
                        break;
                    case 1:
                        data = chunks[0];
                        break;
                    default:
                        data = new Buffer(size);
                        for (var i = 0, pos = 0, l = chunks.length; i < l; i++) {
                            var chunk = chunks[i];
                            chunk.copy(data, pos);
                            pos += chunk.length;
                        }
                        break;
                }
                //设置响应头
                for(var attr in e1.headers){
                    res.setHeader(attr, e1.headers[attr]);
                }
                res.write(data);
                res.end();
            });
        }
        //301,302代表重定向
        else if(e1.statusCode == 301 || e1.statusCode == 302){
            var targetUrl = e1.headers.location;
            var opt = getOpt(targetUrl, e1.req._headers, e1.req.method);
            var _isHttps = isHttps;
            if(opt.host){
                _isHttps = checkHttps(targetUrl);
            }
            else{
                opt.host = e1.req._headers['host'];
                opt.hostname = e1.req._headers['host'];
                opt.port = reqOpt.port;
                opt.path = targetUrl;
            }
            handler(_isHttps, opt, res);
        }
    }).end();
}

var checkHttps = function(url){
    return url.indexOf('https') != -1;
}
var getOpt = function(url, headers, method){
    var opt = {
        method: method,
        agent: false,
        headers: {
            'accept': headers['accept'] || '',
            'accept-encoding': headers['accept-encoding'] || '',
            'accept-language': headers['accept-language'] || '',
            'cookie': headers['cookie'] || '',
            'user-agent': headers['user-agent']
        }
    };
    var regex = /^https?:\/\/([^:\/]+):?([^:\/]*)([\s\S]*)$/i;
    var m = url.match(regex);
    if(m){
        opt.host = m[1];
        opt.hostname = m[1];
        if(m[2]){
            opt.port = m[2];
        }
        opt.path = m[3] || '/';
    }
    return opt;
}

var server = http.createServer();
server.on('request', function(req, res){
    var opt = getOpt(req.url, req.headers, req.method);
    var isHttps = checkHttps(req.url);
    handler(isHttps, opt, res);
});
server.listen(9999) ;