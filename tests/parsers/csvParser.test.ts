import * as fs from 'fs/promises';
import * as path from 'path';
import { CsvParser } from '../../src/parsers/csvParser'; 

// Test file paths
const TEST_DIR = path.join(__dirname, 'test-data');
const TEST_READ_FILE = path.join(TEST_DIR, 'test-read.csv');
const TEST_WRITE_FILE = path.join(TEST_DIR, 'test-write.csv');

// Sample CSV data
const TEST_DATA = [
    ['Name', 'Age', 'City'],
    ['Alice', '30', 'New York'],
    ['Bob', '25', 'London']
];

describe('CsvParser', () => {
    beforeAll(async () => {
        // Create test directory if it doesn't exist
        await fs.mkdir(TEST_DIR, { recursive: true });
        
        // Create test CSV file for reading tests
        await fs.writeFile(TEST_READ_FILE, TEST_DATA.map(row => row.join(',')).join('\n'));
    });

    afterAll(async () => {
        // Clean up test files
        try {
            await fs.rm(TEST_DIR, { recursive: true, force: true });
        } catch (error) {
            console.error('Cleanup error:', error);
        }
    });

    describe('readCsv', () => {
        it('should read CSV file and return 2D array', async () => {
            const result = await CsvParser.readCsv(TEST_READ_FILE);
            expect(result).toEqual(TEST_DATA);
        });

        it('should reject when file does not exist', async () => {
            const nonExistentFile = path.join(TEST_DIR, 'nonexistent.csv');
            await expect(CsvParser.readCsv(nonExistentFile)).rejects.toThrow();
        });

        it('should handle empty CSV file', async () => {
            const emptyFile = path.join(TEST_DIR, 'empty.csv');
            await fs.writeFile(emptyFile, '');
            const result = await CsvParser.readCsv(emptyFile);
            expect(result).toEqual([['']]); 
            await fs.unlink(emptyFile);
        });
    });

    describe('writeCsv', () => {
        it('should write data to CSV file', async () => {
            await CsvParser.writeCsv(TEST_WRITE_FILE, TEST_DATA);
            const fileContent = await fs.readFile(TEST_WRITE_FILE, 'utf8');
            const expectedContent = TEST_DATA.map(row => row.join(',')).join('\n');
            expect(fileContent).toBe(expectedContent);
        });

        it('should create file if it does not exist', async () => {
            const newFile = path.join(TEST_DIR, 'newfile.csv');
            await CsvParser.writeCsv(newFile, TEST_DATA);
            const fileExists = await fs.access(newFile).then(() => true).catch(() => false);
            expect(fileExists).toBe(true);
        });

        it('should overwrite existing file', async () => {
            // First write
            await CsvParser.writeCsv(TEST_WRITE_FILE, [['Initial', 'Data']]);
            
            // Second write with different data
            await CsvParser.writeCsv(TEST_WRITE_FILE, TEST_DATA);
            
            // Verify second write took effect
            const fileContent = await fs.readFile(TEST_WRITE_FILE, 'utf8');
            expect(fileContent).not.toContain('Initial,Data');
            expect(fileContent).toContain('Alice,30,New York');
        });
    });
});