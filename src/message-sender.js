import request from 'superagent';

function sendMessageToSlack(msg, webHookUrl = "https://hooks.slack.com/services/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") {
  request
    .post(webHookUrl)
    .send(msg)
    .set('Accept', 'application/json')
    .end(function (err, res) {
      if (err) {
        console.log('some error.. ', err)
      }
      else {
        console.log('done.. ');
      }
    });
}


export { sendMessageToSlack };