const mongoose=require('mongoose')


const destinationSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    country:{
        type:String,
        require:true 
    },
    visited:{
        type:Boolean,default:false
    },
     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

// model
const Destination = mongoose.model("Destination",destinationSchema)


// export the model
module.exports = Destination