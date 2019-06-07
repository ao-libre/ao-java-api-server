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


exports.registerNewUser = function(req, res) {
  let nickname = req.body.nickname
  let password = req.body.password
  let email = req.body.email
  let salt = req.body.salt

  mongodb.users.save({
    nickname,
    password,
    email,
    salt,
  }, function (error, value) {
    if (error) return res.status(500).json(error);

    console.info("Se registro un nuevo usuario: " + email)
    return res.status(200).json(value)
  });
};
