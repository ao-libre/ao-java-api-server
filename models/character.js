function createCharacterJson(req) {
	const name = req.body.name
	const description = req.body.description
	const head = req.body.head
	const classChar = req.body.class
	const race = req.body.race
	const genre = req.body.genre
	const agility = req.body.agility
	const charisma = req.body.charisma
	const constitution = req.body.constitution
	const intelligence = req.body.intelligence
	const strength = req.body.strength
	const gold = req.body.gold
	const level = req.body.level


	return {
		name,
		description,
		head,
		class: classChar,
		race,
		genre,
		agility,
		charisma,
		constitution,
		intelligence,
		strength,
		gold,
		level
	}
}

// items: [
// 	{
// 		id: 1,
// 		quantity: 50
// 	},
// 	{
// 		id: 2,
// 		quantity: 50
// 	},
// ]
// deaths: {
// 	npcs: 0,
// 	characters: 0
// }
exports.createNewCharacter = function (req, res) {
	// const newCharacter = createCharacterJson(req);

	let newCharacter = {
		name: 'recox',
		description: 'un pj poderoso',
		head: 1,
		class: 'Warrior',
		race: 'Elf',
		genre: 'Male',
		agility: 10,
		charisma: 11,
		constitution: 12,
		intelligence: 13,
		strength: 14,
		gold: 200,
		level: 1
	}

	mongodb.users.findAndModify({
		query: { email: req.body.email },
		update: { $push: { characters: newCharacter } },
	}, function (error, user, lastErrorObject) {
		if (error) return res.status(500).json(error);
		console.log(user)

		console.info("Se creo un nuevo personaje con el nombre: " + req.body.name)
		return res.status(200).json(user)
	})

}
