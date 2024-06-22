const User = require("../models/user.js")

module.exports.singupFormrender = (req,res)=>{
    res.render("users/singup.ejs");
}

//singup
module.exports.singup = async(req,res)=>{
    try{
        let {username , email , password} = req.body;
        const newUser = User({email , username});  
         const registerUser =await User.register( newUser , password); 
         console.log(registerUser)  ;
         req.login( registerUser,(err)=>{// singup after just login perfomr this method 
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to wonderlist ")
            res.redirect("/listings");
         })
        
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/singup");
    }
   
}

//Login render 

module.exports.loginrender = (req,res)=>{
    res.render("users/login.ejs")
}

module.exports.login =  async(req,res)=>{
    req.flash("success"," Welcome to  wanderlist ! You are logged in ! ")
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect( redirectUrl);

}
//logout

module.exports.logout =(req,res)=>{
    req.logout((err)=>{
        if(err){
           return  next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listings");
    })
}