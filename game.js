module.exports = {
	play: async function(msg, client) {
		const gameVar = require('./db/game.json');
		const player = gameVar.player
		const mob = gameVar.boss

		function attack (atker, atked) {
			if (Math.floor(Math.random() * Math.floor(100)) <= atker.crit) {
				atked.hp = atked.hp - (atker.atk * 1.5)
				msgRep.edit(`${atker.name} donne un coup critique a ${atked.name}.\n${atked.name} perd ${atker.atk * 1.5} points de vie`)
			} else {
				atked.hp = atked.hp - (atker.atk)
				msgRep.edit(`${atker.name} donne un coup a ${atked.name}.\n${atked.name} perd ${atker.atk} points de vie`)
			}
			player.crit = 20;
			if (atker.name === mob.name) {
				setTimeout(() => {playerTurn()}, 2000);
			} else if (atker.name === player.name) {
				setTimeout(() => {mobTurn()}, 2000);
			}
		}

		function heal () {
			msgRep.reactions.removeAll()
			if ((x = Math.floor(Math.random() * Math.floor(100))) <= 10) {
				msgRep.edit('Vous trouvez une grande potion de soin. Vous vous soignez 25 points de vie');
				player.hp = player.hp + 25;
			} else if (x >= 80) {
				msgRep.edit('Vous ne trouvez rien.');
			} else {
				msgRep.edit('Vous trouvez une petite potion de soin. Vous vous soignez 5 points de vie');
			}
			setTimeout(() => {mobTurn()}, 2000);
		}

		function esquive() {
			msgRep.reactions.removeAll()
			if (Math.floor(Math.random() * Math.floor(100)) <= 80) {
				msgRep.edit('Vous avez reussi a esquiver l\'attaque du boss');
				setTimeout(() => {playerTurn()}, 2000);
			} else {
				msgRep.edit('Vous n\'avez pas reussi a esquiver l\'attaque du boss');
				setTimeout(() => {attack(mob, player)}, 2000);
			}
		}

		function parade() {
			msgRep.reactions.removeAll()
			if (Math.floor(Math.random() * Math.floor(100)) <= 50) {
				msgRep.edit('Vous avez reussi a parer l\'attaque du boss. Vous l\'avez déstabilisé et avez donc maintenant 90% de chance de lui mettre un coup critique.');
				player.crit = 90;
				setTimeout(() => {playerTurn()}, 2000);
			} else {
				msgRep.edit('Vous n\'avez pas reussi a parer l\'attaque du boss');
				setTimeout(() => {attack(mob, player)}, 2000);
			}
		}

		function attaque() {
			msgRep.reactions.removeAll()
			msgRep.edit('Vous attaquez le boss');
			setTimeout(() => {attack(player, mob)}, 1000);
		}

		function mobTurn() {
			if (player.hp <= 0 || mob.hp <= 0) end();
			else {
				msgRep.edit(`${player.name} : ${player.hp} hp\n${mob.name} : ${mob.hp} hp\nLe boss s\'apprete a vous attaquer\n💨: Esquiver (80%)\n🛡️: Parer pour contre attaquer(50%)`);
				msgRep.react('💨');
				msgRep.react('🛡️');
			}
		}

		function playerTurn() {
			if (player.hp <= 0 || mob.hp <= 0) end();
			else {
				msgRep.edit(`${player.name} : ${player.hp} hp\n${mob.name} : ${mob.hp} hp\nC\'est a vous de jouer. Que voulez vous faire ?\n⚔️. Attaquer (100%)\n❤️. Chercher une potion de vie (0-25pv)`);
				msgRep.react('⚔️');
				msgRep.react('❤️');
			}
		}

		function end() {
			if (player.hp > mob.hp) msgRep.edit(`${player.name} donne le coup fatal à ${mob.name} !\nVous avez gagné. Fellation!`);
			else if (player.hp > mob.hp) msgRep.edit(`${mob.name} donne le coup fatal à ${player.name} !\nVous avez perdu.`);
		}

		player.name = msg.author.username;
		let msgRep = await msg.reply('Le jeu va commencer! Prepare toi au combat.');
		if(player.hp > 0 && mob.hp > 0) mobTurn();
		client.on('messageReactionAdd', (messageReaction, user) => {
			if (user.id === client.user.id) return;
			if (messageReaction.emoji.name === '⚔️' && messageReaction.message.id === msgRep.id && user == msg.author) attaque();
			if (messageReaction.emoji.name === '🛡️' && messageReaction.message.id === msgRep.id && user == msg.author) parade();
			if (messageReaction.emoji.name === '💨' && messageReaction.message.id === msgRep.id && user == msg.author) esquive();
			if (messageReaction.emoji.name === '❤️' && messageReaction.message.id === msgRep.id && user == msg.author) heal();
		});
	}
}