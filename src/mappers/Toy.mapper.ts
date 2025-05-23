import { Toy } from "../model/toy.model";
import { IMapper } from "./IMapper";
import { ToyBuilder } from "../model/builders/toy.builder";

export class XmlToyMapper implements IMapper<string[], Toy> {

    map(data: string[]): Toy {
        const batteryRequired = data[5].trim().toLowerCase() === "yes";
        const educational = data[6].trim().toLowerCase() === "yes";

        return ToyBuilder.newBuilder()
            .setType(String(data[1]))
            .setAgeGroup(String(data[2]))
            .setBrand(String(data[3]))
            .setMaterial(String(data[4]))
            .setBatteryRequired(batteryRequired)
            .setEducational(educational)
            .build();
    }
    reverseMap(data: Toy): string[] {
        return [
            data.getType(),
            data.getAgeGroup(),
            data.getBrand(),
            data.getMaterial(),
            data.isBatteryRequired() ? "yes" : "no",
            data.isEducational() ? "yes" : "no"
        ];
    }
}
