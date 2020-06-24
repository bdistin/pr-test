import { Command, CommandStore } from 'klasa';
import type { Message } from '@klasa/core';

export default class extends Command {

	public constructor(store: CommandStore, directory: string, files: readonly string[]) {
		super(store, directory, files, {
			cooldown: 30000
		});
	}

	public async run(msg: Message): Promise<Message[]> {
		return msg.reply(mb => mb.setContent(`yay, not ratelimited`));
	}

}
