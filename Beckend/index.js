const express=require('express')
const app=express()
const sequalizeDb = require('./sequalizeDb')
const UserController =require('./controllers/UserController')

app.use(express.json())



app.get('/',(req,res)=>{
    res.send("app is working")
})

app.post('/api/register',UserController.Register)
app.post('/api/login',UserController.Login);
app.post('/api/payment',UserController.AddPayemnt);

module.exports = app; 
