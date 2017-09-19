import fs from 'fs';
import request from 'superagent';


// request
//     .get('https://www.reddit.com/r/rubyjobs/new.json')
//     .set('USER-AGENT', 'node:devguild-bot:v1 (by /u/jxm262)')
//     .then((resp) => {
//         console.log('found data...');
//         console.log('body.. ', resp.body.data.children[1]);
//     })
//     .catch((err) => {
//         console.log('error somewhere ', err);
//     });



function sendMessageToSlack(msg, webHookUrl="https://hooks.slack.com/services/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") {
  request
   .post(webHookUrl)
   .send(msg)
   .set('Accept', 'application/json')
   .end(function(err, res){
    
   });
}    

 sendMessageToSlack({ text: 'another one bites the dust' });