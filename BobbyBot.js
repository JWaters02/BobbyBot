//Calling packages
const Discord = require("discord.js");
const weather = require("weather-js");
const ytdl = require("ytdl-core");
const client = new Discord.Client();
//const delay = require("delay");
const delay = 10;
const token =''; // Removed token for security reasons
const size = 16;
const rainbow = new Array(size);
const prefix = ';';
const queue = new Map();
let volumeVar = 0;

// Checking if the bot has been tagged by someone
client.on('message', (receivedMessage) => {
  // Prevent bot from responding to its own messages
  if (receivedMessage.author == client.user) {
      return
  }
  // Check if the bot's user was tagged in the message
  if (receivedMessage.content.includes(client.user.toString())) {
      // Send acknowledgement message
      receivedMessage.channel.send("Message received from " +
          receivedMessage.author.toString() + ": " + receivedMessage.content)
  }
})

// Create an event listener for the message "help"
client.on('message', message => {
  if (message.content === (prefix + 'help')) {
    const embed = new Discord.RichEmbed()
    .setDescription(`**Help Commands**`)
    .setThumbnail(message.author.avatarURL)
    .setColor(0x00AE86)
    .addField('Prefix:', '**;**', true)
    .addField('help:', 'This command dummy', true)
    .addField('ping:', 'Replies with "Pong!"', true)
    .addField('coinflip:', 'Replies with heads or tails', true)
    //.addField('roleme:', 'Replies with all sender\'s roles', true)
    .addField('me:', 'Replies with sender\'s avatar image', true)
    .addField('weather [location]:', 'Replies with the current weather forcast of location', true)
    .addField('[secretcode]:', 'If you know this, magical stuff happens :)', true)
    .addField('multiply [number] [number2] [optional: number 3, 4, 5, etc]:', 'Works out the value of the numbers inputted', true)

    // Now, let's display it when called
    message.channel.send({embed});
  }
});

client.on('message', message => {
  if (message.author == client.user) {
    return
  }
  console.log(message.createdAt + " " + message.author.username + ", #" + message.channel.name + ", " + message.guild.name + ": " + message.content);
  let guild = client.guilds.get('313361592911921154');
  if (guild) {
    channel = guild.channels.get('638850551358029855');
    channel.send("**" + message.createdAt + "** " + message.author.username + ", #" + message.channel.name + ", " + message.guild.name + ": " + message.content);
  }
});

// Function to create event listener for the message "rolelist"
client.on('message', message => {
  if (message.content === (prefix + 'rolelist')) {
    var rolelist = ['C++', 'Java', 'Javascript', 'C#', 'VB.net', 'C', 'Python', 'BrainFcuk'];
    message.channel.send(rolelist);
  }
});

/*
client.on('message', message => {
  if (message.content === (prefix + 'roleme')) {
    var userlist = [];
    message.author.send(userlist + rolelist);
  }
});
*/

// Create an event listener for the message "help"
client.on('message', message => {
  if (message.content === ('prefix')) {
    message.channel.send("Prefix is ';'");
  }
});

// Create an event listener for the message "notme"
client.on('message', message => {
  if (message.content === (prefix + 'notme')) {
    message.channel.send('What isn\'t you stupid scrub?');
  }
});

// Create an event listener for the message "ping"
client.on('message', message => {
  if (message.content === (prefix + 'ping')) {
    message.channel.send('Pong!');
  }
});

// Coin flipper
client.on('message', message => {
  if (message.content === (prefix + 'coinflip')) {
    let coin = ['http://media.gizmodo.co.uk/wp-content/uploads/2014/03/poundcoinhead.jpg', 'https://i.ebayimg.com/images/g/YlYAAMXQMTlRbmeu/s-l300.jpg']
    let flip = Math.floor((Math.random() * coin.length));
    let coinembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setImage(coin[flip])
    message.channel.send(coinembed)
  }  
});

// Create an event listener for new guild members when they join
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find('name', 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});

// Create an event listener for the message "me"
client.on('message', message => {
  if (message.content === (prefix + 'me')) {
    message.reply(message.author.avatarURL);
  }
});

client.on('message', message => {
  if (message.content === (prefix + 'toggledegree')) {
    toggleDegreeType();
    message.reply(message.author.avatarURL);
  }
});

function toggleDegreeType() {
  let toggleDegree = false;
  let selectedDegreeC = 'C';
  let selectedDegreeF = 'F';
  var selectedDegree;
  if (toggleDegree) {
    selectedDegree = selectedDegreeC; 
    toggleDegree = false;
  } else {
    selectedDegree = selectedDegreeF;
    toggleDegree = true;
  }
};

// Weather checker!
client.on('message', message => {
  let msg = message.content.toLowerCase();
  let place = msg.split(" ");
  if (msg.startsWith(prefix + 'weather')) {
    weather.find({search: place, degreeType: 'C'}, function(err, result) { 
        if (err) message.channel.send(err);
        if (result === undefined || result.length === 0) {
            message.channel.send('**Please enter a valid location.**')
            return;
        }

        var current = result[0].current; // Current part of the JSON output
        var location = result[0].location; // Location part of the JSON output

        const embed = new Discord.RichEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Weather for ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor(0x00AE86)
            .addField('Timezone',`UTC${location.timezone}`, true) 
            .addField('Degree Type',location.degreetype, true)
            .addField('Temperature',`${current.temperature} Degrees`, true)
            .addField('Feels Like', `${current.feelslike} Degrees`, true)
            .addField('Winds',current.winddisplay, true)
            .addField('Humidity', `${current.humidity}%`, true)
            message.channel.send({embed});
    });
  }
});

