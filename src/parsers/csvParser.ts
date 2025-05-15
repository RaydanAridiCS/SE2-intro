import * as fs from 'fs';

export class CsvParser {
    
    // Method to read a CSV file and return a promise of array of row strings, removing surrounding quotes
    static async readCsv(filePath: string, skipFirstLine: boolean = false): Promise<string[][]> {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    return reject(err);
                }
                const rows = data.split(/\r?\n/);

                // Remove the last line if it's empty or just whitespace
                if (rows.length > 0 && rows[rows.length - 1].trim() === '') {
                    rows.pop();
                }

                let parsedRows = rows.map(row =>
                    row.split(',').map(cell =>
                        cell.replace(/^"(.*)"$/, '$1').trim()
                    )
                );
                if (skipFirstLine) {
                    parsedRows = parsedRows.slice(1);
                }
                resolve(parsedRows);
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
