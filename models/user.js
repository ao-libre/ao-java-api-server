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


exports.registerNewUser = function(req, res) {
  let nickname = req.body.nickname
  let password = req.body.password
  let email = req.body.email
  let salt = req.body.salt

console.log(mongodb)
  mongodb.users.save({
    nickname,
    password,
    email,
    salt,
  });

  console.info("Se registro un nuevo usuario: " + email)
  return res.status(200).send('Se registro un nuevo usuario: ' + email)
};
