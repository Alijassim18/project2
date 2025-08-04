const mongoose=require("mongoose")


const userSchema= new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
})


// model
const User = mongoose.model("User",userSchema)


// export the model
module.exports = User