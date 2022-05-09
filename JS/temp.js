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
  
  // function volumeCommand(arguments) {
  //   volume = arguments; 
  // }
  // 
  // async function playCommand(receivedMessage, serverQeueue, args) {
  //   const voiceChannel = receivedMessage.member.voiceChannel;
  //   if (!voiceChannel) return receivedMessage.channel.send('You need to be in a voice channel to play music!');
    
  //   const permissions = voiceChannel.permissionsFor(receivedMessage.client.user);
  //   if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
  //     return receivedMessage.channel.send('I need the permissions to join and speak in your voice channel!');
  //   }
  
  //   const songInfo = await ytdl.getInfo(args[1]).toString();
  //   const song = {
  //     title: songInfo.title,
  //     url: songInfo.video_url,
  //   };
  
  //   if (!serverQueue) {
  //     const queueContruct = {
  // 			textChannel: receivedMessage.channel,
  // 			voiceChannel: voiceChannel,
  // 			connection: null,
  // 			songs: [],
  // 			volume: volume,
  // 			playing: true,
  // 		};
  
  // 		queue.set(receivedMessage.guild.id, queueContruct);
  
  // 		queueContruct.songs.push(song);
  
  // 		try {
  // 			var connection = await voiceChannel.join();
  // 			queueContruct.connection = connection;
  // 			run(receivedMessage.guild, queueContruct.songs[0]);
  // 		} catch (err) {
  // 			console.log(err);
  // 			queue.delete(receivedMessage.guild.id);
  // 			return receivedMessage.channel.send(err);
  // 		}
  //   }else {
  //     serverQueue.songs.push(song);
  //     console.log(serverQueue.songs);
  //     return receivedMessage.channel.send(`${song.title} has been added to the queue!`);
  //   }
  // }
  
  // function run(guild, song) {
  //   const serverQueue = queue.get(guild.id);
  
  // 	if (!song) {
  // 		serverQueue.voiceChannel.leave();
  // 		queue.delete(guild.id);
  // 		return;
  // 	}
  
  // 	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
  // 		.on('end', () => {
  // 			console.log('Music ended!');
  // 			serverQueue.songs.shift();
  // 			play(guild, serverQueue.songs[0]);
  // 		})
  // 		.on('error', error => {
  // 			console.error(error);
  // 		});
  // 	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  // }
  
  // function skipCommand(receivedMessage, serverQeueue) {
  //   if (!receivedMessage.member.voiceChannel) return receivedMessage.channel.send('You have to be in a voice channel to stop the music!');
  // 	if (!serverQueue) return receivedMessage.channel.send('There is no song that I could skip!');
  // 	serverQueue.connection.dispatcher.end();
  // }
  
  // function pauseCommand(receivedMessage, serverQeueue) {
  //   if (!receivedMessage.member.voiceChannel) return receivedMessage.channel.send('You have to be in a voice channel to stop the music!');
  // 	serverQueue.songs = [];
  // 	serverQueue.connection.dispatcher.end();
  // }
  
  // function fuCommand(receivedMessage, serverQeueue) {
  //   if (!receivedMessage.member.voiceChannel) return receivedMessage.channel.send('You have to be in a voice channel to stop the music!');
  // 	serverQueue.songs = [];
  // 	serverQueue.connection.dispatcher.end();
  // }
  //#endregion
  
  //#region Music Bot
  // client.on('message', async message => {
  // 	if (message.author.bot) return;
  // 	if (!message.content.startsWith(prefix)) return;
  
  // 	const serverQueue = queue.get(message.guild.id);
  
  // 	if (message.content.startsWith(`${prefix}play`)) {
  // 		execute(message, serverQueue);
  // 		return;
  // 	} else if (message.content.startsWith(`${prefix}skip`)) {
  // 		skip(message, serverQueue);
  // 		return;
  // 	} else if (message.content.startsWith(`${prefix}fu`)) {
  // 		fcukoff(message, serverQueue);
  //     return;
  //   } else if (message.content.startsWith(`${prefix}pause`)) {
  //     pause(message, serverQeueue);
  //     return;
  //   } else if (message.content.startsWith(`${prefix}volume`)) {
  //     //volume(message)
  //     return;
  // 	}
  // });
  
  // function volume(voumeVal) {
  //   volumeVar = voumeVal;
  // }
  
  // async function execute(message, serverQueue) {
  // 	const args = message.content.split(' ');
  
  // 	const voiceChannel = message.member.voiceChannel;
  // 	if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
  // 	const permissions = voiceChannel.permissionsFor(message.client.user);
  // 	if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
  // 		return message.channel.send('I need the permissions to join and speak in your voice channel!');
  // 	}
  
  // 	const songInfo = await ytdl.getInfo(args[1]);
  // 	const song = {
  // 		title: songInfo.title,
  // 		url: songInfo.video_url,
  // 	};
  
  // 	if (!serverQueue) {
  // 		const queueContruct = {
  // 			textChannel: message.channel,
  // 			voiceChannel: voiceChannel,
  // 			connection: null,
  // 			songs: [],
  // 			volume: 5,
  // 			playing: true,
  // 		};
  
  // 		queue.set(message.guild.id, queueContruct);
  
  // 		queueContruct.songs.push(song);
  
  // 		try {
  // 			var connection = await voiceChannel.join();
  // 			queueContruct.connection = connection;
  // 			play(message.guild, queueContruct.songs[0]);
  // 		} catch (err) {
  // 			console.log(err);
  // 			queue.delete(message.guild.id);
  // 			return message.channel.send(err);
  // 		}
  // 	} else {
  // 		serverQueue.songs.push(song);
  // 		console.log(serverQueue.songs);
  // 		return message.channel.send(`${song.title} has been added to the queue!`);
  // 	}
  // }
  
  // function skip(message, serverQueue) {
  // 	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
  // 	if (!serverQueue) return message.channel.send('There is no song that I could skip!');
  // 	serverQueue.connection.dispatcher.end();
  // }
  
  // function pause(message, serverQeueue) {
  //   if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
  // 	if (!serverQueue) return message.channel.send('There is no song that I could skip!');
  // 	serverQueue.connection.dispatcher.end();
  // }
  
  // function fcukoff(message, serverQueue) {
  // 	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
  // 	serverQueue.songs = [];
  // 	serverQueue.connection.dispatcher.end();
  // }
  
  // function play(guild, song) {
  // 	const serverQueue = queue.get(guild.id);
  
  // 	if (!song) {
  // 		serverQueue.voiceChannel.leave();
  // 		queue.delete(guild.id);
  // 		return;
  // 	}
  
  // 	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
  // 		.on('end', () => {
  // 			console.log('Music ended!');
  // 			serverQueue.songs.shift();
  // 			play(guild, serverQueue.songs[0]);
  // 		})
  // 		.on('error', error => {
  // 			console.error(error);
  // 		});
  // 	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  // }
  
  
  //#endregion