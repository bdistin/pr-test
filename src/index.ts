import { KlasaClient } from 'klasa';
import * as config from './config.json';
import { CustomPlugin } from './Plugin';
import { PresenceBuilder } from '@klasa/core';
import { ActivityType } from '@klasa/dapi-types';

KlasaClient.use(CustomPlugin);

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
	},
	ws: {
		additionalOptions: {
			presence: new PresenceBuilder().setGame(gb => gb.setName('With Your Mom').setType(ActivityType.Game))
		} 
	}
});

client.token = config.token;

client.connect()
	.catch(console.error);
