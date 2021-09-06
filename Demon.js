require('dotenv').config();
const Status = require('./index');

const Node = new Status.Node({
    name: process.env.NAME,
    interval: 15000,
    controller: process.env.CONTROLLER_URL,
    bearer_token: process.env.BEARER_TOKEN //Optional
});