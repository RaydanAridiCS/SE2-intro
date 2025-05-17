import { CakeBuilder } from '../../../src/model/builders/cake.builder';
import { Cake } from '../../../src/model/cake.model';

describe('CakeBuilder', () => {
    let builder: CakeBuilder;

    beforeEach(() => {
        builder = new CakeBuilder();
    });

    it('should build a valid cake when all required fields are set', () => {
        const cake = builder
            .setType('Birthday')
            .setFlavor('Chocolate')
            .setFilling('Vanilla')
            .setSize(9)
            .setLayers(2)
            .setFrostingType('Buttercream')
            .setFrostingFlavor('Vanilla')
            .setDecorationType('Flowers')
            .setDecorationColor('Pink')
            .setCustomMessage('Happy Birthday')
            .setShape('Round')
            .setAllergies('None')
            .setSpecialIngredients('None')
            .setPackagingType('Box')
            .build();

        expect(cake).toBeInstanceOf(Cake);
        expect(cake).toEqual({
            type: 'Birthday',
            flavor: 'Chocolate',
            filling: 'Vanilla',
            size: 9,
            layers: 2,
            frostingType: 'Buttercream',
            frostingFlavor: 'Vanilla',
            decorationType: 'Flowers',
            decorationColor: 'Pink',
            customMessage: 'Happy Birthday',
            shape: 'Round',
            allergies: 'None',
            specialIngredients: 'None',
            packagingType: 'Box'
        });
    });

    it('should throw error when required fields are missing', () => {
        expect(() => builder.build()).toThrow('Missing required field');
    });

    it('should allow method chaining', () => {
        expect(builder.setType('Birthday')).toBe(builder);
        expect(builder.setFlavor('Chocolate')).toBe(builder);
    });
});