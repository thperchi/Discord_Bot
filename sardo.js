const responses = ["MAIS C'ÉTAIT SUR ENFAIT! C'ÉTAIT SUUUUUUUUR!", "MAIS FAITES UN TRUC UTILE POUR LA SOCIÉTÉ, SUICIDEZ VOUS!!", "TRES TRES CONTENT, J'ADORE!", "ELLE FLASH-IN CETTE CONASSE", "SALE MERDE", "Je regarde le Curling féminin, et y'a pas à dire, même avec un balai elles puent la merde aux JO.", "ALLEZ HOP TU PRENDS PERMA", "J'AI MAL A LA QUEUE PUTAIN", "NIQUE TA MERE NUMERICABLE, NIQUE TA MERE RIOT GAMES", "MAIS POURQUOI J'PARLE AVEC EUX PUTAIN, POURQUOI J'PARLE AVEC EUX", "UN NOIR EST MORT, JE L'AI TUÉ", "Un mexicain il mange des fajitas toute la journée c'est l'homme le plus heureux au monde avec sa putain de guitare tu l'envoie 2 semaine en Pologne il a envie de  se suicider", "LE BOULANGER C'EST UN FILS DE PUTE, QUAND TU VAS ACHETER TA BAGUETTE DE PAIN TU DIS BONJOUR FILS DE PUTE", "J'vais aller vivre au pérou, LE PÉROU", "LE MEC EST TELLEMENT CON QU'IL M'A STUN IRL", "M'EN BAS LES COUILLES, CONASSE", "TOI T'ES SILVER, PUTAN, TU COMPRENDS CONNARD, PUTAIN !", "HOPLA J'AI DIS HOPLA !", "TAC TAC TAC", "EST CE QUE CE S'RAIS PAS QUELQU'UN DE LA TEAAAAM BENJAMIN PAVAAAAAAAAAAAAAAAAAAAAAAAAAAARD"];

module.exports = {
	rep: function(msg) {
		if (msg.content.toLowerCase().includes('sard')) {
			msg.reply(responses[Math.floor(Math.random() * responses.length)])
		}
		if (msg.content.toLowerCase() === 'sdoch') {
			msg.reply('O');
		}
		if (msg.content.toLowerCase() === 'ascii') {
			msg.reply('flemme')
		}
		if (msg.content.toLowerCase === 'non') {
			msg.reply('https://www.youtube.com/watch?v=caXgpo5Ezo4');
		}
		if (msg.content.toLowerCase().includes('rick')) {
			msg.reply('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
		}
		if (msg.content.toLowerCase().includes('solary')) {
			msg.reply('Dans 3 mois top chrono on baise Solary !');
		}
		if (msg.content.toLowerCase().includes('bucheron') || msg.content.toLowerCase().includes('bûcheron')) {
			msg.reply('JE SUIS UN CHASSEUR DE BOIS');
		}
		if (msg.content.startsWith('!delete') && (msg.author.username === "PikaStreamx" || msg.author.username === "Azaeps 🔥")) {
			const args = msg.content.trim().split(' ');
			msg.channel.bulkDelete(args[1])
			.catch((error) => console.log(error));
		}
	}
}