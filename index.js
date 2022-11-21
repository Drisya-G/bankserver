// server creation

//1 import  express

const express = require('express')


//import dataservice
const dataService = require('./service/data.service')

//import jwt
const jwt = require('jsonwebtoken')



// 2 create an app using expresstsconoc

const app = express()

//to  parse json data from request body
app.use(express.json())

// 3 create  port number

app.listen(3001, () => {
    console.log('server listening on port :3001');
})




//application  specific middleware

const appMiddleware =(req,res,next)=>{
    console.log('application specific middleware');
    next();
}
app.use(appMiddleware)

//router specific middleware



const jwtMiddleware = (req,res,next)=>{
    try{
    const token = req.body.token;
    console.log('router specific middleware');
    const data = jwt.verify(token,'superkey2020')
    console.log(data);
    next();
}
catch{
    res.status(422).json({       //422=unable to process..(unproccessable entity)
        statusCode:422,
        status:false,
        message:'please login first'
    })
}

}




// 4 Resolving HTTP request

// //GET Method    =    display data
// app.get('/', (_req, res) => {
//     res.send('GET method')
// })

// //POST method = create
// app.post('/', (_req, res) => {
//     res.send('POST method')
// })

// //DELETE method
// app.delete('/', (_req, res) => {
//     res.send('DELETE method')
// })


// //PATCH method  = partial update
// app.patch('/', (_req, res) => {
//     res.send('PATCH method')
// })

// //PUT reguest  =complete update
// app.put('/', (_req, res) => {
//     res.send('PUT method')
// })



//API request /call

//login
//register
//deposit
//withdraw
//delete
//transaction history


//Resolving  rgistraation request

app.post('/register', (req, res) => {
    console.log(res.body);
    const result = dataService.register(req.body.acno,req.body.username,req.body.password);

        res.status(result.statusCode).json(result);


    // if(result){
    // res.send('successfully registered')

    // }
    // else{
    // res.send('user registration failed')

    // }

})




//resolving login request - post

app.post('/login',(req,res)=>{
    console.log(res.body);
    const result=dataService.login(req.body.acno,req.body.pswd)
    res.status(result.statusCode).json(result)
})

//resolving deposit request - post
app.post('/deposit',jwtMiddleware,(req,res)=>{
    console.log(res.body);
    const result=dataService.deposit(req.body.acno,req.body.pswd,req.body.amount)
    res.status(result.statusCode).json(result)
})

// //resolving withdraw request - post

app.post('/withdraw',(req,res)=>{
    console.log(res.body);
    const result=dataService.withdraw(req.body.acno,req.body.pswd,req.body.amount)
    res.status(result.statusCode).json(result)
})


// //resolving transaction request - post


app.post('/transaction',(req,res)=>{
    console.log(res.body);
    const result=dataService.getTransaction(req.body.acno)
    res.status(result.statusCode).json(result)
})


