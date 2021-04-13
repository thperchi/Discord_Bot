const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config');
const sardo = require('./sardo');
const game = require('./game')

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	});
  
client.on('message', msg => {
	if (msg.content === '!play') game.game(msg, client);
	if (msg.author.username !== client.user.username) {
		sardo.rep(msg);
	}
});

client.login(config.token);