
const express = require("express");
const router = express.Router(); 



//user routes 
router.get("/",(req,res)=>{
    res.send("GET fot show users");
})
router.get("/:id",(req,res)=>{
    res.send("GET for show users id ");
})
router.post("/",(req,res)=>{
    res.send("POST for show users");
})

router.delete("/:id",(req,res)=>{
    res.send("delete for users id");
})

module.exports = router