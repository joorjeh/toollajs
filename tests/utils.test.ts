import {DocumentedFn} from '../src/types/DocumentedFn';
import {buildJSONSchema, parseDescription} from '../src/utils';

describe('Utility tests', () => {
  test('Convert description to JSON object correctly', () => {
    const description = `
This function adds two numbers together.
Parameters
  a (number): The first number
  b (string): The second number
  c (enum): Enum
Returns
  The sum of a and b
`;
    const schema = parseDescription(description);
    const expected = {
      fn_description: 'This function adds two numbers together.',
      parameters: {
        a: {
          type: 'number',
          description: 'The first number',
        },
        b: {
          type: 'string',
          description: 'The second number',
        },
        c: {
          type: 'enum',
          description: 'Enum',
        },
      },
    };
    expect(schema).toEqual(expected);
  });

  test('Convert description with different parameters to JSON object correctly', () => {
    const description = `
This function calculates the area of a rectangle.
Parameters
  width (number): The width of the rectangle
  height (number): The height of the rectangle
Returns
  The area of the rectangle
`;
    const schema = parseDescription(description);
    const expected = {
      fn_description: 'This function calculates the area of a rectangle.',
      parameters: {
        width: {
          type: 'number',
          description: 'The width of the rectangle',
        },
        height: {
          type: 'number',
          description: 'The height of the rectangle',
        },
      },
    };
    expect(schema).toEqual(expected);
  });

  test('Build tool schema correctly', () => {
    const add: DocumentedFn = {
      doc: `
This function adds two numbers together.
Parameters
  x (number): The first number
  y (string): The second number
Returns
  The sum of a and b
`,
      fn: (x: number, y: number): number => {
        return x + y;
      },
    };
    const actual = buildJSONSchema(add);
    const expected = {
      name: 'add',
      description: 'The function adds two numbers together',
      input_schema: {
        type: 'object',
        properties: {
          a: {
            type: 'number',
            description: 'The first number',
          },
          b: {
            type: 'number',
            description: 'The second number',
          },
        },
        required: ['a', 'b'],
      },
    };
  });

  test('Build tool schema correctly with different parameters', () => {
    const multiply: DocumentedFn = {
      doc: `
This function multiplies two numbers.
Parameters
  a (number): The first number
  b (enum): An enum
Returns
  The product of a and b
`,
      fn: (a: number, b: number): number => {
        return a * b;
      },
    };
    const actual = buildJSONSchema(multiply);
    const expected = {
      name: 'multiply',
      description: 'This function multiplies two numbers',
      input_schema: {
        type: 'object',
        properties: {
          a: {
            type: 'number',
            description: 'The first number',
          },
          b: {
            type: 'enum',
            description: 'An enum',
          },
        },
        required: ['a', 'b'],
      },
    };
  });
});
