import { JsonParser } from '../../src/parsers/jsonParser';
import * as fs from 'fs';

jest.mock('fs');

const mockReadFile = jest.fn();
(fs.promises as unknown) = { readFile: mockReadFile };

describe('JsonParser.readJson', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw error if file does not exist', async () => {
    const error = new Error('File not found') as NodeJS.ErrnoException;
    error.code = 'ENOENT';
    mockReadFile.mockRejectedValue(error);

    await expect(JsonParser.readJson('notfound.json')).rejects.toThrow('Invalid JSON format: expected an array of objects');
  });

  it('should throw error for invalid JSON', async () => {
    mockReadFile.mockResolvedValue('not a json');
    await expect(JsonParser.readJson('invalid.json')).rejects.toThrow();
  });

  it('should throw error if JSON is not array', async () => {
    mockReadFile.mockResolvedValue(JSON.stringify({ a: 1 }));
    await expect(JsonParser.readJson('notarray.json')).rejects.toThrow('Invalid JSON format: expected an array of objects');
  });

  it('should throw error when file content is empty string', async () => {
    mockReadFile.mockResolvedValue('');
    await expect(JsonParser.readJson('emptystring.json')).rejects.toThrow('Invalid JSON format: expected an array of objects');
  });

  it('should throw error for JSON array with non-object elements', async () => {
    mockReadFile.mockResolvedValue(JSON.stringify([1, 2, 3]));
    // Object.values(1) throws, so this should throw
    await expect(JsonParser.readJson('arrayofnumbers.json')).rejects.toThrow();
  });

});