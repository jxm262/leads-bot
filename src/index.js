import fs from 'fs';
import request from 'superagent';
import dataImporter from './data-importer';

console.log(dataImporter);


function sendMessageToSlack(msg, webHookUrl="https://hooks.slack.com/services/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") {
  request
   .post(webHookUrl)
   .send(msg)
   .set('Accept', 'application/json')
   .end(function(err, res){
    
   });
}    

 sendMessageToSlack({ text: 'another one bites the dust' });
