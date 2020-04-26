const mongoose = require('mongoose');
const subscriberSchema = new mongoose.Schema({
  name:{
      type:String,
      required:true

  },
  subscriberToChannel:{
    type:String,
    required:true
  },
  subscriberDate:{
      type:Date,
      required:true,
      default:Date.now()
  }
},{
    timestamps:true
})

module.exports=mongoose.model("Subscribers",subscriberSchema);