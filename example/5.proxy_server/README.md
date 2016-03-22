## http代理服务器
#### 功能
1. 抓包
2. http请求转发

#### 如何使用
1. 安装`node-inspector`,然后 `node-inspector &`
2. `node --debug main.js` (开启http代理服务器,端口9999)
3. 打开 http://127.0.0.1:8080/?port=5858 , 在network下可以查看所有请求
4. 找一个可以访问到服务器的设备(可以是手机,pad什么的),设置wifi代理,ip:服务器IP,端口:9999
5. 使用该设备查看网页, 在第3步可以看到请求信息

#### 扩展
1. 目前只能转发http, 可以使用更加底层的`require('net')`监听tcp包
2. 可以干点坏事,下面是参考文章:
    1. http://www.cnblogs.com/index-html/archive/2013/05/06/wifi_hijack_1.html
    2. http://www.cnblogs.com/index-html/archive/2013/06/14/wifi_hijack_2.html
    3. http://www.cnblogs.com/index-html/p/wifi_hijack_3.html