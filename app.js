const express = require('express')
const path = require('path')
const mysql = require('mysql')
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const public= path.join(__dirname,'./public')
const viewPath = path.join(__dirname,'./templates/views');
app.set('view engine','hbs');
app.set('views',viewPath);
const connection =  mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "juan@2000juan",
    database: "users"
}) 
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(express.static(public))
app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/bedroom',(req,res)=>{ 
    res.render('bedroom')
})
app.get('/contact',(req,res)=>{ 
    res.render('contact')
})
app.get('/kitchen',(req,res)=>{
    res.render('kitchen')
})
app.get('/otherservices',(req,res)=>{
    res.render('otherservices')
})
app.get('/index',(req,res)=>{
    res.render('index')
})

app.post('/contacts/submit',(req,res)=>{
    const {name,email,landmark,city,pincode,message} = req.body;
   // console.log(name,email,landmark,city,pincode,message)
   connection.query("INSERT INTO contactlist SET ?",
   { name,email,landmark,city,pincode,message}
   ,(err,res)=>{
        if(err) 
            console.log(err);
        console.log(res);    
   })
   req.body = null;
   res.render('response')
})
app.listen(PORT,()=>{ 
    console.log("Port is up and running on port " +PORT);
})