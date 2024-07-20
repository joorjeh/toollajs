import Anthropic from '@anthropic-ai/sdk';
import { Message } from '@anthropic-ai/sdk/resources';

class Chat {
  private model: string;
  private max_tokens: number;
  private client: Anthropic;
  private messages: Message[];

  constructor(model = 'claude-3-5-sonnet-20240620', max_tokens = 4096) {
    this.model = model;
    this.max_tokens = max_tokens;
    this.client = new Anthropic({
      apiKey: process.env['ANTHROPIC_API_KEY'],
    });
    this.messages = [];
  }

  public call(prompt: string): void {
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
      .then((message: Message) => {
        this.messages.push(message);
        console.log(message);
      });
  }
}

//const chat = new Chat();
//chat.call('Hello');
