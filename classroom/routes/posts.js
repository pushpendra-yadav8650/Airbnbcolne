
const express = require("express");
const router = express.Router(); 


//posts

router.get("/",(req,res)=>{
    res.send("GET fot show posts");
})
router.get("/:id",(req,res)=>{
    res.send("GET for show posts id");
})
router.post("/",(req,res)=>{
    res.send("POST for show post");
})

router.delete("/:id",(req,res)=>{
    res.send("delete for users id");
})

module.exports = router
