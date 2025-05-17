import * as fs from 'fs/promises';
import * as path from 'path';
import { XmlParser } from '../../src/parsers/xmlParser';
import logger from '../../src/util/logger';

jest.mock('../../src/util/logger', () => ({
  info: jest.fn(),
  error: jest.fn()
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

const TEST_DIR = path.join(__dirname, 'test-data');
const TEST_FILE = path.join(TEST_DIR, 'test.xml');

describe('XmlParser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('readXml', () => {
    it('should handle file read errors', async () => {
      const error = new Error('File not found');
      (fs.readFile as jest.Mock).mockRejectedValue(error);

      await expect(XmlParser.readXml(TEST_FILE)).rejects.toThrow(
        `Error parsing XML ${TEST_FILE}: File not found`
      );
      expect(logger.error).toHaveBeenCalledWith(
        `Error parsing XML ${TEST_FILE}: File not found`
      );
    });

    it('should handle malformed XML', async () => {
      const malformedXml = `
      <?xml version='1.0' encoding='utf-8'?>
          <data>
              <row>
                  <OrderID>5001</OrderID
                  <Type>Plush Toy</Type>
              </row>
          </data>`;

      (fs.readFile as jest.Mock).mockResolvedValue(malformedXml);

      await expect(XmlParser.readXml(TEST_FILE)).rejects.toThrow();
      expect(logger.error).toHaveBeenCalled();
    });

    it('should parse XML data correctly', async () => {
      const validXml = `<?xml version='1.0' encoding='utf-8'?>
        <data>
          <row>
            <OrderID>5001</OrderID>
            <Type>Plush Toy</Type>
          </row>
          <row>
            <OrderID>5002</OrderID>
            <Type>Action Figure</Type>
          </row>
        </data>`;
      (fs.readFile as jest.Mock).mockResolvedValue(validXml);

      const expected = [
        ["5001", "Plush Toy"],
        ["5002", "Action Figure"],
      ];

      const result = await XmlParser.readXml(TEST_FILE);
      expect(result).toEqual(expected);
      expect(logger.info).toHaveBeenCalledWith(`Successfully parsed XML from: ${TEST_FILE}`);
    });

    it('should handle empty XML file', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('');

      await expect(XmlParser.readXml(TEST_FILE)).rejects.toThrow(`Error parsing XML ${TEST_FILE}: XML file ${TEST_FILE} is empty.`);
      expect(logger.error).toHaveBeenCalledWith(`Error parsing XML ${TEST_FILE}: XML file ${TEST_FILE} is empty.`);
    });

    it('should trim whitespace and newlines from values', async () => {
      const xmlWithWhitespace = `<?xml version='1.0' encoding='utf-8'?>
        <data>
          <row>
            <OrderID> 5001 </OrderID>
            <Type>\nPlush Toy\n</Type>
          </row>
        </data>`;
      (fs.readFile as jest.Mock).mockResolvedValue(xmlWithWhitespace);

      const expected = [["5001", "Plush Toy"]];

      const result = await XmlParser.readXml(TEST_FILE);
      expect(result).toEqual(expected);
    });

    it('should throw if XML root is empty', async () => {
      const emptyXml = `<data></data>`;
      (fs.readFile as jest.Mock).mockResolvedValue(emptyXml);

      await expect(XmlParser.readXml(TEST_FILE)).rejects.toThrow();
      expect(logger.error).toHaveBeenCalled();
    });


  });
});
