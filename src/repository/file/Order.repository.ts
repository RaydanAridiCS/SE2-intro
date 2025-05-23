import logger from "../../util/logger";
import { id,IRepository } from "../IRepository";
import { InvalidItemException, ItemNotFoundException } from "../../util/exceptions/RepositoryExceptions";
import { IOrder } from "../../model/interfaces/IOrder";

export abstract class OrderRepository implements IRepository<IOrder> {

    protected abstract load(): Promise<IOrder[]>;
    protected abstract save(orders: IOrder[]): Promise<void>;

    getId(): string {
        throw new Error("Method not implemented.");
    }

    async create(item: IOrder): Promise<id> {
        // validate the order
        if (!item) {
            logger.error("Order can not be null");
            throw new InvalidItemException("Order can not be null");
        }
        // load all orders 
        const orders = await this.load();
        // add the new order
        const id = orders.push(item);
        // save all orders
        await this.save(orders);
        logger.info(`Order with ID ${id} created successfully`);
        return String(id);
    }


    async get(id: id): Promise<IOrder> {
        const orders = await this.load();
        const foundOrder = orders.find(order => order.getId() === id);
        if (!foundOrder) {
            logger.error(`Order with ID ${id} not found`);
            throw new ItemNotFoundException("Order not found");
        }
        return foundOrder;
    }

    async getAll(): Promise<IOrder[]> {
        return this.load();
    }

    async update(item: IOrder): Promise<void> {
        if (!item) {
            logger.error("Order can not be null");
            throw new InvalidItemException("Order can not be null");
        }
        const orders = await this.load();
        const index = orders.findIndex(o => o.getId() === item.getId())
        if (index === -1){
            logger.error(`Order with ID ${item.getId()} not found`);
            throw new ItemNotFoundException("Order not found");
        }
        orders[index] = item;
        await this.save(orders);
        logger.info(`Order with ID ${item.getId()} updated successfully`);
    }

    async delete(id: id): Promise<void> {
        const orders = await this.load();
        const index = orders.findIndex(order => order.getId() === id);
        if (index === -1) {
            logger.error(`Order with ID ${id} not found`);
            throw new Error("Order not found");
        }
        orders.splice(index, 1);
        await this.save(orders);
        logger.info(`Order with ID ${id} deleted successfully`);
    }
}