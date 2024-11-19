const exp=require('express')
const app=exp()
app.listen(3000,()=>console.log("server on port 3000"))
app.use(exp.json())
let users=[
    {name:"ravi",age:15},
    {
    name:"kiran",age:18
    }
]
function middleware1(req,res,next){
    console.log("middleware1 executed")
    res.send({message:"get"})
    next()
}
function middleware2(req,res,next){
    console.log("middleware2 executed")
    // res.send({message:"this req is from middleware2"})
    // next()
}
function middleware3(req,res,next){
    console.log("middleware3 executed")
    // res.send({message:"this req is from middleware3"})
    next()
}

app.use(middleware1)
app.post('/user',middleware2,middleware3,(req,res)=>{
let newUser=req.body
users.push(newUser)
res.send({message:"post"})
})