import { CsvCakeMapper } from "../../src/mappers/Cake.mapper";

describe('CsvCakeMapper', () => {
    let mapper: CsvCakeMapper;

    beforeEach(() => {
        mapper = new CsvCakeMapper();
    });

    it('should map a valid CSV row to a Cake object', () => {
        const csvRow = [
            "0", // id or unused
            "Birthday", // type
            "Chocolate", // flavor
            "Strawberry", // filling
            "8", // size
            "2", // layers
            "Buttercream", // frostingType
            "Vanilla", // frostingFlavor
            "Sprinkles", // decorationType
            "Rainbow", // decorationColor
            "Happy Birthday!", // customMessage
            "Round", // shape
            "Nuts", // allergies
            "Organic Eggs", // specialIngredients
            "Box" // packagingType
        ];

        const cake = mapper.map(csvRow);

        expect(cake).toEqual({
            type: "Birthday",
            flavor: "Chocolate",
            filling: "Strawberry",
            size: 8,
            layers: 2,
            frostingType: "Buttercream",
            frostingFlavor: "Vanilla",
            decorationType: "Sprinkles",
            decorationColor: "Rainbow",
            customMessage: "Happy Birthday!",
            shape: "Round",
            allergies: "Nuts",
            specialIngredients: "Organic Eggs",
            packagingType: "Box"
        });
    });

    it('should handle missing optional fields', () => {
        const csvRow = [
            "0",
            "Anniversary",
            "Lemon",
            "Blueberry",
            "6",
            "1",
            "Whipped Cream",
            "Lemon",
            "Candles",
            "Yellow",
            "", // customMessage
            "Heart",
            "", // allergies
            "", // specialIngredients
            "" // packagingType
        ];

        const cake = mapper.map(csvRow);

        expect(cake).toMatchObject({
            customMessage: "",
            allergies: "",
            specialIngredients: "",
            packagingType: ""
        });
    });
});