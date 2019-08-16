function createCharacterJson(req) {
  const { name, description, head, race, genre, gold, level, items, spells, stats } = req.body;

  let characterJson = {
    name,
    description,
    head: parseInt(head),
    class: req.body.class, // Class keyword cannot be destructured
    race,
    genre,
    gold: parseInt(gold),
    level: parseInt(level),
    created_at: new Date()
  };

  if (items) {
    const itemsWithIntegerValues = items.map(el => {
      return {
        id: parseInt(el.id),
        quantity: parseInt(el.quantity)
      };
    });

    characterJson.items = itemsWithIntegerValues;
  }

  if (spells) {
    const spellsWithIntegerValues = spells.map(el => {
      return {
        id: parseInt(el.id),
        position: parseInt(el.position)
      };
    });

    characterJson.spells = spellsWithIntegerValues;
  }

  if (stats) {
    const statsWithIntegerValues = stats.map(el => {
      return {
        name: el.name,
        quantity: parseInt(el.quantity)
      };
    });

    characterJson.stats = statsWithIntegerValues;
  }

  return characterJson;
}

exports.createNewCharacter = function(req, res) {
  const { email, name } = req.body;
  const newCharacter = createCharacterJson(req);

  //As in MongoDB we can't or i don't know how to perform this in one action
  //First we do a query to get the user account and then I check if there is an user with that name in the account
  //Then we perform a second query to save the character in case it doesn't exist
  //Because if I don't do this verification I can repeate the character.name inside the user
  //Even if "characters.name" is an index.

  mongodb.users.findOne(
    {
      email
    },
    function(error, user) {
      if (error) return res.status(500).json(error);
      if (!user) return res.status(409).send("No existe un usuario con el email: " + email);

      //Verify if the character.name is already in the user account
      if (user && user.characters) {
        const isCharacterInUser = user.characters.find(el => el.name === name);
        if (isCharacterInUser)
          return res.status(409).send("Ya existe un personaje con ese nombre en esta cuenta " + name);
      }

      //If the account does not have any character, initalize the array
      user.characters = user.characters || [];

      user.characters.push(newCharacter);
      mongodb.users.save(user, function(error, doc) {
        if (error && error.code === 11000) return res.status(409).send("Ya existe un personaje con ese nombre");
        if (error) return res.status(500).json(error);

        return res.status(200).json(doc);
      });
    }
  );
};
