var http = require('http');
var url = require('url');
var express = require('express');

var app = express();

offline = false;
app.use('/web',express.static('web'))
app.use('/index',function(req,res,next){
    if(offline)
    {
        res.status(404)
        res.send('offline');
    }
    next()
})
app.get('/index',function(req,res){
    res.send('Salam');
})

app.get('/repair',function(req,res){
    offline = false;
    res.redirect('/web')
    res.end()
})

app.get('/error',function(req,res){
    res.status(404);
    res.send('404');
    offline=true;
    
})



app.listen(8082);