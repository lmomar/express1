var express = require('express');
var http = require('http');
var mongo = require('mongodb');
var mongoDb  = mongo.MongoClient;
var app = express();
var bodyParser = require('body-parser');

var url = 'mongodb://localhost:27017/dbtp1';
var db;
var users;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.all('/*', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Access-Token,X-Key");

    if(req.method === 'OPTIONS'){
        res.status(200).end();
    } else {
        next();
    }

});

app.use('/',express.static('/web'));
ObjectId = mongo.ObjectID;
mongoDb.connect(url,function(err,db1){
    console.log('connected')
    db = db1;
})
app.get('/all',function(req,res){
    db.collection('users').find({}).toArray(function(err,results){
        res.json(results);      
    })
    
})

app.post('/insert',function(req,res) {
    //var user = {nom:"user nom",prenom:"user prenom"};
    db.collection('users').insert(req.body,function(error,result) {
        res.json({"user":result});
    })
    //console.log(req.body);
})

app.get('/delete/:id',function(req,res){
    db.collection('users').remove({"_id" : ObjectId(req.params.id)})
    console.log(req.params.id)
})

app.listen(8084)


