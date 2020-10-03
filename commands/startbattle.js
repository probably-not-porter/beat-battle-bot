const Discord = require('discord.js');
const battles = [];
module.exports = {
    name: 'startbattle',
    description: 'start a battle',
    execute(battle_channel_id, sample_channel_id, msg, args){
        if (msg.channel.id == sample_channel_id){
            if (args.length > 1){
                msg.author.send("You have attempted to start a beat battle, but you gave me more than one piece of information. Please refer to the rules for more help.");
            }
            else{
                // goal logic
                msg.author.send("You have initiated a battle for ...");
                let sample_url = args[0];
                battles.push(sample_url);
                //console.log(battle_channel_id, msg, args);
                console.log(battles);
            }
        } 
        else{
            msg.author.send("You have attempted to start a battle from the wrong channel. Please refer to the rules for more help.");
        }
        msg.delete();
    }
}