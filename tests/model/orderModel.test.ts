import { Order } from "../../src/model/Order.model";
import { IItem, ItemCategory } from "../../src/model/interfaces/IItem";

describe("Order Class", () => {
    const mockItem: IItem = {
        getCategory: function (): ItemCategory {
            return ItemCategory.Book;
        }
    };
    const mockPrice = 100;
    const mockQuantity = 2;
    const mockId = "order123";

    let order: Order;

    beforeEach(() => {
        order = new Order(mockItem, mockPrice, mockQuantity, mockId);
    });

    test("should create an Order instance", () => {
        expect(order).toBeInstanceOf(Order);
    });

    test("should return the correct item", () => {
        expect(order.getItem()).toEqual(mockItem);
    });

    test("should return the correct price", () => {
        expect(order.getPrice()).toBe(mockPrice);
    });

    test("should return the correct quantity", () => {
        expect(order.getQuantity()).toBe(mockQuantity);
    });

    test("should return the correct id", () => {
        expect(order.getId()).toBe(mockId);
    });
});