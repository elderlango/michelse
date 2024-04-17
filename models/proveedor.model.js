const mongoose=require("mongoose")

const proveedorSchema = new mongoose.Schema({
  Idproveedor: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  nombre: {
    type: String,
    required: true,
  },

  apellido: {
    type: String,
    required: true,
  },

  empresa: {
    type: String,
    required: true,
  },

  telefono: {
    type: String,
    required: true,
  },

  correo: {
    type: String,
    required: true,
  },

  estatus: {
    type: Boolean,
    required: true,
  },
}, { timestamps: true });
//Es para especificarle a mongoose cual es nuestro modelo
const Proveedor=new mongoose.model('Proveedor',proveedorSchema)

module.exports=Proveedor