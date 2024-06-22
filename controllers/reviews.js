
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async(_req,_res)=>{
    let listing = await  Listing.findById(_req.params.id);
    let newReview = new Review(_req.body.review);
    newReview.author = _req.user._id;
    console.log(newReview)
     listing.reviews.push(newReview);
     await newReview.save();
     await listing.save();
    
    //  console.log("new review saved");
    //  _res.send("new reivew send ");
    _res.redirect(`/listings/${listing._id}`);
    }

    module.exports.destroyReview =  async( req,res)=>{
        let {id , reviewId} = req.params;
         
        await Listing.findByIdAndUpdate(id,{$pull:{reviews :reviewId}});
       await  Review.findByIdAndDelete(reviewId);
       req.flash("success","Delted review")
       res.redirect(`/listings/${id}`);
    }