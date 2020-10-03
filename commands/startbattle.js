const Discord = require('discord.js');
const battles = [];
module.exports = {
    name: 'startbattle',
    description: 'start a battle',
    execute(bot, battle_channel_id, sample_channel_id, msg, args){
        const battle_channel = bot.channels.cache.get(battle_channel_id);
        if (msg.channel.id == sample_channel_id){
            if (args.length > 1){
                msg.author.send("You have attempted to start a beat battle, but you gave me more than one piece of information. Please refer to the rules for more help.");
            }
            else{
                console.log('STARTING BATTLE')
                let sample_url = args[0];
                battles.push(sample_url);

                msg.author.send("You have initiated a battle for ...");

                battle_channel.send({ embed: new Discord.MessageEmbed() // create rules embed
                    .setColor('#ee0000')
                    .setTitle('BEAT BATTLE N')
                    .setDescription('Ending at x time')
                    .addFields(
                        { 
                            name: 'Battle Sample', 
                            value: sample_url 
                        },
                        { 
                            name: 'Submitting Entries', 
                            value: 'Submit links to your entries using `!submitentry N [entry url]`' 
                        },
                        { 
                            name: 'Note', 
                            value: 'If there is a problem, report this battle by reacting with ‼️' 
                        },
                    )
                }).then(r => {
                    r.react('‼️');
                });
            }
        } 
        else{
            msg.author.send("You have attempted to start a battle from the wrong channel. Please refer to the rules for more help.");
        }
        msg.delete();
    }
}