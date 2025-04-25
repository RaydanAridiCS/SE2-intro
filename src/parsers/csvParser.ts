import * as fs from 'fs';

export class CsvParser {
    // Method to read a CSV file and return a promise of 2D array of strings
    static async readCsv(filePath: string): Promise<string[][]> {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    return reject(err);
                }
                const rows = data.split('\n').map(row => row.split(','));
                resolve(rows);
            });
        });
    }

    // Method to write a 2D array of strings to a CSV file
    static async writeCsv(filePath: string, data: string[][]): Promise<void> {
        return new Promise((resolve, reject) => {
            const csvContent = data.map(row => row.join(',')).join('\n');
            fs.writeFile(filePath, csvContent, 'utf8', err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
}
