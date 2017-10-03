import request from 'superagent';
import _ from 'lodash';
import fs from 'fs';

// fuck it i'm lazy
const AWS = require('aws-sdk');


const s3 = new AWS.S3();
const params = {
  Bucket : 'devguild',
  Key : 'leads.json'
};

export function removeUnecessaryProps(p) {
  return (({ id, selftext, title, permalink }) => ({ id, selftext, title, permalink }))(p);
}

export function filterLeads(leads) {

  return s3.getObject(params).promise()
    .then(d => {

      const oldLeads = JSON.parse(d.Body.toString('utf-8'));
      const oldLeadIds = oldLeads.map(p => p.id);

      console.log('---ids', oldLeadIds);
      console.log('--newlead ids ', leads.map(p => p.id));

      const newLeads = leads
        .filter(p => {
          console.log('p.id ', p.id);
          return !_.includes(oldLeadIds, p.id);
        })
        .map(p => removeUnecessaryProps(p));


      console.log('---new Leads filtered ', newLeads.map(p => p.id));


      // api returns 25
      const truncated = newLeads.concat(oldLeads.slice(0, 200));

      return s3.putObject(Object.assign({}, params, {Body: JSON.stringify(truncated), ContentType: 'application/json'})).promise()
        .then(p => {
          return Promise.resolve(newLeads);
        });
    })
}

export function importLeads() {
  return request
    .get('https://www.reddit.com/r/railsjobs/new.json')
    .set('USER-AGENT', 'node:devguild-bot:v1 (by /u/jxm262)')
    .then((resp) => {
      const leads = resp.body.data.children.map(p => p.data);
      return filterLeads(leads);
    })
    .catch((err) => {
      console.log('error somewhere ', err);
    });
}
