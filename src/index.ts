import logger from "./util/logger";
import { OrderMapper } from "./mappers/Order.mapper";

import { JsonParser } from "./parsers/jsonParser";
import { JsonBookMapper } from "./mappers/Book.mapper";

import { CsvParser } from "./parsers/csvParser";
import { CsvCakeMapper } from "./mappers/Cake.mapper";

import { XmlParser } from "./parsers/xmlParser";
import { XmlToyMapper } from "./mappers/Toy.mapper";

async function main() {
     
    const cakeData = await CsvParser.readCsv('src/data/cake orders.csv', true);
    const cakeMapper = new CsvCakeMapper();
    const cakeOrderMapper = new OrderMapper(cakeMapper);
    const cakeOrders = cakeData.map(row => cakeOrderMapper.map(row));

    cakeOrders.forEach(order => {
        logger.info("%o", order);
    });

    

    const toyData = await XmlParser.readXml('src/data/toy orders.xml');
    const toyMapper = new XmlToyMapper();
    const toyOrderMapper = new OrderMapper(toyMapper);
    const toyOrders = toyData.map(row => toyOrderMapper.map(row));

    toyOrders.forEach(order => {
        logger.info("%o", order);
    });


    const bookData = await JsonParser.readJson('src/data/book orders.json');
    const bookMapper = new JsonBookMapper();
    const bookOrderMapper = new OrderMapper(bookMapper);
    const bookOrders = bookData.map(row => bookOrderMapper.map(row));

    bookOrders.forEach(order => {
        logger.info("%o", order);
    });


}

main();

