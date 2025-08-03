// import the model
const session = require("express-session")
const Destination = require("../models/destination")
// import the router
const router = require("express").Router()
const isSignedIn = require("../middleware/isSignedIn")



// write your routes

router.get("/new",isSignedIn,async(req,res)=>{
    const allDestination= await Destination.find()
    res.render("destinations/new.ejs",{allDestination: allDestination,user:req.session.user})
})
router.post("/",isSignedIn, async (req, res) => {
  try {
    
await Destination.create({
  name: req.body.name,
  country: req.body.country,
  visited: req.body.visited === 'on',
    userId: req.session.user._id,
  description: req.body.description,
  category: req.body.category,
  image: req.body.image,
  datePlanned: req.body.datePlanned,
});

    res.redirect("/destinations/new")
  } catch (error) {
    console.error(err);
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
           console.error(err);
    }
})
router.get("/:id/edit", async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    res.render("destinations/edit.ejs", { destination });
  } catch (err) {
   console.error(err);
  }
})

router.put("/:id", async (req, res) => {
  try {
    await Destination.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      country: req.body.country,
      visited: req.body.visited === "on",
      description: req.body.description,
      category: req.body.category,
      image: req.body.image,
      datePlanned: req.body.datePlanned ? new Date(req.body.datePlanned) : null
    });
    res.redirect("/destinations/list");
  } catch (err) {
     console.error(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Destination.findByIdAndDelete(req.params.id);
    res.redirect("/destinations/list");
  } catch (err) {
      console.error(err);
  }
})


module.exports = router
