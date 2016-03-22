var orm = require("orm");
var models = require('./models.js');

var opts = {
    host:     '127.0.0.1',
    database: 'test',
    protocol: 'mysql',
    username: "root",
    password: "222222",
    // port:     '3306',
    query:    {
        pool: true
    }
};
orm.settings.set('connection.debug', true);
orm.connect(opts, function (err, db) {
    models.init(db);
    // models.sync();
    // return;

    var c = new models.Class({
        name: '三三'
    });
    c.save(function(){
        var p = new models.Person();
        p.name = 'dcs';
        p.surname = 'surname';
        p.age = 20;
        p.male = true;
        p.continent = 'Asia';
        p.data = JSON.stringify({a:1,b:true,c:'abc'});
        //如果用p.addClass(c)方法,一定要保证c有id值,否则报错
        p.class_id = c.id;
        // p.save(function(err){
        //     console.log(err);
        //     // console.log('t_person添加成功')
        // });

        p.addCourses(new models.Course({
            name: 'english'
        }), {score: 70}, function(err, res){
            
        })
    });
});