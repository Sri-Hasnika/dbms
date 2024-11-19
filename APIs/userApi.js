//create mini express app
// const exp=require('express')
// const userApp=exp.Router()


//create user api



//create mini express app
const exp = require("express");
const userApp = exp.Router();

//add body parser middleware
userApp.use(exp.json());

//create USER REST API(routes)

//route to handle get users
userApp.get("/users", async (req, res) => {
  //get usersCollectionObj
  const usersCollectionObj = req.app.get("usersCollectionObj");
  //get users from db (find() returns db cursor, convert cursor to array using toArray())
  const usersList = await usersCollectionObj.find().toArray();
  //send res
  res.send({ message: "users", payload: usersList });
});

//route to handle get a user by id(URL param)
userApp.get("/users/:id", async (req, res) => {
  //get usersCollectionObj
  const usersCollectionObj = req.app.get("usersCollectionObj");

  //get id from url
  const userId = Number(req.params.id);
  //find user by id
  const userObj = await usersCollectionObj.findOne({ id: userId });
  //send res
  res.send({ message: "user", payload: userObj });
});

//route to handle create user
userApp.post("/user", async (req, res) => {
  //get usersCollectionObj
  const usersCollectionObj = req.app.get("usersCollectionObj");
  //get user obj from req.body
  const newUser = req.body;
  //insert into db
  await usersCollectionObj.insertOne(newUser);
  //send res
  res.send({ message: "User created" });
});

//route to handle update user
userApp.put("/user", async (req, res) => {
  //get usersCollectionObj
  const usersCollectionObj = req.app.get("usersCollectionObj");
  //get modified user obj from req.body
  const modifiedUser = req.body;
  //update
  let dbRes = await usersCollectionObj.updateOne(
    { id: modifiedUser.id },
    { $set: { ...modifiedUser } }
  );
  console.log(dbRes);
  if (dbRes.modifiedCount === 1) {
    res.send({ message: "User updated" });
  } else {
    res.send({ message: "User not modified" });
  }
});

//route to handle delete a user by id
userApp.delete("/users/:id", async (req, res) => {
  //get usersCollectionObj
  const usersCollectionObj = req.app.get("usersCollectionObj");
  //get id from url
  const userId = Number(req.params.id);
  //delete
  let dbRes = await usersCollectionObj.deleteOne({ id: userId });
  console.log(dbRes);
  if (dbRes.deletedCount === 1) {
    res.send({ message: "User deleted" });
  } else {
    res.send({ message: "No user deleted" });
  }
});

module.exports = userApp;




































// //route to handle get users
// userApp.get('/users',(req,res)=>{
//     res.send({message:"all users",payload:users})
// })
// //route to handle get users by id

//     userApp.get('/users/:id',(req,res)=>{
//     //get id from url
// const param=Number( req.params.id);
//     //search user with this id
// let result=users.find(user=>user.id===param)
// //if user not found
// if(result===undefined){
//     res.send({message:"user not found"})
// }
// else{
//     res.send({message:"user",payload:result})
// }
// })

// //route to create user
// userApp.post('/user',(req,res)=>{
//     //get user obj from req
//     let newUser=req.body
//     console.log(newUser)
// })


// //route to update user
// userApp.put('/user/:id',(req,res)=>{
//     let modifiedUser=req.body;
//     //find and replace user
//     let result=users.findIndex(user=>user.id===modifiedUser.id)
//     if(result===-1){
//         res.send({message:"User not found"})
//     }
//     else{
//         users.splice(result,1,modifiedUser)
//         res.send({message:"User modified"})
//     }
// })


// //delete a user
// userApp.delete('/users/:id',(req,res)=>{
//     let paramId=Number(req.params.id)
//     //find index of user matching
//     let userIndex=users.findIndex(user=>user.id===modifiedUser.id)
//     //if user not found
//     if(userIndex===-1){
//         res.send({message:"User not found to delete"})
//     }
//     else{
//         users.splice(userIndex)
//     }
// })

// module.exports=userApp;