const express=require('express')
const app=express()
const sequalizeDb = require('./sequalizeDb')
const UserController =require('./controllers/UserController')

app.use(express.json())



app.get('/',(req,res)=>{
    res.send("app is working")
})

app.post('/register',UserController.Register)
app.post('/login',UserController.Login);
app.post('/payment',UserController.AddPayemnt);

app.listen(5000,()=>{
    console.log("running")
})
