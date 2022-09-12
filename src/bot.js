require('dotenv').config();

const { Client, GatewayIntentBits, codeBlock, inlineCode } = require('discord.js');

const bot = new Client({
    intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,]
});

const prefix = '!';

bot.on('ready', () => {
    console.log(`${bot.user.tag} has come online`);
});

bot.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }
    // if(message.content) {
    //     message.channel.send("hello");
    // }
    if (message.content.startsWith(prefix)) {
        const [ command, ...args ]  = message.content
                                        .trim()
                                        .substring(prefix.length)
                                        .split(/\s+/);
        const raffleArray = [];
        const raffleStart = Date.now();
        const raffleCooldown = 1000*60*60*24;
        switch (command) {
            case "help":
                message.channel.send(codeBlock("List of commands:\n!blowcock <subject> \n!reverseblow <subject> \n!raffle {add}"));
                break;
            case "blowcock":
                message.channel.send(`${message.author.username} is blowing ${args}'s cock`);
                break;
            case "reverseblow":
                message.reply("Get some help");
                break;
            case "raffle":
                if (args[0] === "add"){
                    raffleArray.push(message.author.tag);
                    message.channel.send(`${message.author.username} is added to the raffle`);
                }
                if (args.length === 0){
                    message.channel.send(codeBlock(`Raffle Status: ${status} \n Time Left: ${time}`));
                }
                break;
        }
    }
});

bot.login(process.env.DISCORD_BOT_TOKEN);