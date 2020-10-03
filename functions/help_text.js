const Discord = require('discord.js');
module.exports = {
    name: 'help-text',
    description: 'print help info',
    execute(bot, help_channel_id){
        bot.on('ready', () => { // Print rules to rules channel
            console.log('PRINT HELP');
            const help_channel = bot.channels.cache.get(help_channel_id);
            help_channel.bulkDelete(3);
        
            help_channel.send({ embed: new Discord.MessageEmbed() // create rules embed
                .setColor('#0099ff')
                .setTitle('XRP Discord')
                .setURL('https://discord.js.org/')
                .setDescription('Some description here')
                .setThumbnail('https://i.imgur.com/wSTFkRM.png')
                .addFields(
                    { name: 'Rules', value: '1. first rule\n 2. second rule' },
                )
                .addField('Inline field title', 'Some value here', true)
                .setFooter('React with ✅ to agree to the rules', 'https://i.imgur.com/wSTFkRM.png')
                });
        });
    }
}