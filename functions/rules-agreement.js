const Discord = require('discord.js');
module.exports = {
    name: 'rules-agreement',
    description: 'Create a permission modifying rules agreement in specific channel',
    execute(bot, rules_channel_id, user_role_id){
        bot.on('ready', () => { // Print rules to rules channel
            console.info('-> PRINT RULES');
            const rules_channel = bot.channels.cache.get(rules_channel_id);
            rules_channel.bulkDelete(3);
        
            rules_channel.send({ embed: new Discord.MessageEmbed() // create rules embed
                .setColor('#0099ff')
                .setTitle('Beat Battle Rules')
                .setDescription('Rules for the Discord')
                .setThumbnail('https://i.imgur.com/wSTFkRM.png')
                .addFields(
                    { 
                        name: 'Be Kind', 
                        value: "Don't be rude to people. Some of us are experienced, while some are just getting started, and there is room for all in this community." 
                    },
                    { 
                        name: 'Stay on Topic', 
                        value: "Keep content on topic. This is a Discord for beat making and music talk, and it should be used accordingly." 
                    },
                    {
                        name: 'Be Original', 
                        value: "Please submit your own, original material. " 
                    }
                )
                .setFooter('React with ✅ to agree to the rules', 'https://i.imgur.com/wSTFkRM.png')
                });
        });
        bot.on('message', msg=>{ // Start listener for rules agreement
            if (msg.channel.name == "rules"){
                msg.react('✅');
            } 
            const filter = (reaction, user) => {
                return reaction.emoji.name === '✅' && user.id !== msg.author.id;
            };
            const collector = msg.createReactionCollector(filter);
            collector.on('collect', (reaction, user) => {
                const guild = reaction.message.guild;
                const memberWhoReacted = guild.members.cache.find(member => member.id === user.id);
                memberWhoReacted.roles.add(user_role_id);
                console.log(user.username + " added to users");
            });
        });
    }
}