import * as fs from 'fs';
import { writeFile } from 'fs/promises';
import { logger } from '../util/logger';

export class JsonParser {
    static parseJson(jsonString: string): Promise<string[][]> {
        return new Promise((resolve, reject) => {
            try {
                const jsonData = JSON.parse(jsonString);
                const result = jsonData.map((obj: Record<string, unknown>) => Object.values(obj));
                resolve(result);
            } catch (error) {
                reject(new Error(`Failed to parse JSON: ${error}`));
            }
        });
    }

    static async readJson(filePath: string): Promise<string[][]> {
        try {
            const data = await fs.promises.readFile(filePath, 'utf8');
            const jsonData = JSON.parse(data);
            if (!Array.isArray(jsonData)) {
                throw new Error('Invalid JSON format: expected an array');
            }
            if (!jsonData.every(item => typeof item === 'object' && item !== null)) {
                throw new Error('Invalid JSON format: expected an array of objects');
            }
            if (jsonData.length === 0) {
                return [];
            }
            return jsonData.map((obj: Record<string, unknown>) => Object.values(obj) as string[]);
        } catch (error) {
            if (error instanceof SyntaxError) {
                throw new Error('Failed to parse JSON');
            }
            if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
                throw new Error('File read error');
            }
            const message = error instanceof Error ? error.message : String(error);
            throw new Error(message);
        }
    }

    static async writeJson(filePath: string, data: unknown): Promise<void> {
        try {
            const jsonString = JSON.stringify(data, null, 2);
            await writeFile(filePath, jsonString, 'utf8');
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            if (logger && typeof logger.error === 'function') {
                logger.error(`Error writing file`);
            }
            throw new Error(message);
        }
    }
}

