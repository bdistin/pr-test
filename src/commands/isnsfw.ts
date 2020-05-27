import { Command, CommandStore, KlasaMessage } from 'klasa';
import type { Message } from '@klasa/core';

export default class extends Command {

	public constructor(store: CommandStore, directory: string, files: readonly string[]) {
		super(store, directory, files, {
			nsfw: true,
			description: ''
		});
	}

	public async run(msg: KlasaMessage): Promise<Message[]> {
		return msg.send(mb => mb.setContent('wew, this channel is dirty dirty...'));
	}

};
