const Discord = require('discord.js');

var battle = null;
var battle_id = 0;

module.exports = {
    name: 'startbattle',
    description: 'manage battles',
    execute(bot, battles, battle_channel_id, sample_channel_id, msg, args){
        const battle_channel = bot.channels.cache.get(battle_channel_id);
        if (msg.channel.id == sample_channel_id){
            if (args.length != 2){
                msg.author.send("You have attempted to start a beat battle, but did something wrong. Please refer to the rules for more help.");
            }
            else{
                console.log('STARTING BATTLE')
                let sample_url = args[1];
                let battle_name = args[0];
                battle_id++;

                msg.author.send("You have successfully started battle with ID " + battle_id + ". Your battle will go to voting in 24 hours." );
                battle = {
                    url: sample_url,
                    id: battle_id,
                    name: battle_name,
                    submissions: [],
                    message: null,
                    //voting: new Date(Date.now() + 86400 * 1000),
                    //end: new Date(Date.now() + 86400 * 1000 * 2),
                    voting: new Date(Date.now() + 20000),
                    end: new Date(Date.now() + 40000),
                    state: 0 // 0 = creating, 1 = voting, 2 = ended
                };

                
                //---------- CREATE MESSAGE FOR CREATION PERIOD -------------//
                battle_channel.send({ embed: new Discord.MessageEmbed() // create rules embed
                    .setColor('#ee0000')
                    .setTitle("[CREATING] " + (battle.name || "unnamed battle") + " (ID: " + battle.id + ")")
                    .setDescription('Voting starts at ' + new Date(Date.now() + 86400 * 1000).toLocaleString() + ", 24 hours from start")
                    .addFields(
                        { 
                            name: 'Battle Sample', 
                            value: battle.url
                        },
                        { 
                            name: 'Submitting Entries', 
                            value: 'Submit links to your entries using `!submitentry '+ battle.id +' [entry url]`' 
                        },
                        { 
                            name: 'Note', 
                            value: 'If there is a problem with the sample link, or this battle does not follow the rules of the server, please let us know by reporting this battle by reacting with ‼️' 
                        },
                    )
                }).then(r => {
                    r.react('‼️');
                    battle.message = r;
                    battles.push(battle);
                    battle = null;
                });
            }
        } 
        else{
            msg.author.send("You have attempted to start a battle from the wrong channel. Please refer to the rules for more help.");
        }
        msg.delete();
    }
}