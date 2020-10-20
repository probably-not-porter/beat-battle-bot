const Discord = require('discord.js');
module.exports = {
    name: 'help-text',
    description: 'print help info',
    execute(bot, help_channel_id){
        bot.on('ready', () => { // Print rules to rules channel
            console.info('-> PRINT HELP');
            const help_channel = bot.channels.cache.get(help_channel_id);
            help_channel.bulkDelete(3);
        
            help_channel.send({ embed: new Discord.MessageEmbed() // create rules embed
                .setColor('#00ee00')
                .setTitle('Beat Battle Help')
                .setDescription('Commands and help for participating in Beat Battles')
                .setThumbnail('https://i.imgur.com/wSTFkRM.png')
                .addFields(
                    { 
                        name: 'Starting Battles', 
                        value: 'Use the `samples` text channel to discuss and select samples.\n Use `!startbattle [url]` to start a beat battle with a specific sample.\n A battle will be started in the `battle` text channel where the sample can be found and entries can be submitted.' 
                    },
                    { 
                        name: 'Submitting Entries', 
                        value: 'Use `!submitentry [battle ID] [url]` to submit an entry to a battle by its ID.' 
                    },
                    { 
                        name: 'Voting on beats', 
                        value: 'Once voting begins for a round, you can listen to the submitted links and vote on your favorite using their respective emotes.' 
                    },
                )
                .setFooter('Have fun and jam on', 'https://i.imgur.com/wSTFkRM.png')
                });
        });
    }
}