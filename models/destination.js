const mongoose=require('mongoose')


const destinationSchema= new mongoose.Schema({
    name:{
        type:string,
        require:true
    },
    country:{
        type:string,
        require:true 
    },
    visited:{
        type:Boolean,default:false
    }
})

// model
const Destination = mongoose.model("Destination",destinationSchema)


// export the model
module.exports = Destination