import logger from "./util/logger";
import { CsvParser } from "./parsers/csvParser";
import { CsvCakeMapper } from "./mappers/Cake.mapper";
import { CsvOrderMapper } from "./mappers/Order.mapper";

async function main() {

    const data = await CsvParser.readCsv('src/data/cake orders.csv', true);
    const cakeMapper = new CsvCakeMapper();
    const orderMapper = new CsvOrderMapper(cakeMapper);
    const orders = data.map(row => orderMapper.map(row));

    orders.forEach(order => {
        logger.info("%o", order);
    });



}



main();