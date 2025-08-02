// import the model
const Book = require("../models/Book")
const Destination = require("../models/destination")
// import the router
const router = require("express").Router()



// write your routes

router.get("/new",async(req,res)=>{
    const allDestination= await Destination.find()
    res.render("destination/new.ejs",{allDestination: allDestination})
})

router.post("/",async(req,res)=>{
    try{
        await Book.create(req.body)
        res.redirect("/books/new")
    }
    catch(error){
        console.log(error)
    }
})
