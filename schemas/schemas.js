db.createCollection("users", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "nickname", "email", "password", "salt" ],
         properties: {
            nickname: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            password: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            email: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            salt: {
               bsonType: "string",
               description: "must be a string and is required"
            },
         }
      }
   }
})

db.createCollection( "contacts",
   { validator: { $or:
      [
         { email: { $regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/} },
      ]
   }
} )
