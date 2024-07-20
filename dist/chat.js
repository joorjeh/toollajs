"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
class Chat {
    constructor(model = 'claude-3-5-sonnet-20240620', max_tokens = 4096) {
        this.model = model;
        this.max_tokens = max_tokens;
        this.client = new sdk_1.default({
            apiKey: process.env['ANTHROPIC_API_KEY'],
        });
    }
    call(prompt) {
        this.client.messages
            .create({
            max_tokens: this.max_tokens,
            model: 'claude-3-5-sonnet-20240620',
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        })
            .then(console.log);
    }
}
const chat = new Chat();
chat.call('Hello');
