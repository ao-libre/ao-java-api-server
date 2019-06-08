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
               pattern: "^[^@\s]+@[^@\s]+\.[^@\.\s]+$",
               bsonType: "string",
               description: "must be a valid email and is required"
            },
            salt: {
               bsonType: "string",
               description: "must be a string and is required"
            },
         }
      }
   }
})

db.users.createIndex( { email: 1 }, { unique: true } )
db.users.createIndex( { nickname: 1 }, { unique: true } )


var userSchema = {
   "type": "object",
   "properties": {
     "nickname": { "type": "string" },
     "email": { "type": "string" },
     "salt": { "type": "string" },
     "password": { "type": "string" },
   }
}