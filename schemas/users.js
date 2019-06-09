db.createCollection("users", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["nickname", "email", "password", "salt"],
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
            characters: {
               bsonType: "object",
               required: [
                  "name",
                  "head",
                  "class",
                  "race",
                  "genre",
                  "agility",
                  "charisma",
                  "constitution",
                  "inteligence",
                  "strength",
                  "level"
               ],
               properties: {
                  name: {
                     bsonType: "string",
                     description: "must be a string and is required"
                  },
                  description: {
                     bsonType: "string",
                     description: "must be a string and is required"
                  },
                  head: {
                     bsonType: "int",
                     description: "must be a integer and is required"
                  },
                  class: {
                     bsonType: "string",
                     description: "must be a string and is required"
                  },
                  race: {
                     bsonType: "string",
                     description: "must be a string and is required"
                  },
                  genre: {
                     bsonType: "string",
                     description: "must be a string and is required"
                  },
                  agility: {
                     bsonType: "int",
                     description: "must be a integer and is required"
                  },
                  charisma: {
                     bsonType: "int",
                     description: "must be a integer and is required"
                  },
                  constitution: {
                     bsonType: "int",
                     description: "must be a integer and is required"
                  },
                  intelligence: {
                     bsonType: "int",
                     description: "must be a integer and is required"
                  },
                  strength: {
                     bsonType: "int",
                     description: "must be a integer and is required"
                  },
                  "time-online": {
                     bsonType: "int",
                     description: "must be a integer and is required"
                  },
                  gold: {
                     bsonType: "int",
                     description: "must be a integer and is required"
                  },
                  level: {
                     bsonType: "int",
                     description: "must be a integer and is required"
                  },
                  "experience-obtained": {
                     bsonType: "int",
                     description: "must be a integer and is required"
                  },
                  "experience-for-next-level": {
                     bsonType: "int",
                     description: "must be a integer and is required"
                  },
                  online: {
                     type: "boolean",
                     description: "must be a boolean and is required"
                  },
                  "home-town": {
                     bsonType: "string",
                     description: "must be a string and is required"
                  },

                  items: {
                     bsonType: "array",
                     required: ["id", "quantity"],
                     properties: {
                        "id": {
                           bsonType: "int",
                           description: "must be a integer and is required"
                        },
                        "quantity": {
                           bsonType: "int",
                           description: "must be a integer and is required"
                        }
                     }
                  },

                  position: {
                     bsonType: "object",
                     required: ["position-x", "position-y", "map"],
                     properties: {
                        "position-x": {
                           bsonType: "int",
                           description: "must be a integer and is required"
                        },
                        "position-y": {
                           bsonType: "int",
                           description: "must be a integer and is required"
                        },
                        "map": {
                           bsonType: "int",
                           description: "must be a integer and is required"
                        }
                     }
                  },

                  deaths: {
                     bsonType: "object",
                     required: ['characters', 'npcs'],
                     properties: {
                        characters: {
                           bsonType: "int",
                           description: "must be a integer and is required"
                        },
                        npcs: {
                           bsonType: "int",
                           description: "must be a integer and is required"
                        }
                     }
                  }

               }
            }
         }
      }
   }
})

db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ nickname: 1 }, { unique: true })
db.users.createIndex({ "character.name": 1 }, { unique: true })


var userSchema = {
   "type": "object",
   "properties": {
      "nickname": { "type": "string" },
      "email": { "type": "string" },
      "salt": { "type": "string" },
      "password": { "type": "string" },
      "characters": {
         "type": "array",
         "properties": {
            "name": { "type": "string" },
            "description": { "type": "string" },
            "head": { "type": "integer" },
            "class": { "type": "string" },
            "race": { "type": "string" },
            "genre": { "type": "string" },
            "agility": { "type": "integer" },
            "charisma": { "type": "integer" },
            "constitution": { "type": "integer" },
            "intelligence": { "type": "integer" },
            "strength": { "type": "integer" },
            "time-online": { "type": "integer" },
            "gold": { "type": "integer" },
            "level": { "type": "integer" },
            "experience-obtained": { "type": "integer" },
            "experience-for-next-level": { "type": "integer" },
            "online": { "type": "boolean" },
            "home-town": { "type": "string" },

            "position": {
               "type": "object",
               "required": ["position-x", "position-y", "map"],
               "properties": {
                  "position-x": { "type": "integer" },
                  "position-y": { "type": "integer" },
                  "map": { "type": "integer" }
               }
            },

            "items": {
               "type": "array",
               "required": ["id", "quantity"],
               "properties": {
                  "id": { "type": "integer" },
                  "quantity": { "type": "integer" }
               }
            },

            "deaths": {
               "type": "object",
               "required": ["npcs", "characters"],
               "properties": {
                  "npcs": { "type": "integer" },
                  "characters": { "type": "integer" }
               }
            }
         }
      }
   }
}