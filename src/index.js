import { importLeads } from './data-importer';
import { sendMessageToSlack } from './message-sender.js'


exports.handler = function (event, context, callback) {

  function sendLeads(leads) {
    console.log('---new ledas ', leads.length);
    leads.forEach(lead => {
      const msg = `Title: <https://www.reddit.com${lead.permalink}|${lead.title}>`;
      const description = `${lead.selftext || '- no description -'}`;
      sendMessageToSlack({ text: msg, attachments: [{ text: description }] });
    });
  };

  importLeads()
    .then(p => sendLeads(p))
    .catch(e => {
      console.log('some err ', e);
      callback(e);
    });

};