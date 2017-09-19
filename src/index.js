import fs from 'fs';
import request from 'superagent';


request
    .get('https://www.reddit.com/r/rubyjobs/new.json')
    .set('USER-AGENT', 'node:devguild-bot:v1 (by /u/jxm262)')
    .then((resp) => {
        console.log('found data...');
        console.log('body.. ', resp.body.data.children[1]);
    })
    .catch((err) => {
        console.log('error somewhere ', err);
    });


