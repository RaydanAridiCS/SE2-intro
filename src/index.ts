import path from 'path';
// import { CsvParser } from './parsers/csvParser';
import { JsonParser } from './parsers/jsonParser';
// import { XmlParser } from './parsers/xmlParser';
import  logger from './util/logger';

// const csvFilePath = path.resolve(__dirname, './data/cake orders.csv');
const jsonFilePath = path.resolve(__dirname, './data/aa.json');
// const xmlFilePath = path.resolve(__dirname, './data/toy orders.xml');



async function main() {
    // try {
    //     const products = await CsvParser.readCsv(csvFilePath);
    //     for (const product of products) {
    //         logger.info(product);
    //     }
    // } catch (error) {
    //     logger.error(error)
    // }

    try {
        const products = await JsonParser.readJson(jsonFilePath);
        logger.info(products)
        logger.info(typeof products);
        for (const product of products) {
            logger.info(product + '\n');
        }
    }
    catch (error) {
        logger.error(error)
    }

    // try {
    //     const products = await XmlParser.readXml(xmlFilePath);
    //     for (const product of products) {
    //         logger.info(product);
    //     }
    // } catch (error) {
    //     logger.error(error);
    // }


}

main();