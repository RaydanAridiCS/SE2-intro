import logger from '../../util/logger';
import {Book} from '../book.model';

export class BookBuilder {

    private orderId!: string;
    private bookTitle!: string;
    private author!: string;
    private genre!: string;
    private format!: string;
    private language!: string;
    private publisher!: string;
    private specialEdition!: string;
    private packaging!: string;
    private price!: number;
    private quantity!: number;

    public setOrderId(orderId: string): BookBuilder {
        this.orderId = orderId;
        return this;
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

    public setPrice(price: number): BookBuilder {
        this.price = price;
        return this;
    }

    public setQuantity(quantity: number): BookBuilder {
        this.quantity = quantity;
        return this;
    }

    public build(): Book {
        const missingFields: string[] = [];

        const fieldsToCheck = {
            orderId: this.orderId,
            bookTitle: this.bookTitle,
            author: this.author,
            genre: this.genre,
            format: this.format,
            language: this.language,
            publisher: this.publisher,
            specialEdition: this.specialEdition,
            packaging: this.packaging,
            price: this.price,
            quantity: this.quantity
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
            this.orderId,
            this.bookTitle,
            this.author,
            this.genre,
            this.format,
            this.language,
            this.publisher,
            this.specialEdition,
            this.packaging,
            this.price,
            this.quantity
        );
    }


}