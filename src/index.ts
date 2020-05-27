import { KlasaClient } from 'klasa';
import * as config from './config.json';

const client = new KlasaClient({
	commands: {
		prefix: '!',
		logging: true,
		editing: true,
		messageLifetime: 600000
	},
	rest: {
		offset: 0
	},
	consoleEvents: {
		debug: true
	},
	cache: {
		messageLifetime: 300000,
		messageSweepInterval: 60000
	}
});

client.token = config.token;

client.connect()
	.catch(console.error);
