var characterSchema = {
    "type": "object",
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
          "minItems": 0,
          "maxItems": 100,
          "required": ["id", "quantity"],
          "properties": {
             "id": { "type": "integer" },
             "quantity": { "type": "integer" }
          }
       },
 
       "deaths": {
          "type": "object",
          "required": ["npcs", "users"],
          "properties": {
             "npcs": { "type": "integer" },
             "users": { "type": "integer" }
          }
       } 
    }
 }