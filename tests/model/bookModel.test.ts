import { Book } from '../../src/model/book.model';
import { ItemCategory } from '../../src/model/item.model';

describe('Book Model', () => {
    const testBook = new Book(
        'order123',
        'Test Book',
        'Test Author',
        'Fiction',
        'Hardcover',
        'English',
        'Test Publisher',
        'First Edition',
        'Standard',
        29.99,
        1
    );

    test('should create a book instance', () => {
        expect(testBook).toBeInstanceOf(Book);
    });

    test('should return correct category', () => {
        expect(testBook.getCategory()).toBe(ItemCategory.Book);
    });

    test('should return correct order ID', () => {
        expect(testBook.getOrderId()).toBe('order123');
    });

    test('should return correct book title', () => {
        expect(testBook.getBookTitle()).toBe('Test Book');
    });

    test('should return correct author', () => {
        expect(testBook.getAuthor()).toBe('Test Author');
    });

    test('should return correct genre', () => {
        expect(testBook.getGenre()).toBe('Fiction');
    });

    test('should return correct format', () => {
        expect(testBook.getFormat()).toBe('Hardcover');
    });

    test('should return correct language', () => {
        expect(testBook.getLanguage()).toBe('English');
    });

    test('should return correct publisher', () => {
        expect(testBook.getPublisher()).toBe('Test Publisher');
    });

    test('should return correct special edition', () => {
        expect(testBook.getSpecialEdition()).toBe('First Edition');
    });

    test('should return correct packaging', () => {
        expect(testBook.getPackaging()).toBe('Standard');
    });

    test('should return correct price', () => {
        expect(testBook.getPrice()).toBe(29.99);
    });

    test('should return correct quantity', () => {
        expect(testBook.getQuantity()).toBe(1);
    });
});