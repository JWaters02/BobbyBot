// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const Discord = require("discord.js");
const weather = require("weather-js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const delay = 10;
const size = 16;
const rainbow = new Array(size);
const prefix = ';';
var Admin;

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

for (var i=0; i<size; i++) {
  var red   = sin_to_hex(i, 0 * Math.PI * 2/3); // 0   deg
  var blue  = sin_to_hex(i, 1 * Math.PI * 2/3); // 120 deg
  var green = sin_to_hex(i, 2 * Math.PI * 2/3); // 240 deg

  rainbow[i] = '#' + red + green + blue;
}

function sin_to_hex(i, phase) {
  var sin = Math.sin(Math.PI / size * 2 * i + phase);
  var int = Math.floor(sin * 127) + 128;
  var hex = int.toString(16);

  return hex.length === 1 ? '0'+hex : hex;
}

let place = 0;

function changeColor() {        
    Admin.edit({color: rainbow[place]});
    
    if(place == (size - 1)) {
      place = 0;
    } else {
      place++;
    }
}

client.once('ready', () => {
  console.log('Logged in as Bobbybot!');
  client.user.setActivity("Buck code", {type: "WATCHING"})
  Admin = client.guilds.cache.get('876613187204685934').roles.cache.find(role => role.name === "Game Ambassador");
  setInterval(() => {
    changeColor()
  }, 500);
});

client.on('message', message => {
  if (message.content === (prefix + '6666')) {
    message.channel.send('Ending Bobbybot now!');
    Admin.color('#c72c2c');
    delay;
    delay;
    process.exit(0);
  }
});

client.login(token);