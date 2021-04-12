module.exports = {
	game: async function(msg, client) {
		function attack (atker, atked) {
			if (Math.floor(Math.random() * Math.floor(100)) <= atker.crit) {
				atked.hp = atked.hp - (atker.atk * 1.5)
				msgRep.edit(`${atker.name} donne un coup critique a ${atked.name}.\n${atked.name} perd ${atker.atk * 1.5} points de vie`)
			} else {
				atked.hp = atked.hp - (atker.atk)
				msgRep.edit(`${atker.name} donne un coup a ${atked.name}.\n${atked.name} perd ${atker.atk} points de vie`)
			}
			gameVar.player.crit = 20;
			if (atker.name === gameVar.boss.name) {
				setTimeout(() => {playerTurn()}, 2000);
			} else if (atker.name === gameVar.player.name) {
				setTimeout(() => {start()}, 2000);
			}
		}

		function heal () {
			msgRep.reactions.removeAll()
			if ((x = Math.floor(Math.random() * Math.floor(100))) <= 10) {
				msgRep.edit('Vous trouvez une grande potion de soin. Vous vous soignez 25 points de vie');
				gameVar.player.hp = gameVar.player.hp + 25;
			} else if (x >= 80) {
				msgRep.edit('Vous ne trouvez rien.');
			} else {
				msgRep.edit('Vous trouvez une petite potion de soin. Vous vous soignez 5 points de vie');
			}
			setTimeout(() => {start()}, 2000);
		}

		function esquive() {
			msgRep.reactions.removeAll()
			if (Math.floor(Math.random() * Math.floor(100)) <= 80) {
				msgRep.edit('Vous avez reussi a esquiver l\'attaque du boss');
				setTimeout(() => {playerTurn()}, 2000);
			} else {
				msgRep.edit('Vous n\'avez pas reussi a esquiver l\'attaque du boss');
				setTimeout(() => {attack(gameVar.boss, gameVar.player)}, 2000);
			}
		}

		function parade() {
			msgRep.reactions.removeAll()
			if (Math.floor(Math.random() * Math.floor(100)) <= 50) {
				msgRep.edit('Vous avez reussi a parer l\'attaque du boss. Vous l\'avez déstabilisé et avez donc maintenant 90% de chance de lui mettre un coup critique.');
				gameVar.player.crit = 90;
				setTimeout(() => {playerTurn()}, 2000);
			} else {
				msgRep.edit('Vous n\'avez pas reussi a parer l\'attaque du boss');
				setTimeout(() => {attack(gameVar.boss, gameVar.player)}, 2000);
			}
		}

		function attaque() {
			msgRep.reactions.removeAll()
			msgRep.edit('Vous attaquez le boss');
			setTimeout(() => {attack(gameVar.player, gameVar.boss)}, 1000);
		}

		function start() {
			msgRep.edit('Le boss s\'apprete a vous attaquer\n💨: Esquiver (80%)\n🛡️: Parer pour contre attaquer(50%)');
			msgRep.react('💨');
			msgRep.react('🛡️');
		}

		function playerTurn() {
			msgRep.edit('C\'est a vous de jouer. Que voulez vous faire ?\n⚔️. Attaquer (100%)\n❤️. Chercher une potion de vie (0-25pv)');
			msgRep.react('⚔️');
			msgRep.react('❤️');
		}

		const gameVar = require('./game.json');
		gameVar.player.name = msg.author.username;
		let msgRep = await msg.reply('Le jeu va commencer! Prepare toi au combat.');
		start();
		client.on('messageReactionAdd', (messageReaction, user) => {
			if (user.id === client.user.id) return;
			if (messageReaction.emoji.name === '⚔️' && messageReaction.message.id === msgRep.id) attaque();
			if (messageReaction.emoji.name === '🛡️' && messageReaction.message.id === msgRep.id) parade();
			if (messageReaction.emoji.name === '💨' && messageReaction.message.id === msgRep.id) esquive();
			if (messageReaction.emoji.name === '❤️' && messageReaction.message.id === msgRep.id) heal();
		});
	}
}