import { XmlToyMapper } from "../../src/mappers/Toy.mapper";
import { Toy } from "../../src/model/toy.model";

describe('XmlToyMapper', () => {
    let mapper: XmlToyMapper;

    beforeEach(() => {
        mapper = new XmlToyMapper();
    });

    it('should map data array to Toy object (battery and educational: yes)', () => {
        const data = [
            "0", // unused
            "Action Figure", // type
            "5-7", // age group
            "Hasbro", // brand
            "Plastic", // material
            "yes", // batteryRequired
            "yes" // educational
        ];

        const toy: Toy = mapper.map(data);

        expect(toy).toEqual({
            type: "Action Figure",
            ageGroup: "5-7",
            brand: "Hasbro",
            material: "Plastic",
            batteryRequired: true,
            educational: true
        });
    });

    it('should map data array to Toy object (battery and educational: no)', () => {
        const data = [
            "0",
            "Puzzle",
            "3-5",
            "Ravensburger",
            "Cardboard",
            "no",
            "no"
        ];

        const toy: Toy = mapper.map(data);

        expect(toy).toEqual({
            type: "Puzzle",
            ageGroup: "3-5",
            brand: "Ravensburger",
            material: "Cardboard",
            batteryRequired: false,
            educational: false
        });
    });

    it('should trim and lowercase batteryRequired and educational fields', () => {
        const data = [
            "0",
            "Robot",
            "8-12",
            "Lego",
            "Plastic",
            "  YeS  ",
            "  nO "
        ];

        const toy: Toy = mapper.map(data);

        expect(toy).toMatchObject({
            batteryRequired: true,
            educational: false
        });
    });
});