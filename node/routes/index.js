const { Router } = require('express');
const names = require('human-names');
const adjectives = require('adjectives');
const { stripIndents } = require('common-tags');

const getRandom = values => values[Math.floor((Math.random() * values.length))];

const router = Router();

/** Home route */
router.get('/', (_, res) => {
	const myName = `${getRandom(adjectives)} ${names.allRandom()}`;
	const message = stripIndents`
		Hi I'm ${myName}! My name changes with every request!
		My Public IP is ${res.locals.myPublicIp}. ENV.custom_key=${process.env.custom_key}
	`;

  	res.send({
		message
	});
});

module.exports = router;