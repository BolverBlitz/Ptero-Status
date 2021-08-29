const Status = require('../index');
const express = require('express');
require('dotenv').config();

const Controller = new Status.Controller(4000, {
    discord: {
        token: process.env.TOKEN,
        channel: '873288453377384538',
    },
    pterodactyl: {
        panel: 'https://panel.bluefoxhost.com',
        apiKey: process.env.PANEL_API_KEY
    },
    notifications: {
        discord: process.env.DISCORD_WEBHOOK,
        webhook: 'http://0.0.0.0:5000/webhook'
    },
    node: {
        message: '**{node.name}**: {node.status} -> [Memory: {node.memory.used}/{node.memory.total}] [Disk: {node.disk.used}/{node.disk.total}]',
        online: '🟢 **ONLINE**',
        offline: '🔴 **OFFLINE**'
    },
    embed: {
        color: '#06cce2',
        title: 'Status',
        description: '**Nodes**:\n{nodes.list}\n\n**Total**:\nMemory: {memory.used}/{memory.total}\nDisk: {disk.used}/{disk.total}\n\n**Pterodactyl:**\nUsers: {pterodactyl.users}\nServers: {pterodactyl.servers}',
        thumbnail: 'https://i.imgur.com/9b1qwml.jpg',
        footer: {
            text: 'BlueFoxHost',
            icon: 'https://i.imgur.com/9b1qwml.jpg'
        }
    },
    port: 4000,
    interval: 15000

});

Controller.on('online', (node) => {
    console.log(`Node: "${node.nodeName}" has come back online!`);
});

Controller.on('offline', (node) => {
    console.log(`Node: "${node.nodeName}" has gone offline!`);
});

const Node1 = new Status.Node({
    name: 'Node1',
    interval: 5000,
    controller: 'http://0.0.0.0:4000'
});

// Test the node stopping
setTimeout(function() {
    Node1.stop();

    // Test a new node
    const Node2 = new Status.Node({
        name: 'Node2',
        interval: 5000,
        controller: 'http://0.0.0.0:4000'
    });

}, 20000);

// Webhook server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/webhook', (req, res) => {
    console.log('Webhook recieved!')
});

app.listen(5000);