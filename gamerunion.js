const axios = require('axios');
const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();

// get addons -- Loader made by tbranyen

var addons = [];

var normalizedPath = require('path').join(__dirname, 'addons');

require('fs').readdirSync(normalizedPath).forEach(function(file) {
	if (file.substr(-3) == '.js') addons.push(require('./addons/' + file));
});

const guildId = process.env.GUILD_ID;
const giveRoleName = process.env.GIVE_ROLE_NAME;
const removeRoleName = process.env.REMOVE_ROLE_NAME;

addons.forEach((addon) => {
	if (addon.init) addon.init(client);
});

client.on('ready', () => {
	console.log('Logged in as ' + client.user.tag + '!');
	client.user.setActivity('peeps be gamers', {
		type: 'WATCHING'
	});
	addons.forEach((addon) => {
		if (addon.ready) addon.ready(client);
	});
});

client.on('message', (msg) => {
	//checking if author is a bot
	if (msg.author.bot == true) {
		return;
	}

	addons.forEach((addon) => {
		if (addon.message) addon.message(client, msg);
	});
	
	if (message.author.id == 250809865767878657) {
		message.channel.send("Shut up no one loves you");
	}
});

client.on('messageUpdate', (oldmsg, newmsg) => {
	addons.forEach((addon) => {
		if (addon.messageEdit) addon.messageEdit(client, oldmsg, newmsg);
	});
});

client.login(process.env.SECRET_TOKEN).catch(() => {
	console.error(
		'\nERROR: Incorrect login details were provided. Please change the client login token to a valid token.\n'
	);
	process.exit();
});
