import { BookBuilder } from '../../../src/model/builders/book.builder';
import { Book } from '../../../src/model/book.model';

describe('BookBuilder', () => {
    let builder: BookBuilder;

    beforeEach(() => {
        builder = new BookBuilder();
    });

    it('should build a valid book with all required fields', () => {
        const book = builder
            .setBookTitle('The Great Gatsby')
            .setAuthor('F. Scott Fitzgerald')
            .setGenre('Fiction')
            .setFormat('Hardcover')
            .setLanguage('English')
            .setPublisher('Scribner')
            .setSpecialEdition('First Edition')
            .setPackaging('Standard')
            .build();

        expect(book).toBeInstanceOf(Book);
        expect(book.getBookTitle()).toBe('The Great Gatsby');
        expect(book.getAuthor()).toBe('F. Scott Fitzgerald');
        expect(book.getGenre()).toBe('Fiction');
        expect(book.getFormat()).toBe('Hardcover');
        expect(book.getLanguage()).toBe('English');
        expect(book.getPublisher()).toBe('Scribner');
        expect(book.getSpecialEdition()).toBe('First Edition');
        expect(book.getPackaging()).toBe('Standard');
    });


    it('should maintain builder pattern chainability', () => {
        expect(builder.setBookTitle('Test')).toBe(builder);
        expect(builder.setAuthor('Author')).toBe(builder);
    });
});