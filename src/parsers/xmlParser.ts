import * as fs from 'fs/promises';
import { parseString } from 'xml2js';
import logger from '../util/logger';

export class XmlParser {
    private static readonly EXPECTED_COLUMNS = [
        'OrderID',
        'Type',
        'AgeGroup',
        'Brand',
        'Material',
        'BatteryRequired',
        'Educational',
        'Price',
        'Quantity'
    ];

    /**
     * Parse toy order XML file to 2D string array
     * @param filePath Path to XML file
     * @returns Promise resolving to 2D string array
     */
    static async readXml(filePath: string): Promise<string[][]> {
        try {
            const xmlData = await fs.readFile(filePath, 'utf8');
            const parsedRows = await this.parseXml(xmlData);
            
            // Validate that all required columns have values
            for (const row of parsedRows) {
                if (row.some((value, index) => !value && this.EXPECTED_COLUMNS[index] === 'OrderID')) {
                    throw new Error('Invalid XML structure - missing columns');
                }
            }
            
            logger.info(`Successfully parsed toy orders from: ${filePath}`);
            return parsedRows;
        } catch (error) {
            const errorMessage = `Error parsing toy orders XML ${filePath}: ${
                error instanceof Error ? error.message : error
            }`;
            logger.error(errorMessage);
            throw new Error(errorMessage);
        }
    }

    static async parseXml(xmlData: string): Promise<string[][]> {
        return new Promise((resolve, reject) => {
            parseString(xmlData, { explicitArray: false }, (err, result) => {
                if (err) return reject(err);

                try {
                    if (!result?.data?.row) {
                        throw new Error('Invalid XML structure - missing columns');
                    }

                    const rowArray = Array.isArray(result.data.row) ? result.data.row : [result.data.row];
                    const rows = rowArray.map((row: Record<string, { _: string } | string>) => 
                        this.EXPECTED_COLUMNS.map(column => {
                            const value = row[column];
                            if (typeof value === 'object' && value && '_' in value) {
                                return value._.toString().trim();
                            }
                            return typeof value === 'string' ? value.trim() : '';
                        })
                    );

                    resolve(rows);
                } catch (parseError) {
                    reject(parseError);
                }
            });
        });
    }
}