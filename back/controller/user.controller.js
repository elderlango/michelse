const User = require('../models/user.model.js');
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Login = require('../models/login.model.js');

const signUpUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    //console.log("req body:", req.body);
    const passwordHash = await bcryptjs.hash(password, 10);

    const newUser = new Login({
      name,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    res.status(201).render("login", {
      naming: req.body.name,
    });
  } catch (error) {
    res.send("incorrectos inputs");
    console.log("Error:", error);
  }
};

const LoginUser =  async (req, res) => {
  try {
    //console.log("req body:", req.body);
    const check = await User.findOne({ name: req.body.name });
    //console.log(check);
    //console.log("Stored hashed password:", check.password);
    const passwordMatch = await bcryptjs.compare(req.body.password, check.password);
    //console.log("Password match:", passwordMatch);
    if (passwordMatch) {
        const token = await createToken(check);
        res.cookie("token", token, { maxAge: 86400000, httpOnly: true }); 
        res.status(201).render("home", { name: `${req.body.name}`, naming: `${req.body.name}` }); 
        //res.status(201).render("home", { name: `${req.body.name}`, naming: `${req.body.password}+${req.body.name}` }); 
    } else {
      res.send("contrasena incorrecta");
    }

    if (!check) {
      console.log('errrrrrrrrrrrr1')
      res.send(" usuario incorrectos");
      if (!passwordMatch ) {
        console.log('errrrrrrrrrrrr2')
        res.send("contrasena incorrectos");
  
    }
  }
  } catch (e) {
    res.send("Error durante login");
  }
};

const LoginOutUser =  async (req, res) => {
    try {
      const name = req.body.name; // Retrieve the user's name from the request body
      const check = await User.findOne({ name: name});
          check.token = null; // Set the token to null
      await check.save();
      res.cookie('token',"",{
        expires:new Date(0)});
      res.render("login");
    } catch (e) {
      res.status(500).send("Error durante logout");
    }
  };

function createToken(check) {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await jwt.sign(
          {
            name: check.name,
            password: check.password,
          },
          "utd1234",
          {
            expiresIn: "1d",
          }
        );
        check.token = token;
        await check.save(); 
        resolve(token);
      } catch (error) {
        reject(error);
      }
    });
  }
  



module.exports = {
  signUpUser,
  LoginUser,
  LoginOutUser,
};

