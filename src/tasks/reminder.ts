import { Task, TaskData } from 'klasa';
import type { DMChannel, GuildTextChannel } from '@klasa/core';

export default class extends Task {

	public async run({ channel, user, text }: TaskData): Promise<void> {
		const _channel = this.client.channels.get(channel as string);
		if (!_channel) throw new Error('RemindMe channel could not be found.')
		await (_channel as DMChannel | GuildTextChannel).send(mb => mb.setContent(`<@${user}> You wanted me to remind you: ${text}`).parseUsers(user as string));
	}

}
