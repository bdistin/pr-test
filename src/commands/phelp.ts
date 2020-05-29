import { Command, RichMenu, CommandStore } from 'klasa';
import { Embed, Message } from '@klasa/core';

export default class extends Command {

	public constructor(store: CommandStore, directory: string, files: readonly string[]) {
		super(store, directory, files, { description: 'tests RichMenu.' });
	}

	async run(msg: Message): Promise<Message[]> {
		const album = new RichMenu({ template: new Embed().setColor(0xff00ff) });

		for (const command of this.client.commands.values()) {
			album.addChoice(command.name, typeof command.description === 'function' ? command.description(msg.language) : command.description || 'empty');
		}

		const response = await msg.send(mb => mb.setEmbed(em => em.setTitle('loading')));
		const handler = await album.run(response[0], { filter: ([_reaction, user]) => user === msg.author });
	
		handler.selection.then(choice => {
			if (response[0].deleted === true) return; 
			if (choice === null) return response[0].delete();
			const chosenCommand = this.client.commands.get(album.choices[choice].name);

			if (chosenCommand) {
				const embed = new Embed()
					.setColor(0xff00ff)
					.setTitle(chosenCommand.usage.fullUsage(msg))
					.setDescription([
						typeof chosenCommand.description === 'function' ? chosenCommand.description(msg.language) : chosenCommand.description,
						'',
						`**${msg.language.get('COMMAND_HELP_EXTENDED')}**`,
						typeof chosenCommand.extendedHelp === 'function' ? chosenCommand.extendedHelp(msg.language) : chosenCommand.extendedHelp
					].join('\n'));
				return response[0].edit(mb => mb.setEmbed(embed));
			}
		});

		return response;
	}

};
