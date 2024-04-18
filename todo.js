const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const path = require("path");
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin:"http:localhost:5172"}));

const authRequired = require("./middlewares/validateToken.js");
app.use("/", authRequired);

const tempelatePath = path.join(__dirname, "../views");
const publicPath = path.join(__dirname, "../public");
console.log(publicPath);
const User = require("./mongo");

app.set("view engine", "hbs");
app.set("views", tempelatePath);
app.use(express.static(publicPath));

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/home", authRequired,(req, res) => {
  res.render("home");
});


app.get("/productos", authRequired, (req, res) => {
  res.render("productos");
});

app.get("/productosView", authRequired, (req, res) => {
    res.render("productosView");
  });

app.get("/proveedorView", (req, res) => {
    res.render("proveedorView");
  });

app.get("/proveedor", (req, res) => {
    res.render("proveedor");
  });

app.get("/", (req, res) => {
  res.render("login");
});






//------------------------------------------------------PROVEEDOR-------------------------------------------------------------------

app.post("/crearProveedor", async (req, res) => {
  try {
      const { Idproveedor,nombre, apellido,empresa, telefono,correo,estatus } = req.body;
    //console.log("req body:", req.body);

    const newProductos = new Proveedore({Idproveedor,nombre, apellido,empresa, telefono,correo,estatus });
    await newProductos.save();
    res.status(201).render("productos", {
      naming: req.body.name,
    });
  } catch (error) {
    res.send("incorrectos inputs");
    console.log("Error:", error);
  }
});

app.post("/editarProveedor", async (req, res) => {
  try {
    const { Idproveedor,nombre, apellido,empresa, telefono,correo,estatus } = req.body;
    //console.log("req body:", req.body);

    const name = req.body.Idproveedor; 
    const checks = await Producto.findOne({ codigo: name});
    //console.log('producto '+checks);

    const check = await Proveedore.findOne({ Idproveedor: name});
    //console.log(check);
    if (check) {
    check.nombre = nombre;
    check.apellido = apellido;
    check.empresa = empresa;
    check.telefono = telefono;
    check.correo = correo;
    check.estatus= estatus;
    await check.save();
    }
    else{
      res.send("no existe Proveedor(editar Proveedore)");
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

app.get("/proveedoresGet", async (req, res) => {
    try {
      // Consultar todos los proveedores en la base de datos
      const proveedores = await Proveedore.find({ estatus: true });
      res.status(200).json(proveedores); // Enviar la lista de proveedores como respuesta
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los proveedores" });
    }
  });

  app.post("/borrarProveedor", async (req, res) => {
    try {
      const name = req.body.Idproveedor;
      const check = await Proveedore.findOne({ Idproveedor: name });
  
      const productos = await Producto.find({ Proveedor: name });
  
      if (check) {
        if (productos) {
            for (const producto of productos) {
                producto.estatus = false;
                await producto.save();
               // console.log(producto.estatus);
            }
        }
        check.estatus = false;
        await check.save();
        res.status(201).render("proveedor", {
          naming: req.body.name,
        });
      } else {
        res.send("Proveedor no existe");
      }
    } catch (error) {
      res.send("Incorrect inputs");
      console.log("Error:", error);
    }
  });
  