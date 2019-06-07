//Comandos utiles para usar en Mongo DB
// db.adminCommand( { listDatabases: 1 } )

// db.users.insertOne({ 
//   nickname: "canvas", 
//   salt: "!23", 
//   password: "44443", 
//   email: "cotton@sd.com"
// })

// db.users.find({ 
//   nickname: "canvas", 
// })

// db.users.find() = Select * from users
const sha256 = require('js-sha256');
const crypto = require('crypto');

exports.registerNewUser = function(req, res) {
  const nickname = req.body.nickname
  const passwordPlain = req.body.password
  const email = req.body.email
  const salt = crypto.randomBytes(16).toString('base64');

  const passwordEncripted = sha256(passwordPlain + salt)

  mongodb.users.save({
    nickname,
    password: passwordEncripted,
    email,
    salt,
  }, function (error, value) {
    if (error) return res.status(500).json(error);

    console.info("Se registro un nuevo usuario: " + email)
    return res.status(200).json(value)
  });
};

exports.loginUser = function(req, res) {
  const email = req.body.email
  const passwordPlain = req.body.password
  

  mongodb.users.findOne({
    email: email,
  }, function (error, user) {
    if (error) return res.status(500).json(error);

    const passwordEncripted = sha256(passwordPlain + user.salt);

    if (user.password === passwordEncripted) {
      console.info("Se logeo con exito usuario: " + email)
      return res.status(200).json(user)
    } else {
      console.info("Las credenciales no son validas: " + email)
      return res.status(200).send("Las credenciales no son validas")
    }
  })
  
