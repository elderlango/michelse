const jwt = require("jsonwebtoken");
//const { TOKEN_SECRET } = require("../config/config");
const TOKEN_SECRET = 'utd1234';

const authRequired = (req, res, next) => {
    
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).send({ message: "No autorizado" });
  }

  console.log()
  jwt.verify(token, TOKEN_SECRET, (error, user) => {
    if (error) {
      return res.status(403).send({ message: "Token invalido" });
    }
    req.user = user;
    next();
  });
  
};

module.exports=authRequired