"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import logger from "./util/logger";
const cake_builder_1 = require("./model/builders/cake.builder");
// import { BookBuilder } from "./model/builders/book.builder";
// import { ToyBuilder } from "./model/builders/toy.builder";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // // Instnace of a Cake
        // const cakeBuilder = new CakeBuilder();
        // const cake = cakeBuilder
        //     .setId("1")
        //     .setType("Birthday Cake")
        //     .setFlavor("Chocolate")
        //     .setFilling("Vanilla Cream")
        //     .setSize(10)
        //     .setLayers(2)
        //     .setFrostingType("Buttercream")
        //     .setFrostingFlavor("Chocolate")
        //     .setDecorationType("Sprinkles")
        //     .setDecorationColor("Rainbow")
        //     .setCustomMessage("Happy Birthday!")
        //     .setShape("Round")
        //     .setAllergies("Nuts")
        //     .setSpecialIngredients("None")
        //     .setPackagingType("Box")
        //     .setPrice(29.99)
        //     .setQuantity(1)
        //     .build();
        // logger.info("Cake created successfully", cake);
        // // Instance of a Book
        // const bookBuilder = new BookBuilder();
        // const book = bookBuilder
        //     .setOrderId("2")
        //     .setBookTitle("The Great Gatsby")
        //     .setAuthor("F. Scott Fitzgerald")
        //     .setGenre("Fiction")
        //     .setFormat("Hardcover")
        //     .setLanguage("English")
        //     .setPublisher("Scribner")
        //     .setSpecialEdition("Collector's Edition")
        //     .setPackaging("Gift Wrap")
        //     .setPrice(19.99)
        //     .setQuantity(1)
        //     .build();
        // logger.info("Book created successfully", book);
        // // Instance of a Toy
        // const toyBuilder = new ToyBuilder();
        // const toy = toyBuilder
        //     .setOrderID(3)
        //     .setType("Action Figure")
        //     .setAgeGroup("6-12")
        //     .setBrand("LEGO")
        //     .setMaterial("Plastic")
        //     .setBatteryRequired(false)
        //     .setEducational(true)
        //     .setPrice(49.99)
        //     .setQuantity(1)
        //     .build();
        // logger.info("Toy created successfully", toy);
        const cakeBuilder1 = new cake_builder_1.CakeBuilder();
        cakeBuilder1.build();
    });
}
main();
//# sourceMappingURL=index.js.map