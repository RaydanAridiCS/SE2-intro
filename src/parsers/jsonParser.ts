import * as fs from 'fs';

export class JsonParser {

    static async readJson(filePath: string): Promise<string[][]> {
        try {
            const data = await fs.promises.readFile(filePath, 'utf8');
            const jsonData = JSON.parse(data);
            console.log(jsonData);
            if (!Array.isArray(jsonData)) {
                throw new Error('Invalid JSON format: expected an array of objects');
            }
            return jsonData.map((obj: object) => Object.values(obj).map(String));
        } catch (error) {
            if (typeof error === 'object' && error !== null && 'code' in error && (error).code === 'ENOENT') return [];
            throw new Error('Invalid JSON format: expected an array of objects');
        }
    }

}
