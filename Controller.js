require('dotenv').config();
const Status = require('./index');

const Controller = new Status.Controller(process.env.PORT, 'en', {
    discord: {
        token: process.env.TOKEN,
        channel: process.env.CHANNEL,
    },
    pterodactyl: {
        panel: process.env.PANEL_URL,
        apiKey: process.env.PANEL_API_KEY
    },
    telegram: {
        tgtoken: process.env.TELEGRAM_TOKEN,
        tgchatID: process.env.TELEGRAM_CHATID
    },
    notifications: {
        discord: process.env.DISCORD_WEBHOOK,
        webhook: 'http://0.0.0.0:5000/webhook'
    },
    node: {
        message: '**{node.name}**: [Memory: {node.memory.used}/{node.memory.total}] [Disk: {node.disk.used}/{node.disk.total}]',
        online: '🟢',
        offline: '🔴'
    },
    embed: {
        color: '#06cce2',
        title: 'Node Status',
        description: '**Nodes**:\n{nodes.list}\n\n**Total**:\nMemory: {memory.used}/{memory.total}\nDisk: {disk.used}/{disk.total}\n\n**Pterodactyl:**\nUsers: {pterodactyl.users}\nServers: {pterodactyl.servers}',
        footer: {
            text: 'Last updated: {lastupdated}',
            icon: 'https://ebg.pw/images/EBG.png'
        }
    },
    interval: 15000,
    bearer_token: process.env.BEARER_TOKEN //Optional
});

Controller.on('online', (node) => {
    console.log(`Node: "${node.nodeName}" has come back online!`);
});

Controller.on('offline', (node) => {
    console.log(`Node: "${node.nodeName}" has gone offline!`);
});