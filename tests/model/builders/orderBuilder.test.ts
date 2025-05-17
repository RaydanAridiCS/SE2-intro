import { OrderBuilder } from "../../../src/model/builders/order.builder";
import { IItem, ItemCategory } from "../../../src/model/interfaces/IItem";
import { Order } from "../../../src/model/Order.model";

describe("OrderBuilder", () => {
    const mockItem: IItem = {
        getCategory: function (): ItemCategory {
            return ItemCategory.Book;
        }
    };

    it("should build an Order with all required properties", () => {
        const order = OrderBuilder.newBuilder()
            .setItem(mockItem)
            .setPrice(100)
            .setQuantity(2)
            .setId("order1")
            .build();

        expect(order).toBeInstanceOf(Order);
        expect(order.getItem()).toEqual(mockItem);
        expect(order.getPrice()).toBe(100);
        expect(order.getQuantity()).toBe(2);
        expect(order.getId()).toBe("order1");
    });

    it("should throw an error if a required property is missing", () => {
        expect(() => {
            OrderBuilder.newBuilder()
                .setItem(mockItem)
                .setPrice(100)
                .setQuantity(2)
                .build();
        }).toThrow("Missing required property to build an Order");
    });

});