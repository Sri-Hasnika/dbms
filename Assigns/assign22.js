const exp=require('express')
const app=exp()
app.listen(3000,()=>console.log("server on port 3000"))
app.use(exp.json())

