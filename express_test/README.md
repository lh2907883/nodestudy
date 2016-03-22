## package.json中的scripts

1. 使用`npm help`命令可以看到scripts中的内建任务,这些任务可以使用`npm <cmd>`运行(其实是`npm run <cmd>`的简写),每个任务的作用可以通过`npm <cmd> -h`查看

2. 写在scripts中的自定义任务需要通过`npm run <cmd>`来运行,下面是是一个package.json的示例, 其中start是内建任务,debug和ls是自定义任务
        
        {
            "name": "express_test",
            "version": "0.0.0",
            "private": true,
            "scripts": {
              "start": "node ./bin/www",
              "debug": "node --debug ./bin/www",
              "ls": "ls"
            },
            "dependencies": {
            "body-parser": "~1.13.2",
            "cookie-parser": "~1.3.5",
            "debug": "~2.2.0",
            "express": "~4.13.1",
            "jade": "~1.11.0",
            "markdown-js": "0.0.3",
            "morgan": "~1.6.1",
            "serve-favicon": "~2.3.0"
          }
        }