import {Tool} from '@anthropic-ai/sdk/resources';
import {DocumentedFn} from './types/DocumentedFn';

interface Parameter {
  type: string;
  description: string;
}

interface ParsedDescription {
  fn_description: string;
  parameters: Record<string, Parameter>;
}

export function parseDescription(description: string): ParsedDescription {
  const lines = description.trim().split('\n');
  const result: ParsedDescription = {
    fn_description: lines[0].trim(),
    parameters: {},
  };

  let currentParam: string | null = null;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('Parameters')) continue;
    if (line.startsWith('Returns')) break;

    const paramMatch = line.match(/(\w+)\s+\((\w+)\):\s+(.*)/);
    if (paramMatch) {
      const [, name, type, desc] = paramMatch;
      result.parameters[name] = {type, description: desc};
      currentParam = name;
    } else if (currentParam) {
      result.parameters[currentParam].description += ' ' + line;
    }
  }

  return result;
}

export const buildJSONSchema = (f: DocumentedFn): void => {
  const fn_metadata = parseDescription(f.doc);
  const schema = {
    name: f.fn.name,
    description: fn_metadata.fn_description,
    input_schema: {
      type: 'object',
      properties: fn_metadata.parameters,
      required: Object.keys(fn_metadata.parameters),
    },
  };
};
