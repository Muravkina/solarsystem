var sun = {
	name: 'Sun',
	category: 'star',
	diameter: 864938,
	distanceFromSun: 0,
	travelTime: 0,
	gravitationalFactor: 27.9
}

// diameter, distance from Sun  - in miles
// length of Day - in hours
// distance from Earth - in days

var mercury = {
	name: 'Mercury',
	category: 'planet',
	diameter: 3032,
	lengthOfDay: 4222.6,
	distanceFromSun: 36000000,
	travelTime: 193,
	shuttleTraveled: 'Mariner',
	gravitationalFactor: 0.378,
	notes: 'Mercury orbits so quickly around the Sun that early civilizations believed it was actually two different stars – one which appeared in the morning and another which appeared in the evening.'
}

var venus = {
	name: 'Venus',
	category: 'planet',
	diameter: 7521,
	lengthOfDay: 2802,
	distanceFromSun: 67200000,
	travelTime: 360,
	shuttleTraveled: 'Magellan',
	gravitationalFactor: 0.907,
	notes: 'One day on Venus is longer than one year. Due to the slow rotation on its axis, it takes 243 Earth-days to complete one rotation. The orbit of the planet takes 225 Earth-days – making a year on Venus shorter on day on Venus.'
}

var moon = {
	name: 'Moon',
	category: 'moon',
	diameter: 2159,
	lengthOfDay: 708.7,
	distanceFromSun: 92761000,
	travelTime: 480,
	shuttleTraveled: 'Apollo 11',
	gravitationalFactor: 0.166,
	notes: 'The dark side of the moon is a myth. In reality both sides of the Moon see the same amount of sunlight however only one face of the Moon is ever seen from Earth. The side facing away from Earth has only been seen by the human eye from spacecraft.'
}

var earth = {
	name: 'Earth',
	category: 'planet',
	diameter: 7926,
	lengthOfDay: 24,
	travelTime: 499,
	shuttleTraveled: '',
	distanceFromSun: 93000000,
	gravitationalFactor: 1,
	notes: 'The rotation of the Earth is gradually slowing down. Eventually this will lengthen our days but it will take around 140 million years before our day will have increased from 24 to 25 hours.'
}

var mars = {
	name: 'Mars',
	category: 'planet',
	diameter: 4221,
	lengthOfDay: 24.7,
	distanceFromSun: 141600000,
	travelTime: 759,
	shuttleTraveled: 'Opportunity',
	gravitationalFactor: 0.377,
	notes: 'Pieces of Mars have been found on Earth. It is believed that trace amounts of the Martian atmosphere were within meteorites that the planet ejected. These meteorites then orbited the solar system for millions of years before entering the Earth’s atmosphere and crashing to the ground.'
}

var jupiter = {
	name: 'Jupiter',
	category: 'planet',
	diameter: 88846,
	lengthOfDay: 9.9,
	distanceFromSun: 483800000,
	travelTime: 2595,
	shuttleTraveled: 'Juno',
	gravitationalFactor: 2.36,
	notes: 'Jupiter’s Great Red Spot is an enormous storm that has been raging for over 300 years. This storm is so wide that three Earth’s would fit inside of it.'
}

var saturn = {
	name: 'Saturn',
	category: 'planet',
	diameter: 74897,
	lengthOfDay: 10.7,
	distanceFromSun: 890800000,
	travelTime: 4759,
	shuttleTraveled: 'Cassini',
	gravitationalFactor: 0.916,
	notes: 'Saturn is the least dense planet in the solar system. It is made mostly of hydrogen and has a density which is less than water – which technically means that Saturn would float'
}

var uranus = {
	name: 'Uranus',
	category: 'planet',
	diameter: 31763,
	lengthOfDay: 17.2,
	distanceFromSun: 1784800000,
	travelTime: 9575,
	shuttleTraveled: 'Voyager',
	gravitationalFactor: 0.889,
	notes: 'Uranus is often referred to as the “ice giant”. While it has a hydrogen and helium upper layer like the other gas giants, Uranus also has an icy mantle which surrounds its rock and iron core. The upper atmosphere of water, ammonia and methane ice crystals gives Uranus its distinctive pale blue color'
}

var neptune = {
	name: 'Neptune',
	category: 'planet',
	diameter: 30775,
	lengthOfDay: 16.1,
	distanceFromSun: 2793100000,
	travelTime: 14998,
	shuttleTraveled: 'Voyager',
	gravitationalFactor: 1.12,
	notes: 'It takes Neptune 164.8 Earth years to orbit the Sun. On 11 July 2011, Neptune completed its first full orbit since its discovery in 1846'
}


var solarSystem = [sun, mercury, venus, moon, earth, mars, jupiter, saturn, uranus, neptune];

export default solarSystem;
