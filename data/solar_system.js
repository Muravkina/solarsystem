var sun = {
	diameter: 864938,
	distanceFromEarth: 156,
	distanceFromSun: 0,
	gravitationalFactor: 27.9
}

// diameter, distance from Sun in miles
//length of Day in hours
// distance from Earth in days

var mercury = {
	diameter: 3032,
	lengthOfDay: 4222.6,
	distanceFromSun: 36000000,
	distanceFromEarth: 147,
	shuttleTraveled: 'Mariner', 
	gravitationalFactor: 0.378,
	notes: 'If you want to actually travel there, you need to slow down to its orbital speed, which takes about 6.5 years total (Messenger).'
}

var venus = {
	diameter: 7521,
	lengthOfDay: 2802, 
	distanceFromSun: 67200000,
	distanceFromEarth: 456,
	shuttleTraveled: 'Magellan',
	gravitationalFactor: 0.907
}

var moon = {
	diameter: 2159,
	lengthOfDay: 708.7
	distanceFromEarth: 3,
	shuttleTraveled: 'Apollo 11',
	gravitationalFactor: 0.166
}

var earth = {
	diameter: 7926,
	lengthOfDay: 24,
	distanceFromEarth: 0,
	shuttleTraveled: '',
	distanceFromSun: 93000000,
	gravitationalFactor: 1
}

var mars = {
	diameter: 4221,
	lengthOfDay: 24.7,
	distanceFromSun: 141600000,
	distanceFromEarth: 213,
	shuttleTraveled: 'Opportunity',
	gravitationalFactor: 0.377
}

var jupiter = {
	diameter: 88846,
	lengthOfDay: 9.9,
	distanceFromSun: 483800000,
	distanceFromEarth: 1825,
	shuttleTraveled: 'Juno',
	gravitationalFactor: 2.36
}

var saturn = {
	diameter: 74897,
	lengthOfDay: 10.7,
	distanceFromSun: 890800000,
	distanceFromEarth: 2555,
	shuttleTraveled: 'Cassini',
	gravitationalFactor: 0.916
}

var uranus = {
	diameter: 31763,
	lengthOfDay: 17.2,
	distanceFromSun: 1784800000,
	distanceFromEarth: 3103,
	shuttleTraveled: 'Voyager',
	gravitationalFactor: 0.889
}

var neptune = {
	diameter: 30775,
	lengthOfDay: 16.1,
	distanceFromSun: 2793100000,
	distanceFromEarth: 4380,
	shuttleTraveled: 'Voyager',
	gravitationalFactor: 1.12
}

var pluto = {
	diameter: 1464,
	lengthOfDay: 153.3,
	distanceFromSun: 3670000000,
	distanceFromEarth: 3468,
	shuttleTraveled: 'New Horizons',
	gravitationalFactor: 0.071
}

var solarSystem = [sun, mercury, venus, moon, earth, mars, jupiter, saturn, uranus, neptune, pluto];

export default solarSystem;