// XBOT
// Porter L

// JS REQUIREMENTS
const Discord = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const bot = new Discord.Client(); // Create discord bot

// Get settings from .env (See README for setup details)
const prefix = process.env.PREFIX;
const token = process.env.DISCORD_TOKEN;


// -------------------- BOT CONFIGURATION -------------------- // 
const filter_words = ["heck", "shoot", "darn"];
// channels
const rules_channel_id = '762006773959491607'; // channel for ONLY rules agreement
const help_channel_id = '762007808307757056'; // channel for help info

// roles
const user_role_id = '762033142504095774'; // role for basic user
bot.commands = new Discord.Collection();


// -------------------- EXTERNAL FUNCTIONS -------------------- // 
const functionFiles = fs.readdirSync('./functions/').filter(file => file.endsWith('.js'));
for (const file of functionFiles){
    const command = require(`./functions/${file}`);
    bot.commands.set(command.name, command);
}
bot.commands.get('rules-agreement').execute(bot, rules_channel_id, user_role_id); // start rules agreement, check for agrees
bot.commands.get('help-text').execute(bot, help_channel_id); // print help info


// -------------------- EXTERNAL COMMANDS -------------------- // 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}
bot.on('message', message => {  // check for commands being run
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping'){
        bot.commands.get('ping').execute(message, args);
    }
});


// -------------------- STARTUP BOT -------------------- // 
bot.login(token);