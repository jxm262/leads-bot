import fs from 'fs';
import request from 'superagent';
import _ from 'lodash';


const leadsFile = __dirname + '/../leads.json';

export function removeUnecessaryProps(p) {
  return (({ id, selftext, title, permalink }) => ({ id, selftext, title, permalink }))(p);
}

export function filterLeads(leads) {

  const oldLeadIds = JSON
    .parse(fs.readFileSync(leadsFile, 'utf8'))
    .map(p => p.id);

  const newLeads = leads
    .filter(p => !_.includes(oldLeadIds, p.id))
    .map(p => removeUnecessaryProps(p));

  // return last 200 for now
  const truncated = newLeads.slice(0, 200);

  fs.writeFileSync(leadsFile, JSON.stringify(truncated), 'utf8');

  return truncated;
}

export function importLeads() {
  return request
    .get('https://www.reddit.com/r/rubyjobs/new.json')
    .set('USER-AGENT', 'node:devguild-bot:v1 (by /u/jxm262)')
    .then((resp) => {
      const leads = resp.body.data.children.map(p => p.data);

      console.log('1st entry for troubleshooting purposes - ', leads[0]);

      const filteredLeads = filterLeads(leads);

      return Promise.resolve(filteredLeads);
    })
    .catch((err) => {
      console.log('error somewhere ', err);
    });
}
