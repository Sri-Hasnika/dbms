const exp=require('express')
const app=exp()
app.listen(3500,()=>console.log('server on port 3500'))
app.use(exp.json())
let products=[
{id:1,name:"suresh",age:50},
{id:2,name:"kavitha",age:45}
]
//create a product
app.post('/product',(req,res)=>{
    let newProduct=req.body;
    products.push(newProduct)
    res.send({message:"New product created"})
})

//read all products
app.get('/products',(req,res)=>{
    res.send({message:"all products",payload:products})
})

//read a product by product Id
app.get('/products/:id',(req,res)=>{
    const paramId=Number(req.params.id);
    let result=products.find(product=>product.id===paramId)
    if(result===undefined){
        res.send({message:"Product not found"})
    }
    else{
        res.send({message:"Product",payload:result})
    }
})

//update a product
app.put('/product',(req,res)=>{
    let modifiedUser=req.body
    let productIndex=products.findIndex(product=>product.id===modifiedUser.id)
    if(productIndex===-1){
        res.send({message:"user not found to update"})
    }
    else{
        products.splice(productIndex,1,modifiedUser)
        res.send({message:"user modified"})
    }
})

//delete a product by id
app.delete('/products/:id',(req,res)=>{
    let paramId=Number(req.params.id)
    let productIndex=products.findIndex(product=>product.id===paramId)
    if(productIndex===-1){
        res.send({message:"user not found to delete"})
    }
    else{
        products.splice(productIndex,1)
        res.send({message:"product deleted"})
    }
}
)