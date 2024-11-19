// function middleWare1(req,res,next){
//     console.log("middleware1 executed");
//     //send res
//     res.send({message:"this is from middleware1"})
//     next()
// }
// function middleWare2(req,res,next){
//     console.log("middleware2 executed")
//     res.send({message:"this is middleware2"})
//     next()
// }
// //using middleware
//     //app level middleware(for every request)
//     app.use(middleWare1)
//     app.use(middleWare2)
