//Calling packages
const Discord = require("discord.js");
const client = new Discord.Client();
//const delay = require("delay");
const size = 16;
const prefix = ';';


// Create an event listener for the message "supertester"
client.on('message', message => {
    if (message.content === (prefix + 'supertester')) {
      let randomNum1 = random(5, 15);
      let randomNum2 = random(1, 10);
      let randomNum3 = random(12, 17);
      let receivedMessage = (';multiply' + randomNum1.toString() + ' ' + randomNum2.toString() + ' ' + randomNum3.toString());
      processCommand(receivedMessage)
    }
  });

  function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the prefix is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command
  
    if (primaryCommand == "multiply") {
        multiplyCommand(arguments, receivedMessage)
    }
  }
  
  function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        return
    }
    let product = 1
    arguments.forEach((value) => {
        product = product * parseFloat(value)
    })
  }