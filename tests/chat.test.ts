import {Message} from '@anthropic-ai/sdk/resources';
import {Chat} from '../src/chat';

describe('Test Chat class', () => {
  test('Sanity check', () => {
    const chat = new Chat();
    chat.call('Hello').then((message: Message): void => {
      expect(message.stop_reason).toEqual('end_turn');
    });
  });
});
