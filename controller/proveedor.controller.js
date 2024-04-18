
//------------------------------------------------------PRODUCTOS-------------------------------------------------------------------
const Producto = require("./models/producto.model.js")
const Proveedore = require("./models/proveedor.model.js");

app.post("/crearProducto", async (req, res) => {
    try {
      const { codigo, nombre, descripcion, fecha_creacion, estatus, Proveedor } = req.body;
  
      const name = req.body.Proveedor; 
      const checks = await Proveedore.findOne({ Idproveedor: name});
       if (!checks) {
        return res.send("El proveedor no existe(editar Producto)");
      }
  
      const newProductos = new Producto({ codigo, nombre, descripcion, fecha_creacion, estatus, Proveedor });
      await newProductos.save();
      res.status(201).render("productos", {
        naming: req.body.name,
      });
    } catch (error) {
      res.send("incorrectos inputs");
      console.log("Error:", error);
    }
  });
  

app.post("/editarProducto", async (req, res) => {
    try {
      const { codigo,nombre, descripcion,fecha_creacion, estatus,Proveedor } = req.body;
      console.log("req body:", req.body);
  
      const name = req.body.codigo; 

      const check = await Producto.findOne({ codigo: name});
      console.log(check);
      if (check) {
      check.nombre = nombre;
      check.descripcion = descripcion;
      check.fecha_creacion = fecha_creacion;
      check.estatus = estatus;
      check.Proveedor = Proveedor;
      await check.save();
      }
      else{
        res.send("no existe producto");
      }
      
      //const newProductos = new Producto({codigo,nombre,descripcion,fecha_creacion,estatus,Proveedor});
     //const savedUser = await newProductos.save();
      res.status(201).render("productos", {
        naming: req.body.name,
      });
    } catch (error) {
      res.send("incorrectos inputs");
      console.log("Error:", error);
    }
  });

  app.post("/borrarProducto", async (req, res) => {
    try {
      //console.log("req body:", req.body);
  
      const name = req.body.codigo; 

      const check = await Producto.findOne({ codigo: name});
      console.log(check);
      if (check) {
      check.estatus = false;
      check.fecha_elimininacion = Date.now();

      await check.save();
      }
      else{
        res.send("no existe producto");
      }
      
      //const newProductos = new Producto({codigo,nombre,descripcion,fecha_creacion,estatus,Proveedor});
     //const savedUser = await newProductos.save();
      res.status(201).render("productos", {
        naming: req.body.name,
      });
    } catch (error) {
      res.send("incorrectos inputs");
      console.log("Error:", error);
    }
  });

  app.get("/productosGet", async (req, res) => {
    try {
      // Consultar todos los proveedores en la base de datos
      const proveedores = await Producto.find({ estatus: true });
      res.status(200).json(proveedores); // Enviar la lista de proveedores como respuesta
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los proveedores" });
    }
  });