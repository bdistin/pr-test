import { Client, Plugin } from '@klasa/core';

export class CustomPlugin implements Plugin {
    public static [Client.plugin](this: Client): void {
        this.crazy = true;
    }
}

declare module '@klasa/core/dist/src/lib/client/Client' {
    interface Client {
        crazy: boolean;
    }
}
