// import * as fs from 'fs';
// import * as path from 'path';
// import { CsvParser } from '../src/parsers/csvParser'; 

// jest.mock('fs');

// describe('CsvParser', () => {
//     const mockFilePath = path.join(__dirname, '../data/test.csv');
//     const mockData = [
//         ['Name', 'Age', 'City'],
//         ['Alice', '30', 'New York'],
//         ['Bob', '25', 'Los Angeles'],
//     ];
//     const mockCsvContent = 'Name,Age,City\nAlice,30,New York\nBob,25,Los Angeles';

//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     describe('readCsv', () => {
//         it('should read a CSV file and return a 2D array of strings', async () => {
//             (fs.readFile as jest.Mock).mockImplementation((filePath, encoding, callback) => {
//                 callback(null, mockCsvContent);
//             });

//             const result = await CsvParser.readCsv(mockFilePath);
//             expect(result).toEqual(mockData);
//             expect(fs.readFile).toHaveBeenCalledWith(mockFilePath, 'utf8', expect.any(Function));
//         });

//         it('should throw an error if the file cannot be read', async () => {
//             const mockError = new Error('File not found');
//             (fs.readFile as jest.Mock).mockImplementation((filePath, encoding, callback) => {
//                 callback(mockError, null);
//             });

//             await expect(CsvParser.readCsv(mockFilePath)).rejects.toThrow('File not found');
//             expect(fs.readFile).toHaveBeenCalledWith(mockFilePath, 'utf8', expect.any(Function));
//         });
//     });

//     describe('writeCsv', () => {
//         it('should write a 2D array of strings to a CSV file', async () => {
//             (fs.writeFile as jest.Mock).mockImplementation((filePath, data, encoding, callback) => {
//                 callback(null);
//             });

//             await CsvParser.writeCsv(mockFilePath, mockData);
//             expect(fs.writeFile).toHaveBeenCalledWith(mockFilePath, mockCsvContent, 'utf8', expect.any(Function));
//         });

//         it('should throw an error if the file cannot be written', async () => {
//             const mockError = new Error('Write error');
//             (fs.writeFile as jest.Mock).mockImplementation((filePath, data, encoding, callback) => {
//                 callback(mockError);
//             });

//             await expect(CsvParser.writeCsv(mockFilePath, mockData)).rejects.toThrow('Write error');
//             expect(fs.writeFile).toHaveBeenCalledWith(mockFilePath, mockCsvContent, 'utf8', expect.any(Function));
//         });
//     });
// });