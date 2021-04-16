module.exports = {
	role: (msg, client) => {
		const fs = require('fs');
		const messages = require ('./db/roles.json');
		let content = msg.content.replace('.addrole ', '').trim().split(' ');
		let msgs;


		async function addEmoji(msg) {
			let x = 1;
			let y = 2;
			msgToReact = await msg.channel.messages.fetch(content[0]);
			while (y <= content.length) {
				msgToReact.react(content[x]);
				content[y] = content[y].replace('<@&', '').replace('>', '');
				msgs[content[0]][content[x]] = content[y];
				console.log(msgs)
				x += 2;
				y += 2;
			}
			fs.writeFile('./db/roles.json', JSON.stringify(msgs), (err) => {
				if (err) return console.log(err);
			});
		}
		async function addRole(reaction, user) {
			msgToReact = await msg.channel.messages.fetch(content[0]);
			let emoji = reaction.emoji.name;
			role = await msg.guild.roles.fetch(msgs[content[0]][emoji])
			member = await reaction.message.guild.members.fetch(user)
			await member.roles.add(role.id).catch(console.error);
		}

		if (!messages) msgs = {};
		else msgs = messages;
		msgs[content[0]] = {}
		if (msg.content.startsWith('.addrole')) addEmoji(msg);
		client.on('messageReactionAdd', async (messageReaction, user) => {
			if (messageReaction.message.id === content[0] && !user.bot) addRole(messageReaction, user);
		});
	}
}