// // //approach-1
// // //create http server
// // const {createServer}=require('http') //import http module
// // const server=createServer((req,res)=>{
// //     res.end("this is server response")
// // }) // creating a server and sending response to client 
// // //assign port number to http server
// // server.listen(4000,()=>{
// //     console.log('server on post 4000')
// // })

// //approach-2(using express module)
// const exp=require('express') //import module
// const app=exp() //call function and create express application object which internally creates http server
// //assign port number
// app.listen(3000,()=>console.log('This is port 3000'))
// // //sample request handler(route)
// // app.get('/',(req,res)=>{
// //     res.send('this is response')
// // })