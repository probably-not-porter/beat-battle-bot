const Discord = require('discord.js');

module.exports = {
    name: 'voting',
    description: 'start voting for a battle',
    execute(bot, battle, battle_channel_id){
        console.log("VOTING FOR ID " + battle.id);
        const battle_channel = bot.channels.cache.get(battle_channel_id);

        // delete 'creating' message
        battle.message.delete();
        battle.message = null;
        var subs = [
            { 
                name: 'BATTLE SUBMISSIONS', 
                value: 'Listen and vote for your favorite!'
            },
        ]
        for (x in battle.submissions){
            subs.push({
                name: "#" + x+1 + ": " +battle.submissions[x].authorName + "'s submission for " + battle.name + " (ID " + battle.id + ")",
                value: battle.submissions[x].url + "\nVote for this submission with " + battle.submissions[x].moji
            });
        }

        //---------- CREATE MESSAGE FOR VOTING PERIOD -------------//
        battle_channel.send({ embed: new Discord.MessageEmbed() // create rules embed
            .setColor('#ee0000')
            .setTitle("[VOTING] " + (battle.name || "unnamed battle") + " (ID: " + battle.id + ")")
            .setDescription('Voting starts at ' + new Date(Date.now() + 86400 * 1000).toLocaleString() + ", 24 hours from start")
            .addFields(
                subs
            )
        }).then(r => {
            r.react('‼️');
            battle.message = r;
            battle = null;
        });
    }
}