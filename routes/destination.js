// import the model
const Destination = require("../models/destination")
// import the router
const router = require("express").Router()



// write your routes

router.get("/new",async(req,res)=>{
    const allDestination= await Destination.find()
    res.render("destinations/new.ejs",{allDestination: allDestination})
})

router.post("/",async(req,res)=>{
    try{
        await Book.create(req.body)
        res.redirect("/destinations/new")
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router
