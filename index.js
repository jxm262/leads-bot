import request from 'superagent';


request
    .get('https://www.reddit.com/r/rubyjobs/new.json')
    .set('USER-AGENT', 'node:devguild-bot:v1 (by /u/jxm262)')
    .then((resp) => {
        // response should look something like -
        // {
        //     "access_token": "J1qK1c18UUGJFAzz9xnH56584l4",
        //     "expires_in": 3600,
        //     "scope": "*",
        //     "token_type": "bearer"
        // }

        console.log('found data...');
        console.log('body.. ', resp.body);
    })
    .catch((err) => {
        console.log('error somewhere ', err);
    });
