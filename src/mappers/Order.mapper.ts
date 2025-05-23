import { OrderBuilder } from '../model/builders/order.builder';
import { IOrder } from '../model/interfaces/IOrder';
import { IMapper } from './IMapper';
import { IItem } from '../model/interfaces/IItem';



export class OrderMapper implements IMapper<string[], IOrder> {
    constructor(private itemMapper: IMapper<string[], IItem>) {
    }
    map(data: string[]): IOrder {
        const item: IItem = this.itemMapper.map(data);
        return OrderBuilder.newBuilder()
            .setId(data[0])
            .setPrice(parseInt(data[data.length - 2]))
            .setQuantity(parseInt(data[data.length - 1]))
            .setItem(item)
            .build();
    }
    reverseMap(data: IOrder): string[] {
        const item: string[] = this.itemMapper.reverseMap(data.getItem());
        return [
            data.getId(),
            ...item,
            data.getPrice().toString(),
            data.getQuantity().toString()
        ];
    }
}

