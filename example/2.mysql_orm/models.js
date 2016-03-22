var orm = require("orm");

function personInit(){
    models.Person = models.__db.define("t_person", {
        name      : String,
        surname   : String,
        age       : Number, // FLOAT
        male      : Boolean,
        continent : [ "Europe", "America", "Asia", "Africa", "Australia", "Antartica" ], // ENUM type
        photo     : Buffer, // BLOB/BINARY
        data      : Object // JSON encoded
    }, {
        methods: {
            fullName: function () {
                return this.name + ' ' + this.surname;
            }
        },
        validations: {
            age: orm.enforce.ranges.number(18, undefined, "under-age")
        }
    });
}
function classInit(){
    models.Class = models.__db.define("t_class", {
        name:String
    }, {

    });
}
function courseInit(){
    models.Course = models.__db.define("t_course", {
        name:String
    }, {

    });
}
var models = {
    //同步到数据库
    sync: function(){
        this.__db.sync();

        // models.Person.sync();
        // models.Class.sync();
        // models.Course.sync();
    },
    //初始化数据库结构
    init: function(db){
        this.__db = db;
        personInit();
        classInit();
        courseInit();
        //设置学生班级的关系(多对一)
        models.Person.hasOne("class", models.Class, { 
            required: true, 
            autoFetch: true 
        });
        //设置学生课程的关系(多对多)
        models.Person.hasMany("courses", models.Course, { 
            score: Number
        },{
            key     : true,
            reverse : "owners"
        });
    },
    __db: undefined,
    Person: undefined,
    Class: undefined,
    Score: undefined
}

module.exports = models;