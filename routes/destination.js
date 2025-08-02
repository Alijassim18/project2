// import the model
const session = require("express-session")
const Destination = require("../models/destination")
// import the router
const router = require("express").Router()
const isSignedIn = require("../middleware/isSignedIn")



// write your routes

router.get("/new",async(req,res)=>{
    const allDestination= await Destination.find()
    res.render("destinations/new.ejs",{allDestination: allDestination,user:req.session.user})
})
router.post("/",isSignedIn, async (req, res) => {
  try {
    await Destination.create({
      name: req.body.name,
      country: req.body.country,
      visited: req.body.visited === "on",
      userId: req.session.user._id,
    });
    res.redirect("/destinations/new")
  } catch (error) {
    console.log(error);
    res.send("Error creating destination")
  }
})


router.get("/list", isSignedIn, async (req, res) => {
    try {
        const userId = req.session.user._id
        const destinations = await Destination.find({ userId: userId })
        
        res.render("destinations/list-des.ejs", {
            destinations: destinations,
            user: req.session.user,
        });
    } catch (error) {
        console.log(error);
        res.send("Error retrieving destinations")
    }
});

module.exports = router
