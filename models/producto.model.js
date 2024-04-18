const mongoose=require("mongoose")

const productoSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  nombre: {
    type: String,
    required: true,
  },

  descripcion: {
    type: String,
    required: true,
  },

  fecha_creacion: {
    type: Date,
    required: true,
  },

  estatus: {
    type: Boolean,
    required: true,
  },

  Proveedor: {
    type: String,
    required: true,
  },
  fecha_elimininacion: {
    type: Date,
    default: null,
  },
}, { timestamps: true },
);
//Es para especificarle a mongoose cual es nuestro modelo
const Producto=new mongoose.model('Producto',productoSchema)

module.exports=Producto