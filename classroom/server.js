const express = require("express");
const app = express();
// const cookieParser = require('cookie-parser')
const session = require('express-session');
const flash = require("connect-flash");
const path = require("path")

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


// const users = require("./routes/user")
// const posts = require("./routes/posts")

const sessionOption = { 
    secret :" mysupersecretstring",
    resave: false  ,
    saveUninitialized : true 
 }
app.use(flash());
app.use(session(sessionOption));

app.use((req,res,next)=>{
    res.locals.messages = req.flash("success")
    res.locals.error = req.flash("error");
    next();
})

app.get("/register",(req,res)=>{
    let { name = "anonymous"} = req.query;

    req.session.name = name ;
    if( name  === "anonymous"){
        req.flash("error","user not registered ")
    }else{
        req.flash("success","user register success fully!");
    }
    
   
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
   res.render("page.ejs",{ name :req.session.name})
})

// app.get("/reqcount",(req,res)=>{
//     if( req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//     res.send(` You sent a request ${req.session.count } times  `)
// })

// app.use(cookieParser("secretcode "));

// app.get("/getsingcookie",(req,res)=>{
//     res.cookie("color","green",{ signed: true})
//     res.send("cookies was sent ")
    
// });
// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("verified  ")
// })

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","hello");
//     res.send("sent you some cookies ");
// })
// app.get("/greet",(req,res)=>{
//     let { name = "anonymous "} = req.cookies;
//     res.send(`hi, ${ name }`)
// })
app.get("/",(req,res)=>{
    console.dir(req.cookies)
    res.send("hii i am root");
})


// app.use("/users",users); //all router is match the all router users
// app.use("/posts",posts); //all posts is match the all router posts


app.listen(4000,(req,res)=>{
    console.log("port is start 4000")
})