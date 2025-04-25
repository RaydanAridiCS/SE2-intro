import * as fs from 'fs/promises';
import * as path from 'path';
import { XmlParser } from '../src/parsers/xmlParser';
import logger from '../src/util/logger';

// Mock logger and filesystem
jest.mock('../src/util/logger', () => ({
  info: jest.fn(),
  error: jest.fn()
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

const TEST_DIR = path.join(__dirname, 'test-data');
const TEST_FILE = path.join(TEST_DIR, 'test.xml');

describe('XmlParser', () => {
  const validXml = `<?xml version='1.0' encoding='utf-8'?>
    <data>
      <row>
        <OrderID>5001</OrderID>
        <Type>Plush Toy</Type>
        <AgeGroup>13+</AgeGroup>
        <Brand>FunTime</Brand>
        <Material>Fabric</Material>
        <BatteryRequired>Yes</BatteryRequired>
        <Educational>Yes</Educational>
        <Price>247</Price>
        <Quantity>7</Quantity>
      </row>
    </data>`;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('readXml', () => {
    it('should parse valid XML structure correctly', async () => {
      // Mock file read
      (fs.readFile as jest.Mock).mockResolvedValue(validXml);
      
      const result = await XmlParser.readXml(TEST_FILE);
      
      expect(result).toEqual([
        ['5001', 'Plush Toy', '13+', 'FunTime', 'Fabric', 
         'Yes', 'Yes', '247', '7']
      ]);
      expect(logger.info).toHaveBeenCalledWith(
        `Successfully parsed toy orders from: ${TEST_FILE}`
      );
    });

    it('should handle empty values correctly', async () => {
      const xmlWithEmptyValues = validXml.replace('13+', ' ');
      (fs.readFile as jest.Mock).mockResolvedValue(xmlWithEmptyValues);
      
      const result = await XmlParser.readXml(TEST_FILE);
      expect(result[0][2]).toBe('');
    });

    it('should throw error for missing columns', async () => {
      const invalidXml = validXml.replace('<OrderID>5001</OrderID>', '');
      (fs.readFile as jest.Mock).mockResolvedValue(invalidXml);
      
      await expect(XmlParser.readXml(TEST_FILE)).rejects.toThrow(
        'Invalid XML structure - missing columns'
      );
      expect(logger.error).toHaveBeenCalled();
    });

    it('should handle file read errors', async () => {
      const error = new Error('File not found');
      (fs.readFile as jest.Mock).mockRejectedValue(error);
      
      await expect(XmlParser.readXml(TEST_FILE)).rejects.toThrow(
        `Error parsing toy orders XML ${TEST_FILE}: File not found`
      );
      expect(logger.error).toHaveBeenCalledWith(
        `Error parsing toy orders XML ${TEST_FILE}: File not found`
      );
    });
  });

  describe('parseXml', () => {
    it('should handle invalid XML format', async () => {
      const invalidXml = '<invalid>xml</data>';
      await expect(XmlParser.parseXml(invalidXml)).rejects.toThrow();
    });

    it('should handle unexpected XML structure', async () => {
      const wrongStructureXml = `<data><item>test</item></data>`;
      await expect(XmlParser.parseXml(wrongStructureXml)).rejects.toThrow(
        'Invalid XML structure - missing columns'
      );
    });

    it('should handle different value formats', async () => {
      const xmlWithAttributes = validXml.replace(
        '<OrderID>5001</OrderID>',
        '<OrderID id="5001">5001</OrderID>'
      );
      
      const result = await XmlParser.parseXml(xmlWithAttributes);
      expect(result[0][0]).toBe('5001');
    });
  });
});