const Discord = require("discord.js");


const client = new Discord.Client({
    owner: '285887620813160450'
});


const config = require("./config.json");

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);

  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {

  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {

  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});


client.on("message", async message => {

  if(message.author.bot) return;

  if(message.content.indexOf(config.prefix) !== 0) return;


  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  if(command === "ping") {

    const m = await message.channel.send("Ping?");
    m.edit(`Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  if(command === "e") {
    if (message.author.id !== '285887620813160450')
    return;
    const sayMessage = args.join(" ");

    message.delete().catch(O_o=>{});

    message.channel.send({embed:{
      color: 0x000000,
      description: sayMessage
    }})
  }

  if(message.content.startsWith(config.prefix+"8ball")) {
      if (message.author.id !== '285887620813160450')
    return;
    if(!args[2]) return message.reply("Please ask a full quesition");
    let replies = ["Yes", "No", "I don't know", "Ask later again"];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");

    let ballembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor("#0FF469")
    .addField("Question", question)
    .addField("Answer", replies[result]);

      message.channel.send(ballembed);
 }

   if(command === "a") {
    if (message.author.id !== '285887620813160450')
    return;
    const sayMessage = args.join(" ");

    message.delete().catch(O_o=>{});

    message.channel.send(sayMessage)
  }

});

client.login(process.env.BOT_TOKEN);
