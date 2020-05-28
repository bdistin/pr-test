import { Command, CommandStore } from 'klasa';
import type { Message } from '@klasa/core';

export default class extends Command {

	public constructor(store: CommandStore, directory: string, files: readonly string[]) {
		super(store, directory, files, {
			description: 'creates a reminder',
			usage: '<when:time> <text:...str>',
			usageDelim: ', '
		});
	}

	public async run(msg: Message, [when, text]: [Date, string]): Promise<Message[]> {
		const reminder = await this.client.schedule.create('reminder', when, {
			data: {
				channel: msg.channel.id,
				user: msg.author.id,
				text: text
			}
		});
		return msg.send(mb => mb.setContent(`Ok, I created you a reminder with the id: \`${reminder!.id}\``));
	}

};
