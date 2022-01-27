// const express=require('express');
// const router=express.Router();
// const jwt=require("jsonwebtoken");
// const jwtSecret="asd889asdas5656asdas887";
// const loginModel=require('../db/loginSchema');
// router.get("/fetchpost",(req,res)=>{
//     //read data from post.json file 
//      let data=[
//          {"id":1,"pname":"A","description":"bla bla bla"},
//          {"id":2,"pname":"B","description":"bla bla bla"},
//          {"id":3,"pname":"C","description":"bla bla bla"},
//          {"id":4,"pname":"D","description":"bla bla bla"}
//      ];
//     //res.send("Fetch Post Call");
//     res.json({"err":0,'pdata':data})
// })
// router.post("/addpost",(req,res)=>{
//     let pname=req.body.pname;
//     let description=req.body.description;
//     //store data or append data in post.json
//     res.json({"err":0,"msg":"Post Save"});
// })
// router.post("/signup",(req,res)=>{
//     let name=req.body.name;
//     let email=req.body.email;
//     let mobile=req.body.mobile;
//     let address=req.body.address;
//     //store data or append data in post.json
//     let ins=new loginModel({name:name,email:email,mobile:mobile,address:address});
//     ins.save((err)=>{
//         if(err){
//             res.json({"err":1,'msg':'Not Registered'})
//         }
//         else {
//             res.json({"err":0,'msg':'Registered'})
//         }
//     })
// })
// router.post("/login",(req,res)=>{
//     let email=req.body.email;
//     let password=req.body.password;
//     loginModel.findOne({email:email,password:password},(err,data)=>{
//         if(err){
//             res.json({"err":1,"msg":"Email or password is not correct"})
//         }
//         else if(data==null)
//         {
//             res.json({"err":1,"msg":"Email or password is not correct"})
//         }
//         else {
//             let payload={
//                 uid:email
//             }
//             const token=jwt.sign(payload,jwtSecret,{expiresIn:360000})
//             res.json({"err":0,"msg":"Login Success","token":token})
//         }
//     })
// })
// module.exports=router;