const moment = require('moment');
const discord = require('discord.js');

process.on('unhandledRejection', (error, promise) => {
    console.error(moment().format('H:mm'), 'Unhandled promise rejection:', promise);
});

const ClientFile = require("./functions/client");
const client = ClientFile.GetClient();

client.once("ready", async () => {
    console.log(client.user.tag + " is online");
    client.user.setActivity("['null', 'null gif', 'anime', 'anime gif', 'bobr'] to get a response", { type: discord.ActivityType.Watching })
})

const nullText = require("./messageResponses/NULLResponses.json")
const nullGif = require("./messageResponses/NULLGifs.json")
const animeText = require("./messageResponses/Anime.json");
const animeGif = require("./messageResponses/AnimeGifs.json");
const bobrGif = require("./messageResponse/BobrGifs.json");

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    const msgContent = message.content.toLowerCase()

    const isAnime = msgContent.includes("anime");
    const isNull = msgContent.includes("null");
    const isGif = msgContent.includes("gif");
    const isBobr = msgContent.includes("bobr");

    if (isAnime && isGif) return replyToMessage(message, getRandomLine(animeGif));
    if (isNull && isGif) return replyToMessage(message, getRandomLine(nullGif));
    if (isBobr) return replyToMessage(message, getRandomLine(bobrGif));

    if (isAnime) return replyToMessage(message, getRandomLine(animeText));
    if (isNull) return replyToMessage(message, getRandomLine(nullText));
})

function getRandomLine(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function replyToMessage(message, reply) {
    message.reply(reply);
}
