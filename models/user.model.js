const mongoose=require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  edad: {
    type: String,
    required: true,
  },

  fechaNacimiento: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  phone: {
    type: Number,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },
});

//Es para especificarle a mongoose cual es nuestro modelo
const User=new mongoose.model('User',userSchema)

module.exports=User
