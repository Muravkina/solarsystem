var sun = {
	name: 'Sun',
	category: 'star',
	diameter: 864938,
	diameterRatio: 109,
	distanceFromEarth: 156,
	distanceFromSun: 0,
	gravitationalFactor: 27.9
}

// diameter, distance from Sun in miles
//length of Day in hours
// distance from Earth in days

var mercury = {
	name: 'Mercury',
	category: 'planet',
	diameter: 3032,
	diameterRatio: 0.383,
	lengthOfDay: 4222.6,
	distanceFromSun: 36000000,
	distanceFromEarth: 147,
	shuttleTraveled: 'Mariner',
	gravitationalFactor: 0.378,
	notes: 'If you want to actually travel there, you need to slow down to its orbital speed, which takes about 6.5 years total (Messenger).'
}

var venus = {
	name: 'Venus',
	category: 'planet',
	diameter: 7521,
	diameterRatio: 0.949,
	lengthOfDay: 2802,
	distanceFromSun: 67200000,
	distanceFromEarth: 456,
	shuttleTraveled: 'Magellan',
	gravitationalFactor: 0.907
}

var moon = {
	name: 'Moon',
	category: 'moon',
	diameter: 2159,
	diameterRatio: 0.2724,
	lengthOfDay: 708.7,
	distanceFromEarth: 3,
	shuttleTraveled: 'Apollo 11',
	gravitationalFactor: 0.166
}

var earth = {
	name: 'Earth',
	category: 'planet',
	diameter: 7926,
	diameterRatio: 1,
	lengthOfDay: 24,
	distanceFromEarth: 0,
	shuttleTraveled: '',
	distanceFromSun: 93000000,
	gravitationalFactor: 1
}

var mars = {
	name: 'Mars',
	category: 'planet',
	diameter: 4221,
	diameterRatio: 0.532,
	lengthOfDay: 24.7,
	distanceFromSun: 141600000,
	distanceFromEarth: 213,
	shuttleTraveled: 'Opportunity',
	gravitationalFactor: 0.377
}

var jupiter = {
	name: 'Jupiter',
	category: 'planet',
	diameter: 88846,
	diameterRatio: 11.21,
	lengthOfDay: 9.9,
	distanceFromSun: 483800000,
	distanceFromEarth: 1825,
	shuttleTraveled: 'Juno',
	gravitationalFactor: 2.36
}

var saturn = {
	name: 'Saturn',
	category: 'planet',
	diameter: 74897,
	diameterRatio: 9.45,
	lengthOfDay: 10.7,
	distanceFromSun: 890800000,
	distanceFromEarth: 2555,
	shuttleTraveled: 'Cassini',
	gravitationalFactor: 0.916
}

var uranus = {
	name: 'Uranus',
	category: 'planet',
	diameter: 31763,
	diameterRatio: 4.01,
	lengthOfDay: 17.2,
	distanceFromSun: 1784800000,
	distanceFromEarth: 3103,
	shuttleTraveled: 'Voyager',
	gravitationalFactor: 0.889
}

var neptune = {
	name: 'Neptune',
	category: 'planet',
	diameter: 30775,
	diameterRatio: 3.88,
	lengthOfDay: 16.1,
	distanceFromSun: 2793100000,
	distanceFromEarth: 4380,
	shuttleTraveled: 'Voyager',
	gravitationalFactor: 1.12
}

var pluto = {
	name: 'Pluto',
	category: 'planet',
	diameter: 1464,
	diameterRatio: 0.186,
	lengthOfDay: 153.3,
	distanceFromSun: 3670000000,
	distanceFromEarth: 3468,
	shuttleTraveled: 'New Horizons',
	gravitationalFactor: 0.071
}

var solarSystem = [sun, mercury, venus, moon, earth, mars, jupiter, saturn, uranus, neptune, pluto];

export default solarSystem;
