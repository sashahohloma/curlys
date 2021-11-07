import { join } from 'path';
import { promises as fs } from 'fs';
import { default as appRootPath } from 'app-root-path';

export const readSeedsFile = async(filename: string): Promise<string> => {
    const seedsPath = appRootPath.resolve('/source/database/seeds');
    const filePath = join(seedsPath, '/', filename);

    const file = await fs.readFile(filePath);
    return file.toString();
};
