import { BookBuilder } from '../../../src/model/builders/book.builder';
import { Book } from '../../../src/model/book.model';

describe('BookBuilder', () => {
    let builder: BookBuilder;

    beforeEach(() => {
        builder = new BookBuilder();
    });

    it('should build a valid book with all required fields', () => {
        const book = builder
            .setOrderId('123')
            .setBookTitle('The Great Gatsby')
            .setAuthor('F. Scott Fitzgerald')
            .setGenre('Fiction')
            .setFormat('Hardcover')
            .setLanguage('English')
            .setPublisher('Scribner')
            .setSpecialEdition('First Edition')
            .setPackaging('Standard')
            .setPrice(29.99)
            .setQuantity(1)
            .build();

        expect(book).toBeInstanceOf(Book);
        expect(book.getOrderId()).toBe('123');
        expect(book.getBookTitle()).toBe('The Great Gatsby');
        expect(book.getAuthor()).toBe('F. Scott Fitzgerald');
        expect(book.getGenre()).toBe('Fiction');
        expect(book.getFormat()).toBe('Hardcover');
        expect(book.getLanguage()).toBe('English');
        expect(book.getPublisher()).toBe('Scribner');
        expect(book.getSpecialEdition()).toBe('First Edition');
        expect(book.getPackaging()).toBe('Standard');
        expect(book.getPrice()).toBe(29.99);
        expect(book.getQuantity()).toBe(1);
    });

    it('should throw error when required fields are missing', () => {
        // Test missing orderId
        expect(() => {
            builder
                .setBookTitle('Test Book')
                .setAuthor('Test Author')
                .setGenre('Fiction')
                .setFormat('Hardcover')
                .setLanguage('English')
                .setPublisher('Test Publisher')
                .setSpecialEdition('Regular')
                .setPackaging('Standard')
                .setPrice(10)
                .setQuantity(1)
                .build();
        }).toThrowError('Missing required field');

    });

    it('should maintain builder pattern chainability', () => {
        expect(builder.setOrderId('123')).toBe(builder);
        expect(builder.setBookTitle('Test')).toBe(builder);
        expect(builder.setAuthor('Author')).toBe(builder);
    });
});