import { OrderRepository } from "./Order.repository";
import { CsvParser } from "../../parsers/csvParser";
import { CsvCakeMapper } from "../../mappers/Cake.mapper";
import { OrderMapper } from "../../mappers/Order.mapper";
import { IOrder } from "../../model/interfaces/IOrder";

export class CakeOrderRepository extends OrderRepository {
    private mapper = new OrderMapper(new CsvCakeMapper());


    constructor(private readonly filePath: string) {
        super();
    }

    protected async load(): Promise<IOrder[]> {
        // read2d strings from file
        const csvCakeData = await CsvParser.readCsv(this.filePath, true);
        // return the list of objects
        return csvCakeData.map(this.mapper.map.bind(this.mapper));
    }

    protected async save(orders: IOrder[]): Promise<void> {

        // generate the list of headers
        const headers = [
            "id",
            "Type",
            "Flavor",
            "Filling",
            "Size",
            "Layers",
            "Frosting Type",
            "Frosting Flavor",
            "Decoration Type",
            "Decoration Color",
            "Custom Message",
            "Shape",
            "Allergies",
            "Special Ingredients",
            "Packaging Type",
            "Price",
            "Quantity"
        ];

        // convert the orders to 2d strings 
        const rawItems = orders.map(this.mapper.reverseMap.bind(this.mapper));

        //parse.writeCsv
        await CsvParser.writeCsv(this.filePath, [headers, ...rawItems]);

    }


}