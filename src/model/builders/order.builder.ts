import logger from "../../util/logger";
import { IItem } from "../interfaces/IItem";
import { Order } from "../Order.model";



export class OrderBuilder {
    private item!: IItem;
    private price!: number;
    private quantity!: number;
    private id!: string;

    public static newBuilder(): OrderBuilder {
        return new OrderBuilder();
    }

    setItem(item: IItem): OrderBuilder {
        this.item = item;
        return this;
    }

    setPrice(price: number): OrderBuilder {
        this.price = price;
        return this;
    }

    setQuantity(quantity: number): OrderBuilder {
        this.quantity = quantity;
        return this;
    }

    setId(id: string): OrderBuilder {
        this.id = id;
        return this;
    }

    build(): Order {
        if (!this.item || !this.price || !this.quantity || !this.id) {
            logger.error("Missing required property to build an Order");
            throw new Error("Missing required property to build an Order");
        }
        return new Order(this.item, this.price, this.quantity, this.id);
    }
}