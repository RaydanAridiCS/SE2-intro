import { ToyBuilder } from '../../../src/model/builders/toy.builder';
import { Toy } from '../../../src/model/toy.model';

describe('ToyBuilder', () => {
    let builder: ToyBuilder;

    beforeEach(() => {
        builder = new ToyBuilder();
    });

    it('should build a valid toy with all properties set', () => {
        const toy = builder
            .setType('action figure')
            .setAgeGroup('5-10')
            .setBrand('Hasbro')
            .setMaterial('plastic')
            .setBatteryRequired(false)
            .setEducational(true)
            .build();

        expect(toy).toBeInstanceOf(Toy);
        expect(toy).toEqual({
            type: 'action figure',
            ageGroup: '5-10',
            brand: 'Hasbro',
            material: 'plastic',
            batteryRequired: false,
            educational: true,
        });
    });

    it('should throw error when required fields are missing', () => {
        expect(() => {
            builder.build();
        }).toThrow('Missing required field');
    });
    
    it('should maintain chainability for all setter methods', () => {
        expect(builder.setType('doll')).toBe(builder);
        expect(builder.setAgeGroup('3-6')).toBe(builder);
        expect(builder.setBrand('LEGO')).toBe(builder);
        expect(builder.setMaterial('wood')).toBe(builder);
        expect(builder.setBatteryRequired(true)).toBe(builder);
        expect(builder.setEducational(false)).toBe(builder);
    });


});