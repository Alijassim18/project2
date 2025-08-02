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
     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' ,require:true},
       description: {
    type: String
  },
  category: {
    type: String,
    enum: ['Beach', 'City', 'Desert', 'Other'],
    default: 'Other'
  },
  image: {
    type: String
  },
  datePlanned: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

// model
const Destination = mongoose.model("Destination",destinationSchema)


// export the model
module.exports = Destination