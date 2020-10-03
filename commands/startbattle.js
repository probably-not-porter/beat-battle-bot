const Discord = require('discord.js');
module.exports = {
    name: 'startbattle',
    description: 'start a battle',
    execute(battle_channel_id, sample_channel_id, msg, args){
        if (msg.channel.id == sample_channel_id){
            console.log('BATTLE STARTED');
            console.log(battle_channel_id, msg, args);
        } 
        else{
            msg.delete();
            console.log('wrong channel');
        }
    }
}