// import logger from "./util/logger";
import { CakeBuilder } from "./model/builders/cake.builder";
// import { BookBuilder } from "./model/builders/book.builder";
// import { ToyBuilder } from "./model/builders/toy.builder";

async function main() {
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

    const cakeBuilder1 = new CakeBuilder();
    cakeBuilder1.build();
}

main();