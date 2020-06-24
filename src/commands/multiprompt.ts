import { Command, CommandStore } from 'klasa';
import type { Message } from '@klasa/core';

export default class extends Command {

	public constructor(store: CommandStore, directory: string, files: readonly string[]) {
		super(store, directory, files, {
			usage: '<arg1:str> <arg2:str> <arg3:str>',
			promptLimit: 5
		});
	}

	public async run(msg: Message, [arg1, arg2, arg3]: string[]): Promise<Message[]> {
		return msg.reply(mb => mb.setContent(`arg1: ${arg1}, arg2: ${arg2}, arg3: ${arg3}`));
	}

}
