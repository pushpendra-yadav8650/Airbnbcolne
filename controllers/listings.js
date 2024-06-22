const Listing = require("../models/listing.js")

module.exports.index = async(_req,res)=>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
 
 };
 //form render 
module.exports.formrender = (_req,_res)=>{
    _res.render("listings/new.ejs")
}
//show listing 
 module.exports.showListing = (async (_req,_res)=>{
    let{ id} = _req.params;
   const listing = await Listing.findById(id).populate(
       {path:"reviews", 
       populate:{ path:"author",}
        })
       .populate("owner");
   if(!listing){
     _req.flash("error","Listing you requested for does not exist");
     _res.redirect("/listings")
   }
   console.log(listing)
   _res.render("listings/show.ejs",{ listing })
});
//Create Listing 
module.exports.createListing = (async(_req,_res, _next)=>{
    let url = _req.file.path;
    let filename = _req.file.filename;
    const newListing = new Listing(_req.body.listing);
    newListing.owner= _req.user._id;
    newListing.image = { url, filename};
    await newListing.save();
    _req.flash("success","New Listing Created ")
    _res.redirect("/listings");
  });
//Edit lisiting 
module.exports.editListing =async(_req,_res)=>{
    let {id} = _req.params;
    const listing = await Listing.findById(id);
    if(!listing){
     _req.flash("error","Listing you requested for does not exist");
     _res.redirect("/listings")
   }
   let orginalImageUrl = listing.image.url;
   orginalImageUrl = orginalImageUrl.replace("/upload","/upload/h_300, w_250");
    _res.render("listings/edit.ejs",{ listing , orginalImageUrl});

    
}

//update listing 
module.exports.updateListing = async(_req,_res)=>{
    
    let { id } = _req.params;
  let listing = await Listing.findByIdAndUpdate(id,{..._req.body.listing});
 if( typeof _req.file !== "undefined"){
  let url = _req.file.path;
  let filename = _req.file.filename;
  listing.image ={ url , filename};
  await listing.save();
}
   _req.flash("success","Updated Listing ")
    _res.redirect(`/listings/${id}`);
};

//delete listing
module.exports.deleteListing = async(_req,_res)=>{
    let {id}= _req.params;
     deletedListing = await Listing.findByIdAndDelete(id);
     console.log(deletedListing);
     _req.flash("success","Delted listings ")
     _res.redirect("/listings")

}