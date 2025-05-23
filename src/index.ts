import logger from "./util/logger";
// import { OrderMapper } from "./mappers/Order.mapper";

// import { JsonParser } from "./parsers/jsonParser";
// import { JsonBookMapper } from "./mappers/Book.mapper";

// import { XmlParser } from "./parsers/xmlParser";
// import { XmlToyMapper } from "./mappers/Toy.mapper";
import { CakeOrderRepository } from "./repository/file/Cake.order.repository";

import config from "./config";


async function main() {
     
    const csvPath = config.storagePath.csv.cake;

    const repository = new CakeOrderRepository(csvPath);

    const orders = await repository.get("180");

    logger.info("Order: %o", orders);
    

    // const toyData = await XmlParser.readXml('src/data/toy orders.xml');
    // const toyMapper = new XmlToyMapper();
    // const toyOrderMapper = new OrderMapper(toyMapper);
    // const toyOrders = toyData.map(row => toyOrderMapper.map(row));

    // toyOrders.forEach(order => {
    //     logger.info("%o", order);
    // });


    // const bookData = await JsonParser.readJson('src/data/book orders.json');
    // const bookMapper = new JsonBookMapper();
    // const bookOrderMapper = new OrderMapper(bookMapper);
    // const bookOrders = bookData.map(row => bookOrderMapper.map(row));

    // bookOrders.forEach(order => {
    //     logger.info("%o", order);
    // });


}

main();

