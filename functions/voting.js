const Discord = require('discord.js');

module.exports = {
    name: 'voting',
    description: 'start voting for a battle',
    execute(bot, battle, battle_channel_id){
        console.info("-> VOTE_BATTLE FOR ID " + battle.id);
        const battle_channel = bot.channels.cache.get(battle_channel_id);

        // delete 'creating' message
        battle.message.delete();
        battle.message = null;
        var subs = [
            { 
                name: 'BATTLE SUBMISSIONS', 
                value: 'Listen to each and vote for your favorite!'
            },
        ]
        for (x in battle.submissions){
            subs.push({
                name: battle.submissions[x].url,
                value: "Vote for this submission with " + battle.submissions[x].moji
            });
        }

        //---------- CREATE MESSAGE FOR VOTING PERIOD -------------//
        battle_channel.send({ embed: new Discord.MessageEmbed() // create rules embed
            .setColor('#0000ee')
            .setTitle("[VOTING] " + (battle.name || "unnamed battle") + " (ID: " + battle.id + ")")
            .setDescription('Voting starts at ' + new Date(Date.now() + 86400 * 1000).toLocaleString() + ", 24 hours from start")
            .addFields(
                subs
            )
        }).then(r => {
            r.react('‼️');
            for (x in battle.submissions){
                r.react(battle.submissions[x].moji)
            }
            battle.message = r;
            battle = null;
        });
    }
}