import { join } from 'path';
import { default as fs } from 'fs';
import { jsonParse } from '@sashahohloma/utilities';

export const manifest = (publicPath: string, filepath: string): string => {
    const file = fs.readFileSync(join(publicPath, '/manifest.json')).toString();
    const manifest = jsonParse<Record<string, string>>(file);
    return manifest[filepath];
};
