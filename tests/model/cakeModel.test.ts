import { Cake } from '../../src/model/cake.model';
import { ItemCategory } from '../../src/model/item.model';

describe('Cake', () => {
    let cake: Cake;

    beforeEach(() => {
        cake = new Cake(
            '1',
            'Birthday Cake',
            'Chocolate',
            'Vanilla Cream',
            9,
            2,
            'Buttercream',
            'Vanilla',
            'Flowers',
            'Pink',
            'Happy Birthday!',
            'Round',
            'None',
            'Sprinkles',
            'Box',
            29.99,
            1
        );
    });

    test('should create a cake instance', () => {
        expect(cake).toBeInstanceOf(Cake);
    });

    test('should return correct category', () => {
        expect(cake.getCategory()).toBe(ItemCategory.Cake);
    });

    test('should return correct properties', () => {
        expect(cake.getId()).toBe('1');
        expect(cake.getType()).toBe('Birthday Cake');
        expect(cake.getFlavor()).toBe('Chocolate');
        expect(cake.getFilling()).toBe('Vanilla Cream');
        expect(cake.getSize()).toBe(9);
        expect(cake.getLayers()).toBe(2);
        expect(cake.getFrostingType()).toBe('Buttercream');
        expect(cake.getFrostingFlavor()).toBe('Vanilla');
        expect(cake.getDecorationType()).toBe('Flowers');
        expect(cake.getDecorationColor()).toBe('Pink');
        expect(cake.getCustomMessage()).toBe('Happy Birthday!');
        expect(cake.getShape()).toBe('Round');
        expect(cake.getAllergies()).toBe('None');
        expect(cake.getSpecialIngredients()).toBe('Sprinkles');
        expect(cake.getPackagingType()).toBe('Box');
        expect(cake.getPrice()).toBe(29.99);
        expect(cake.getQuantity()).toBe(1);
    });
});