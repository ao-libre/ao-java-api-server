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
               bsonType: "array",
               required: [
                  "name",
                  "head",
                  "class",
                  "race",
                  "genre",
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
                  "date-created": {
                     bsonType: "string",
                     description: "must be a string and is required"
                  },

                  stats: {
                     bsonType: "array",
                     required: ["name", "quantity"],
                     properties: {
                        name: {
                           bsonType: "string",
                           description: "must be a string and is required"
                        },
                        quantity: {
                           bsonType: "int",
                           description: "must be a integer and is required"
                        }
                     }
                  },

                  spells: {
                     bsonType: "array",
                     required: ["id", "position"],
                     properties: {
                        id: {
                           bsonType: "int",
                           description: "must be a integer and is required"
                        },
                        position: {
                           bsonType: "int",
                           description: "must be a integer and is required"
                        }
                     }
                  },

                  items: {
                     bsonType: "array",
                     required: ["id", "quantity"],
                     properties: {
                        id: {
                           bsonType: "int",
                           description: "must be a integer and is required"
                        },
                        quantity: {
                           bsonType: "int",
                           description: "must be a integer and is required"
                        },
                        equipped: {
                           type: "boolean",
                           description: "must be a boolean"
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
db.users.createIndex({ "characters.name": 1 }, { unique: true, partialFilterExpression: { "characters.name": { $type: "string" } } })
