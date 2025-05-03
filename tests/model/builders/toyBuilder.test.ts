import { ToyBuilder } from '../../../src/model/builders/toy.builder';
import { Toy } from '../../../src/model/toy.model';

describe('ToyBuilder', () => {
    let builder: ToyBuilder;

    beforeEach(() => {
        builder = new ToyBuilder();
    });

    it('should build a valid toy with all properties set', () => {
        const toy = builder
            .setOrderID(1)
            .setType('action figure')
            .setAgeGroup('5-10')
            .setBrand('Hasbro')
            .setMaterial('plastic')
            .setBatteryRequired(false)
            .setEducational(true)
            .setPrice(19.99)
            .setQuantity(1)
            .build();

        expect(toy).toBeInstanceOf(Toy);
        expect(toy).toEqual({
            orderID: 1,
            type: 'action figure',
            ageGroup: '5-10',
            brand: 'Hasbro',
            material: 'plastic',
            batteryRequired: false,
            educational: true,
            price: 19.99,
            quantity: 1
        });
    });

    it('should throw error when required fields are missing', () => {
        expect(() => {
            builder.build();
        }).toThrow('Missing required field');
    });
    
    it('should maintain chainability for all setter methods', () => {
        expect(builder.setOrderID(1)).toBe(builder);
        expect(builder.setType('doll')).toBe(builder);
        expect(builder.setAgeGroup('3-6')).toBe(builder);
        expect(builder.setBrand('LEGO')).toBe(builder);
        expect(builder.setMaterial('wood')).toBe(builder);
        expect(builder.setBatteryRequired(true)).toBe(builder);
        expect(builder.setEducational(false)).toBe(builder);
        expect(builder.setPrice(29.99)).toBe(builder);
        expect(builder.setQuantity(2)).toBe(builder);
    });


});