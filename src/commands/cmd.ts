import { Command, CommandStore, KlasaMessage, Usage } from 'klasa';
import type { Message } from '@klasa/core';

export default class extends Command {

	private promptTemplate: Usage;

	public constructor(store: CommandStore, directory: string, files: readonly string[]) {
		super(store, directory, files)
		this.promptTemplate = this.definePrompt('<testUser:user> <testGuild:guild>', ' ');
	}

	public async run(msg: KlasaMessage): Promise<Message[]> {
		const [user, guild] = await this.promptTemplate.createPrompt(msg).run(mb => mb.setContent(`Give me a user and guild: \`${this.promptTemplate}\``));
		return msg.send(mb => mb.setContent(`You chose ${user} and ${guild}`));
	}

};