const express = require("express");
const router  = express.Router();
const wrapAsync =require("../utils/wrapAsync.js");
const Listing =  require("../models/listing.js");
const ListingController = require("../controllers/listings.js")
//image upload packages required
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })

const ExpressError =require("../utils/ExpressError.js");
const { isLoggedIn,isOwner ,validateListing,} = require("../middalware.js");

router
.route("/")
.get(wrapAsync(ListingController.index))
.post(isLoggedIn,
     upload.single("listing[image]"),
     validateListing,
    wrapAsync(ListingController.createListing)
);

// create New Route
router.get("/new", isLoggedIn ,(ListingController.formrender));

router
.route("/:id")
.get(wrapAsync(ListingController.showListing))
.put(isLoggedIn,isOwner ,upload.single("listing[image]"),validateListing,wrapAsync(ListingController.updateListing)
)
//deletel route
.delete(isLoggedIn ,wrapAsync(ListingController.deleteListing));
 
 //Edit the Route
 router.get("/:id/edit",isLoggedIn, isOwner ,wrapAsync(ListingController.editListing)
 );

 
 

 module.exports = router;