module.exports = {
    name: 'submitentry',
    description: 'submit a link to a battle',
    execute(battles, msg, args){
        var mojis = [ // voting emojis
            '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝'
        ];
        if (args.length != 2){
            msg.author.send("You have attempted to submit an entry to a beat battle, but did something wrong. Please refer to the rules for more help.");
        }
        else{
            console.info("-> ENTRY_SUBMIT TO ID " + args[0]);
            let id = args[0];
            let url = args[1];
            let ind= null;
            for (x in battles){
                if (battles[x].id == id){
                    ind = x;
                }
            }
            if (ind == null){
                msg.author.send("You have attempted to submit an entry to a beat battle that does not exist, or has ended. Please refer to the rules for more help.");
            }
            else if (battles[ind].submissions.length == 15){
                msg.author.send("This battle is full! Sorry about that!");
            }
            else{
                let moji = [Math.floor(Math.random()*mojis.length)];
                while (battles[ind].mojis.includes(moji)){ // make sure moji is not already in use
                    moji = mojis[Math.floor(Math.random()*mojis.length)];
                }
                    
                battles[ind].submissions.push({
                    url: url,
                    authorId: msg.author.id,
                    authorName: msg.author.username,
                    moji: moji,
                    votes: null
                });

                battles[ind].mojis.push(moji);
                msg.author.send("You have successfully submitted an entry to battle " + battles[ind].name + " (ID: " + battles[ind].id + ")");
            }

        }

        msg.delete();
    }
}