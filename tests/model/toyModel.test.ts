import { Toy } from '../../src/model/toy.model';
import { ItemCategory } from '../../src/model/interfaces//IItem';

describe('Toy', () => {
    let toy: Toy;

    beforeEach(() => {
        toy = new Toy(
            'Robot',
            '5-7 years',
            'LEGO',
            'Plastic',
            true,
            true
        );
    });

    test('should create a toy instance', () => {
        expect(toy).toBeInstanceOf(Toy);
    });

    test('should return correct category', () => {
        expect(toy.getCategory()).toBe(ItemCategory.Toy);
    });

    test('should return correct type', () => {
        expect(toy.getType()).toBe('Robot');
    });

    test('should return correct age group', () => {
        expect(toy.getAgeGroup()).toBe('5-7 years');
    });

    test('should return correct brand', () => {
        expect(toy.getBrand()).toBe('LEGO');
    });

    test('should return correct material', () => {
        expect(toy.getMaterial()).toBe('Plastic');
    });

    test('should return correct battery requirement', () => {
        expect(toy.isBatteryRequired()).toBe(true);
    });

    test('should return correct educational status', () => {
        expect(toy.isEducational()).toBe(true);
    });

});