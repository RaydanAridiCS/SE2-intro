import logger from "./util/logger";
// import { CsvParser } from "./parsers/csvParser";
// import { CsvCakeMapper } from "./mappers/Cake.mapper";
import { CsvOrderMapper } from "./mappers/Order.mapper";

import { XmlParser } from "./parsers/xmlParser";
import { XmlToyMapper } from "./mappers/Toy.mapper";
// import { XmlOrderMapper } from "./mappers/Order.mapper";


async function main() {

    // const data = await CsvParser.readCsv('src/data/cake orders.csv', true);
    // const cakeMapper = new CsvCakeMapper();
    // const orderMapper = new CsvOrderMapper(cakeMapper);
    // const orders = data.map(row => orderMapper.map(row));

    // orders.forEach(order => {
    //     logger.info("%o", order);
    // });

    const toyData = await XmlParser.readXml('src/data/toy orders.xml');
    const toyMapper = new XmlToyMapper();
    const orderMapper = new CsvOrderMapper(toyMapper);
    const orders = toyData.map(row => orderMapper.map(row));

    orders.forEach(order => {
        logger.info("%o", order);
    });


}



main();