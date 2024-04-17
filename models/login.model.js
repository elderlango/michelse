const mongoose=require("mongoose")

const logInSchema=new mongoose.Schema({
  name:{
      type:String,
      required:true
  },
  password:{
      type:String,
      required:true
  },
  token: {
      type: String,
      default: null,
    },
})

const Login=new mongoose.model('LogInCollection',logInSchema)

module.exports=Login