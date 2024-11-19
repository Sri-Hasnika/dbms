//create mini router
const exp=require('express')
const productApp=exp.Router()
//add parser
productApp.use(exp.json())
//create product rest api(routes)

//route to handle get products
productApp.get("/products",async(req,res)=>{
    //get productCollectionObj
    const productsCollectionObj=req.app.get("productsCollectionObj");
    //get products from db using find
    const productsList=await productsCollectionObj.find().toArray();
    //send res
    res.send({message:"products",payload:productsList})
})

//route to handle get products with id
productApp.get("/products/:id",async(req,res)=>{
    //get productCollectionObj
    const productsCollectionObj=req.app.get("productsCollectionObj")
    //get product id
    const productId=Number(req.params.id);
    //find product by id
    const productsList=await productsCollectionObj.findOne({id:productId})
    //send res
    res.send({message:"products",payload:productsList})
})

//route to handle create products
productApp.post("/products",async(req,res)=>{
    //get productCollectionObj
    const productsCollectionObj=req.app.get("productsCollectionObj")
    //get product obj req body
    const newProduct=req.body
    //insert into db
    await productsCollectionObj.insertOne(newProduct)
    //send res
    res.send({message:"created product"})
})

//route to update a product
productApp.put("/products",async(req,res)=>{
    //get productCollectionObj
    const productsCollectionObj=req.app.get("productsCollectionObj");
    //get product obj req body
    const modifiedProduct=req.body;
    //update 
    let dbRes=await productsCollectionObj.updateOne({id:modifiedProduct.id},{$set:{...modifiedProduct}});
    console.log(dbRes);
    if(dbRes.modifiedCount===1){
        res.send({message:"product updated"})
    }else{
        res.send({message:"product not modified"})
    }
})
module.exports=productApp;