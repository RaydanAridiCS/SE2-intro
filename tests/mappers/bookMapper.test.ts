import { JsonBookMapper } from "../../src/mappers/Book.mapper";

describe("JsonBookMapper", () => {
    it("should correctly map valid data to a Book object", () => {
        const data = [
            "0",
            "The Hobbit",
            "J.R.R. Tolkien",
            "Fantasy",
            "Hardcover",
            "English",
            "Allen & Unwin",
            "First Edition",
            "Boxed"
        ];

        const mapper = new JsonBookMapper();
        const book = mapper.map(data);

        expect(book.getBookTitle()).toBe("The Hobbit");
        expect(book.getAuthor()).toBe("J.R.R. Tolkien");
        expect(book.getGenre()).toBe("Fantasy");
        expect(book.getFormat()).toBe("Hardcover");
        expect(book.getLanguage()).toBe("English");
        expect(book.getPublisher()).toBe("Allen & Unwin");
        expect(book.getSpecialEdition()).toBe("First Edition");
        expect(book.getPackaging()).toBe("Boxed");
    });

    it("should throw if data array is empty", () => {
        const data: string[] = [];
        const mapper = new JsonBookMapper();
        expect(() => mapper.map(data)).toThrow();
    });

    it("should throw or fail gracefully if data is missing fields", () => {
        const data = [
            "0",
            "Book Title"
            // missing other fields
        ];

        const mapper = new JsonBookMapper();
        expect(() => mapper.map(data)).toThrow();
    });
});