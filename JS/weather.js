//Calling packages
const Discord = require("discord.js");
const weather = require("weather-js");
const openWeather = require('openweather-apis');
const client = new Discord.Client();
const owAPIToken = ''; // Removed for security reasons
const prefix = ';';
const fetch = require("node-fetch");

client.on('message', message => {
    let location = message.content.split(" ").join(" ").slice(10);
    if (!location) return message.channel.search("Please input a valid city");
    const link = ('api.openweathermap.org/data/2.5/weather?q=' + location + "&APPID=" + owAPIToken);
    let embed = new RichEmbed()
        .setColor("#8DEEEE");
});


































// Weather checker!
client.on('message', message => 
{
  let msg = message.content.toLowerCase(); // This variable takes the message, and turns it all into uppercase so it isn't case sensitive.
  let place = msg.endsWith;
  if (msg.startsWith(prefix + 'weather')) // This checks to see if the beginning of the message is calling the weather command.
  {
    weather.find({search: place, degreeType: 'C'}, function(err, result)
    { 
        if (err) message.channel.send(err);

        // We also want them to know if a place they enter is invalid.
        if (result === undefined || result.length === 0)
        {
            message.channel.send('**Please enter a valid location.**') // This tells them in chat that the place they entered is invalid.
            return; // This exits the code so the rest doesn't run.
        }

        // Variables
        var current = result[0].current; // This is a variable for the current part of the JSON output
        var location = result[0].location; // This is a variable for the location part of the JSON output

        // Let's use an embed for this.
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

            // Now, let's display it when called
            message.channel.send({embed});
    });
  }
});