if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}

const express = require("express");
const  app = express();
const mongoose = require('mongoose');
const Listing =  require("./models/listing.js");
const path = require("path");
const methodOverride= require("method-override");
const ejsmate = require("ejs-mate");
//const MONGO_URL ="mongodb://127.0.0.1:27017/wanderlist";//MongoDb
const dbUrl = process.env.ATLAS_DB;
const ExpressError =require("./utils/ExpressError.js");
const { listingSchema ,reviewSchema} =require("./schema.js");
const Review = require("./models/review.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require("passport")
const LocalStrategy = require("passport-local");
const User = require("./models/user.js")



const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const userRouter = require("./routes/user.js");


main()
.then(()=>{
    console.log("connected to database")
}).catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(dbUrl);
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsmate);
app.use(express.static(path.join(__dirname,"/public")));


const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24*3600,
})
store.on("error",()=>{
    console.log("Error in Mongo stored",err)
})
const sessionOption = {
    store:store,
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized : true ,
    cookie:{
        expires :  Date.now()+ 7*24*60 *60 *1000,
        maxAge:7*24*60 *60 *1000,
        httpOnly:true,
    }


}
// app.get("/",(_req,res)=>{
//     res.send("Hii i am root")
// });


app.use(session(sessionOption))
app.use(flash());

//passport initialize 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));//user autication models local statergty

passport.serializeUser(User.serializeUser());//serialize user in the session 
passport.deserializeUser(User.deserializeUser());



app.use((_req,_res,next)=>{
    _res.locals.success =_req.flash("success");
    _res.locals.error =_req.flash("error");
    _res.locals.currUser = _req.user;
    next();
})

// app.get("/demouser", async (req,res)=>{
//     let fakeuser = new User({
//         email:'pushpendra@gmal.com',
//         username:"delta-studnet"
//     })
//     let registerUser = await  User.register(fakeuser,"Helloworld");//register is a method 
//     res.send(registerUser)
// })

//listing router
app.use("/listings",listings)
//Reviews route
app.use("/listings/:id/reviews",reviews);
//login and singup
app.use("/",userRouter);
//not valid page 
app.all("*",(_req,_res,_next)=>{
    _next(new ExpressError(404," Page Not Found"));
});
//Middaleware haldler 
app.use((_err,_req,_res,_next)=>{
    //_res.send("something went wrong ")
    let {statusCode=500 , message="some thing went wrong" } = _err;
   //_res.status(statusCode).send(message);
   _res.render("error.ejs",{ message })
});

app.listen(8080,()=>{
    console.log("server is listing to port 8080 ");

});
