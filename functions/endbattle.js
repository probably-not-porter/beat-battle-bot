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
        console.log(battle.submissions);
        battle.message.delete();
    }
}