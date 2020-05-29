import { Command, RichDisplay, CommandStore, ReactionHandler } from 'klasa';
import { PermissionsFlags, Message } from '@klasa/core';
import { Cache } from '@klasa/cache';
import { ChannelType } from '@klasa/dapi-types';

const images = [
	'https://s.hdnux.com/photos/06/44/73/1724123/3/975x0.jpg',
	'https://upload.wikimedia.org/wikipedia/en/thumb/c/c0/Samuel_L_Jackson_as_Nick_Fury.jpg/200px-Samuel_L_Jackson_as_Nick_Fury.jpg',
	'http://nerdist.com/wp-content/uploads/2016/07/Mace-Windu.jpg'
];

export default class extends Command {

	private album = new RichDisplay({ template: embed => embed.setTitle('test cool album').setColor(0xffff00) });
	private handlers = new Cache<string, ReactionHandler>();

	public constructor(store: CommandStore, directory: string, files: readonly string[]) {
		super(store, directory, files, {
			description: 'tests RichDisplay.',
			requiredPermissions: [PermissionsFlags.EmbedLinks, PermissionsFlags.AddReactions, PermissionsFlags.ManageMessages, PermissionsFlags.ReadMessageHistory],
			runIn: [ChannelType.GuildText]
		});
		for (const image of images) this.album.addPage(embed => embed.setImage(image));
	}

	public async run(msg: Message): Promise<Message[]> {
		const existing = this.handlers.get(msg.channel.id);
		if (existing) existing.stop();
		const displayMessage = await msg.send(mb => mb.setEmbed(em => em.setTitle('loading')));
		const handler = await this.album.run(displayMessage[0], {
			idle: 30000,
			filter: ([_reaction, user]) => user === msg.author,
			onceDone: () => {
				this.handlers.delete(msg.channel.id);
			}
		});
		this.handlers.set(msg.channel.id, handler);
		return displayMessage;
	}

};
