## nodejs中使用ES6
1. 安装Babel6
    
    `npm install babel-core --save-dev`
2. 如果想使用es6语法，必须安装一个插件

    `npm install babel-preset-es2015 --save-dev`
3. 然后在文件夹下面创建一个叫.babelrc的文件，并写入如下代码：

        {
            "presets": ["es2015"]
        }
4. 然后创建一个nodejs程序入口,比如`main.js`,用es6写些代码吧
5. 运行main.js(使用babel-node代替node)

    `babel-node main.js`