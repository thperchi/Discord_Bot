const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./db/config.json');
const sardo = require('./sardo');
const game = require('./game');
const role = require('./roles');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
	if (!msg.author.bot) {
		if (msg.content === '!play') game.play(msg, client);
		if (msg.content.startsWith('.')) role.role(msg, client);
		sardo.rep(msg);
	}
})

client.login(config.token);