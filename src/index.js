import fs from 'fs';
import dataImporter from './data-importer';
import {sendMessageToSlack} from './message-sender.js'

console.log(dataImporter);

sendMessageToSlack({ text: 'boom' });
