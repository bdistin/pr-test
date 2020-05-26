import { KlasaClient } from 'klasa';
import * as config from './config.json';

const client = new KlasaClient({ commands: { prefix: '!', logging: true, editing: true }, rest: { offset: 0 } });

client.token = config.token;

client.connect()
	.catch(console.error);
