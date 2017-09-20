import { importLeads } from './data-importer';
import { sendMessageToSlack } from './message-sender.js'


function sendLeads(leads) {
  leads.slice(0, 5).forEach(lead => {
    const msg = `Title: <https://www.reddit.com${lead.permalink}|${lead.title}>`;
    const description = `${lead.selftext || '- no description -'}`;
    sendMessageToSlack({ text: msg, attachments: [{ text: description }] });
  });
  console.log('done..');
};

importLeads()
  .then(p => sendLeads(p));
