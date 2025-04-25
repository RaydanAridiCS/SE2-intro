import * as fs from 'fs/promises'; 
import { JsonParser } from '../src/parsers/jsonParser'; 
import logger from '../src/util/logger'; 

// Mock the entire fs/promises module
jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
}));

// Mock the logger module assuming a default export with error method
jest.mock('../src/util/logger', () => ({
  __esModule: true, // This line is important for default exports
  default: {
    error: jest.fn(),
  },
}));


// Cast the mocked fs.promises functions for easier typing
const mockedReadFile = fs.readFile as jest.Mock;
const mockedWriteFile = fs.writeFile as jest.Mock;
// Cast the mocked logger.error function
const mockedLoggerError = logger.error as jest.Mock;


describe('JsonParser', () => {

  // Reset mocks before each test
  beforeEach(() => {
    // Using mockReset to clear calls and reset behavior
    mockedReadFile.mockReset();
    mockedWriteFile.mockReset();
    mockedLoggerError.mockReset();
  });

  describe('parseJson', () => {
    it('should parse a valid JSON string and return values as array of arrays', async () => {
      const jsonString = '[{"name": "Alice", "age": 30}, {"name": "Bob", "age": 25}]';
      const expected = [['Alice', 30], ['Bob', 25]];

      const result = await JsonParser.parseJson(jsonString);
      expect(result).toEqual(expected);
    });

    it('should handle an empty JSON array string', async () => {
      const jsonString = '[]';
      const expected: string[][] = [];

      const result = await JsonParser.parseJson(jsonString);
      expect(result).toEqual(expected);
    });

    it('should reject the promise for an invalid JSON string', async () => {
      const jsonString = 'invalid json';

      await expect(JsonParser.parseJson(jsonString)).rejects.toThrow('Failed to parse JSON');
    });

    it('should reject the promise for JSON that is not an array', async () => {
        const jsonString = '{"name": "Alice"}';
        await expect(JsonParser.parseJson(jsonString)).rejects.toThrow();
    });
  });

  describe('readJson', () => {
    const filePath = 'test.json';

    it('reads valid JSON and returns parsed data', async () => {
      const fileContent = '[{"x":1},{"x":2}]';
      mockedReadFile.mockResolvedValue(fileContent);

      const result = await JsonParser.readJson(filePath);
      expect(result).toBeDefined();
    });

  });

  describe('writeJson', () => {
    const filePath = 'test.json';
    const data = [{ y: 1 }];

    it('writes JSON data to file', async () => {
      mockedWriteFile.mockResolvedValue(undefined);
      await JsonParser.writeJson(filePath, data);
      expect(mockedWriteFile).toHaveBeenCalled();
    });

    it('throws if write fails', async () => {
      mockedWriteFile.mockRejectedValue(new Error('fail'));
      await expect(JsonParser.writeJson(filePath, data)).rejects.toThrow('fail');
    });
  });
});