//#region newCommands
// TESTING NEW COMMANDS SYSTEM
client.on('message', (receivedMessage) => {
  if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
      return
  }
  if (receivedMessage.content.startsWith(";")) {
      processCommand(receivedMessage)
  }
})

function processCommand(receivedMessage) {
  let fullCommand = receivedMessage.content.substr(1) // Remove the leading semicolon
  let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
  let primaryCommand = splitCommand[0] // The first word directly after the semicolon is the command
  let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command
  //const serverQeueue = queue.get(receivedMessage.guild.id);

  switch (primaryCommand) {
    case "multiply":
      multiplyCommand(arguments, receivedMessage)
      break;
    case "play" || "p":
      //playCommand(receivedMessage, serverQeueue, arguments)
      break;
    case "skip" || "s":
      //skipCommand(receivedMessage, serverQeueue)
      break;
    case "pause" || "pu":
      //pauseCommand(receivedMessage, serverQeueue)
      break;
    case "fu":
      //fuCommand(receivedMessage, serverQeueue)
      break;
    case "volume" || "v":
      //volumeCommand(arguments)
      break;
  }
}

function multiplyCommand(arguments, receivedMessage) {
  if (arguments.length < 2) {
      receivedMessage.channel.send("Not enough values to multiply. Try `;multiply 2 4 10` or `;multiply 5.2 7`")
      return
  }
  let product = 1
  arguments.forEach((value) => {
      product = product * parseFloat(value)
  })
  receivedMessage.channel.send(product.toString())
}

function volumeCommand(arguments) {
  volume = arguments; 
}

async function playCommand(receivedMessage, serverQeueue, args) {
  const voiceChannel = receivedMessage.member.voiceChannel;
  if (!voiceChannel) return receivedMessage.channel.send('You need to be in a voice channel to play music!');
  
  const permissions = voiceChannel.permissionsFor(receivedMessage.client.user);
  if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
    return receivedMessage.channel.send('I need the permissions to join and speak in your voice channel!');
  }

  const songInfo = await ytdl.getInfo(args[1]).toString();
  const song = {
    title: songInfo.title,
    url: songInfo.video_url,
  };

  if (!serverQueue) {
    const queueContruct = {
			textChannel: receivedMessage.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: volume,
			playing: true,
		};

		queue.set(receivedMessage.guild.id, queueContruct);

		queueContruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			run(receivedMessage.guild, queueContruct.songs[0]);
		} catch (err) {
			console.log(err);
			queue.delete(receivedMessage.guild.id);
			return receivedMessage.channel.send(err);
		}
  }else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    return receivedMessage.channel.send(`${song.title} has been added to the queue!`);
  }
}

function run(guild, song) {
  const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', () => {
			console.log('Music ended!');
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => {
			console.error(error);
		});
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}

function skipCommand(receivedMessage, serverQeueue) {
  if (!receivedMessage.member.voiceChannel) return receivedMessage.channel.send('You have to be in a voice channel to stop the music!');
	if (!serverQueue) return receivedMessage.channel.send('There is no song that I could skip!');
	serverQueue.connection.dispatcher.end();
}

function pauseCommand(receivedMessage, serverQeueue) {
  if (!receivedMessage.member.voiceChannel) return receivedMessage.channel.send('You have to be in a voice channel to stop the music!');
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
}

function fuCommand(receivedMessage, serverQeueue) {
  if (!receivedMessage.member.voiceChannel) return receivedMessage.channel.send('You have to be in a voice channel to stop the music!');
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
}
//#endregion

//#region Music Bot
client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	const serverQueue = queue.get(message.guild.id);

	if (message.content.startsWith(`${prefix}play`)) {
		execute(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${prefix}skip`)) {
		skip(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${prefix}fu`)) {
		fcukoff(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}pause`)) {
    pause(message, serverQeueue);
    return;
  } else if (message.content.startsWith(`${prefix}volume`)) {
    //volume(message)
    return;
	}
});

function volume(voumeVal) {
  volumeVar = voumeVal;
}

async function execute(message, serverQueue) {
	const args = message.content.split(' ');

	const voiceChannel = message.member.voiceChannel;
	if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
		return message.channel.send('I need the permissions to join and speak in your voice channel!');
	}

	const songInfo = await ytdl.getInfo(args[1]);
	const song = {
		title: songInfo.title,
		url: songInfo.video_url,
	};

	if (!serverQueue) {
		const queueContruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
		};

		queue.set(message.guild.id, queueContruct);

		queueContruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			play(message.guild, queueContruct.songs[0]);
		} catch (err) {
			console.log(err);
			queue.delete(message.guild.id);
			return message.channel.send(err);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		return message.channel.send(`${song.title} has been added to the queue!`);
	}
}

function skip(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	if (!serverQueue) return message.channel.send('There is no song that I could skip!');
	serverQueue.connection.dispatcher.end();
}

function pause(message, serverQeueue) {
  if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	if (!serverQueue) return message.channel.send('There is no song that I could skip!');
	serverQueue.connection.dispatcher.end();
}

function fcukoff(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', () => {
			console.log('Music ended!');
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => {
			console.error(error);
		});
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}


//#endregion

client.on('ready', () => {
  console.log('Logged in as Bobbybot!');
  client.user.setActivity("Buck code", {type: "WATCHING"})
  /*
  setInterval(changeColor, 250);
  Admin = client.guilds.get('431850719486935043').roles.find('name', 'Admin');
  changeColor();
  */
});

client.on('message', message => {
  if (message.content === (prefix + '6666')) {
    message.channel.send('Ending Bobbybot now!');
    /*
    client.guilds.get('431850719486935043').roles.find('name', 'Admin').setColor("#eeba04");
    delay;
    */
    delay;
    process.exit(0);
  }
});

client.login(token);