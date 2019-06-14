var express=require('express');
app=express();

var sqlite3=require('sqlite3').verbose();

var db=new sqlite3.Database('myDB');
var kick=3;
var tackle=2;
var goal=4;
var handball=2;
var behind=1;
var Mark=2;
var scorepoints=[];
var i=0;
var score=0;

db.serialize(function () {
    db.run('CREATE TABLE IF NOT EXISTS AFLFANTASY(ID int,name TEXT,team TEXT, kick int,tackle int,goal int, handball int, behind int, Mark int); ');
    db.run('INSERT INTO AFLFANTASY VALUES("1","WESTOFF","PORT ADELIDE","4","2","0","2","1","2");');
    db.run('INSERT INTO AFLFANTASY VALUES("2","LANCE FRANKLIN","SYDNEY SWANS","3","1","1","2","0","1");');
    db.run('INSERT INTO AFLFANTASY VALUES("3","GOLD STIEN","MELBOURNE","2","2","0","0","0","0");');
    db.run('INSERT INTO AFLFANTASY VALUES("4","ALEX RANCE","RICHMOND","5","0","0","0","1","1");');
    db.run('INSERT INTO AFLFANTASY VALUES("5","SAMWELL POWELL","PORT ADELIDE","1","0","0","1","0","0");');
});

app.get('/points',function(req,res){
    db.all('SELECT * FROM AFLFANTASY WHERE team="PORT ADELIDE" OR team="RICHMOND"',function(err,rows){
    rows.forEach(function(row){
        scorepoints[i] = (row.kick * kick) + (row.tackle * tackle) + (row.goal * goal) + (row.handball * handball) + (row.behind * behind) + (row.Mark * Mark);
        i++;
    });
    for (let i = 0; i< scorepoints.length; i++) {     
         score=score+scorepoints[i];
    }
        res.write("<html><body><h1> Match between Richnomd and Port Adelaide");
    res.write("<h2>fantasy points: "+score+"</h2></body></html>");
    res.send();
    
});
});

app.listen(8080,function(){
});