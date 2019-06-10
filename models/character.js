function createCharacterJson(req) {
	const itemsWithIntegerValues = req.body.items.map(el => {
		return {
			id: parseInt(el.id),
			quantity: parseInt(el.quantity)
		}

	})

	return {
		name: req.body.name,
		description: req.body.description,
		head: parseInt(req.body.head),
		class: req.body.class,
		race: req.body.race,
		genre: req.body.genre,
		agility: parseInt(req.body.agility),
		charisma: parseInt(req.body.charisma),
		constitution: parseInt(req.body.constitution),
		intelligence: parseInt(req.body.intelligence),
		strength: parseInt(req.body.strength),
		gold: parseInt(req.body.gold),
		level: parseInt(req.body.level),
		items: itemsWithIntegerValues
	}
}

exports.createNewCharacter = function (req, res) {
	const newCharacter = createCharacterJson(req)

	mongodb.users.findAndModify({
		query: { email: req.body.email },
		update: { $push: { characters: newCharacter } },
	}, function (error, user, lastErrorObject) {
		if (error) return res.status(500).json(error);

		if (!user) {
			res.status(500).send("No existe el usuario con el email: " + req.body.email);
		}

		console.info("Se creo un nuevo personaje con el nombre: " + req.body.name)
		return res.status(200).json(newCharacter)
	})

}
