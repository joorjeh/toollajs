import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env['ANTHROPIC_API_KEY'],
});

async function main() {
  const message = await anthropic.messages.create({
    max_tokens: 1024,
    model: 'claude-3-5-sonnet-20240620',
    messages: [
      {
        role: 'user',
        content: 'Hello Claude!',
      },
    ],
  });

  console.log(message);
}

main();
