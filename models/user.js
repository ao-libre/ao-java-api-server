//Comandos utiles para usar en Mongo DB
// db.adminCommand( { listDatabases: 1 } )

// db.users.insertOne({
//   nickname: "canvas",
//   salt: "!23",
//   password: "44443",
//   email: "cotton@sd.com"
// })

// db.users.find({
//   nickname: "juancito232",
// })

// db.users.find() = Select * from users
const sha256 = require("js-sha256");
const crypto = require("crypto");

exports.createNewUser = function(req, res) {
  const { nickname, passwordPlain, email } = req.body;

  const salt = crypto.randomBytes(16).toString("base64");
  const passwordEncrypted = sha256(passwordPlain + salt);

  mongodb.users.save(
    {
      nickname,
      password: passwordEncrypted,
      email,
      salt
    },
    function(error, value) {
      if (error && error.code === 11000)
        return res.status(409).send("Ya existe un usuario con el nickname o email utilizado");
      if (error) return res.status(500).json(error);

      console.info("Se registro un nuevo usuario: " + email);
      return res.status(200).json(value);
    }
  );
};

exports.loginUser = function(req, res) {
  const { email, passwordPlain } = req.body;

  mongodb.users.findOne(
    {
      email: email
    },
    function(error, user) {
      if (error) return res.status(500).json(error);
      if (!user) return res.status(409).send("No existe una cuenta con ese email");

      const passwordEncrypted = sha256(passwordPlain + user.salt);

      if (user.password === passwordEncrypted) {
        console.info("Se logeo con exito usuario: " + email);
        return res.status(200).json(user);
      } else {
        console.info("Las credenciales no son validas: " + email);
        return res.status(401).send("Las credenciales no son validas");
      }
    }
  );
};
