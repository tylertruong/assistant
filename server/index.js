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

const workspace = {
    name: 'assistant',
    description: 'Using the assistant.'
};

// AssistantV1.createWorkspace(workspace, (err, response) => {
//     if(err){
//         console.error(err);
//     } else {
//         console.log(JSON.stringify(response));
//     }
// })

// AssistantV1.listWorkspaces((err, response) => {
//     console.log(JSON.stringify(response));
// });

app.post('/api/message', (req, res, next) => {
    console.log('req', req);
    const payload = {
        workspace_id: process.env.WORKSPACE_ID,
        context: req.body.context || {},
        input: req.body.input || {}
    };
    console.log('payload', payload);

    AssistantV1.message(payload, (err, data) => {
        console.log('data', data);
        return res.json(data);
    })
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
