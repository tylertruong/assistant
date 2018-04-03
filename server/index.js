require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const watson = require('watson-developer-cloud');

const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const AssistantV1 = new watson.AssistantV1({
    username: process.env.ASSISTANT_USERNAME,
    password: process.env.ASSISTANT_PASSWORD,
    url: 'https://gateway.watsonplatform.net/assistant/api',
    version: '2018-02-16',
});

app.get('/test', (req, res, next) => {
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
