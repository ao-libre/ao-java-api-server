function createCharacterJson(req) {
	const itemsWithIntegerValues = req.body.items.map(el => {
		return {
			id: parseInt(el.id),
			quantity: parseInt(el.quantity)
		}
	})

	const spellsWithIntegerValues = req.body.spells.map(el => {
		return {
			id: parseInt(el.id),
			position: parseInt(el.position)
		}
	})

	const statsWithIntegerValues = req.body.stats.map(el => {
		return {
			name: el.name,
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
		gold: parseInt(req.body.gold),
		level: parseInt(req.body.level),
		items: itemsWithIntegerValues,
		spells: spellsWithIntegerValues,
		stats: statsWithIntegerValues,
	}
}

exports.createNewCharacter = function (req, res) {
	const newCharacter = createCharacterJson(req)

	mongodb.users.findAndModify({
		query: { 
			email: req.body.email, 
		},
		update: { 
			$push: { characters: newCharacter } 
		},
		new: true
	}, function (error, user, lastErrorObject) {
		if (error && error.code === 11000) return res.status(409).send("Ya existe un personaje con ese nombre")
		if (error) return res.status(500).json(error)

		if (!user) {
			return res.status(500).send("No existe el usuario con el email: " + req.body.email)
		}

		console.info("Se creo un nuevo personaje con el nombre: " + req.body.name)
		return res.status(200).json(user)
	})
}
