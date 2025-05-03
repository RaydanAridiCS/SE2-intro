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

    it('should parse a valid XML file with multiple rows', async () => {
      const validXml = `
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

      const result = await XmlParser.readXml(TEST_FILE);
      expect(result).toEqual([
        ['OrderID', 'Type'],
        ['5001', 'Plush Toy'],
        ['5002', 'Action Figure']
      ]);
      expect(logger.info).toHaveBeenCalledWith(
        `Successfully parsed XML from: ${TEST_FILE}`
      );
    });

    it('should handle XML with missing fields in some rows', async () => {
      const xmlWithMissing = `
      <data>
        <row>
          <OrderID>5001</OrderID>
          <Type>Plush Toy</Type>
        </row>
        <row>
          <OrderID>5002</OrderID>
        </row>
      </data>`;

      (fs.readFile as jest.Mock).mockResolvedValue(xmlWithMissing);

      const result = await XmlParser.readXml(TEST_FILE);
      expect(result).toEqual([
        ['OrderID', 'Type'],
        ['5001', 'Plush Toy'],
        ['5002', '']
      ]);
    });

    it('should handle XML with only one row', async () => {
      const singleRowXml = `
      <data>
        <row>
          <OrderID>1234</OrderID>
          <Type>Board Game</Type>
        </row>
      </data>`;

      (fs.readFile as jest.Mock).mockResolvedValue(singleRowXml);

      const result = await XmlParser.readXml(TEST_FILE);
      expect(result).toEqual([
        ['OrderID', 'Type'],
        ['1234', 'Board Game']
      ]);
    });

    it('should throw if XML root is empty', async () => {
      const emptyXml = `<data></data>`;
      (fs.readFile as jest.Mock).mockResolvedValue(emptyXml);

      await expect(XmlParser.readXml(TEST_FILE)).rejects.toThrow();
      expect(logger.error).toHaveBeenCalled();
    });

    it('should handle XML with extra whitespace and newlines', async () => {
      const xmlWithWhitespace = `
      <data>
        <row>
          <OrderID>
            42
          </OrderID>
          <Type>
            Puzzle
          </Type>
        </row>
      </data>`;

      (fs.readFile as jest.Mock).mockResolvedValue(xmlWithWhitespace);

      const result = await XmlParser.readXml(TEST_FILE);
      expect(result).toEqual([
        ['OrderID', 'Type'],
        ['42', 'Puzzle']
      ]);
    });
  });
});
