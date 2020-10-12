const Discord = require('discord.js');

module.exports = {
    name: 'endbattle',
    description: 'end voting for a battle',
    execute(bot, battle, battle_channel_id){
        console.info("-> END_BATTLE FOR ID " + battle.id);
        const battle_channel = bot.channels.cache.get(battle_channel_id);
        for (x in battle.submissions){
            let moji = battle.submissions[x].moji;
            let voteCollection = battle.message.reactions.cache.filter(rx => rx.emoji.name == moji);
            battle.submissions[x].votes = voteCollection.first().count - 1; // -1 for server emote
        }
        battle.submissions.sort((a, b) => (a.votes < b.votes) ? 1 : -1)
        battle.message.delete();
        battle.message = null;

        var subs = [
        ]
        for (x in battle.submissions){
            let num = parseInt(x) + 1;
            subs.push({
                name: "#" + num + ": " + battle.submissions[x].url + " (" + battle.submissions[x].votes + " votes)",
                value: "Created by " + battle.submissions[x].authorName
            });
        }

        //---------- CREATE MESSAGE FOR BATTLE END -------------//
        battle_channel.send({ embed: new Discord.MessageEmbed() // create rules embed
            .setColor('#00ee00')
            .setTitle("[ENDED] " + (battle.name || "unnamed battle") + " (ID: " + battle.id + ")")
            .setDescription("This battle has ended! Check out the winners below.")
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