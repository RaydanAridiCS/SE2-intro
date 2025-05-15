import logger from '../../util/logger';
import {Book} from '../book.model';

export class BookBuilder {

    private bookTitle!: string;
    private author!: string;
    private genre!: string;
    private format!: string;
    private language!: string;
    private publisher!: string;
    private specialEdition!: string;
    private packaging!: string;

    static newBuilder(): BookBuilder {
        return new BookBuilder();
    }


    public setBookTitle(bookTitle: string): BookBuilder {
        this.bookTitle = bookTitle;
        return this;
    }

    public setAuthor(author: string): BookBuilder {
        this.author = author;
        return this;
    }

    public setGenre(genre: string): BookBuilder {
        this.genre = genre;
        return this;
    }

    public setFormat(format: string): BookBuilder {
        this.format = format;
        return this;
    }

    public setLanguage(language: string): BookBuilder {
        this.language = language;
        return this;
    }

    public setPublisher(publisher: string): BookBuilder {
        this.publisher = publisher;
        return this;
    }

    public setSpecialEdition(specialEdition: string): BookBuilder {
        this.specialEdition = specialEdition;
        return this;
    }

    public setPackaging(packaging: string): BookBuilder {
        this.packaging = packaging;
        return this;
    }


    public build(): Book {
        const missingFields: string[] = [];

        const fieldsToCheck = {
            bookTitle: this.bookTitle,
            author: this.author,
            genre: this.genre,
            format: this.format,
            language: this.language,
            publisher: this.publisher,
            specialEdition: this.specialEdition,
            packaging: this.packaging,
        };

        for (const [fieldName, fieldValue] of Object.entries(fieldsToCheck)) {
            if (fieldValue === undefined) {
            missingFields.push(fieldName);
            }
        }

        if (missingFields.length > 0) {
            const errorMessage = `Missing required fields: ${missingFields.join(', ')}`;
            logger.error(errorMessage);
            throw new Error(errorMessage);
        }

        return new Book(
            this.bookTitle,
            this.author,
            this.genre,
            this.format,
            this.language,
            this.publisher,
            this.specialEdition,
            this.packaging,
        );
    }


}