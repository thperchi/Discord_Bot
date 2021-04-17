const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./db/config.json');
const commands = require('./commands');
const game = require('./game');
const role = require('./roles');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
	if (!msg.author.bot) {
		if (msg.content === '!play') game.play(msg, client);
		if (msg.content.startsWith('.')) role.role(msg, client);
		commands.rep(msg);
	}
})
setInterval(function pikaDrink() {
	let chan = client.channels.cache.get('566668444683206658');
	pika = chan.guild.members.cache.get('489836698394427392');
	chan.send(`${pika} bois de l'eau patate.`);
}, 1000 * 60 * 60);

client.login(config.token);