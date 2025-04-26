import * as fs from 'fs/promises';
import { parseString } from 'xml2js';
import logger from '../util/logger';

export class XmlParser {

        /**
         * Parse any XML file to a 2D string array.
         * The first row is the column names and subsequent rows are the values.
         * @param filePath Path to XML file
         * @returns Promise resolving to 2D string array
         */
        static async readXml(filePath: string): Promise<string[][]> {
            try {
            const xmlData = await fs.readFile(filePath, 'utf8');
            const parsedData = await new Promise<Record<string, Record<string, Array<Record<string, string[]>>>>>((resolve, reject) => {
                parseString(xmlData, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
                });
            });

            // Extract data and column names
            const rootKey = Object.keys(parsedData)[0];
            const items = parsedData[rootKey] as Record<string, Array<Record<string, string[]>>>;
            const columnNames = Object.keys(items[Object.keys(items)[0]][0]);

            const result: string[][] = [columnNames];

            // Extract values for each item, trimming whitespace/newlines
            for (const itemKey in items) {
                if (Array.isArray(items[itemKey])) {
                items[itemKey].forEach((item: Record<string, string[]>) => {
                    const row: string[] = columnNames.map(col =>
                    (item[col]?.[0] || '').trim()
                    );
                    result.push(row);
                });
                }
            }

            logger.info(`Successfully parsed XML from: ${filePath}`);
            return result;
            } catch (error) {
            const errorMessage = `Error parsing XML ${filePath}: ${
                error instanceof Error ? error.message : error
            }`;
            logger.error(errorMessage);
            throw new Error(errorMessage);
            }
        }
}