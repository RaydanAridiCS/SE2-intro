import logger from '../../util/logger';
import { Toy } from '../toy.model';


export class ToyBuilder {

    private type!: string;
    private ageGroup!: string;
    private brand!: string;
    private material!: string;
    private batteryRequired!: boolean;
    private educational!: boolean;



    static newBuilder(): ToyBuilder {
        return new ToyBuilder();
    }


    setType(type: string): this {
        this.type = type;
        return this;
    }

    setAgeGroup(ageGroup: string): this {
        this.ageGroup = ageGroup;
        return this;
    }

    setBrand(brand: string): this {
        this.brand = brand;
        return this;
    }

    setMaterial(material: string): this {
        this.material = material;
        return this;
    }

    setBatteryRequired(batteryRequired: boolean): this {
        this.batteryRequired = batteryRequired;
        return this;
    }

    setEducational(educational: boolean): this {
        this.educational = educational;
        return this;
    }

    build(): Toy {
        const missingFields: string[] = [];

        const fieldsToCheck = {
            type: this.type,
            ageGroup: this.ageGroup,
            brand: this.brand,
            material: this.material,
            batteryRequired: this.batteryRequired,
            educational: this.educational
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

        return new Toy(
            this.type,
            this.ageGroup,
            this.brand,
            this.material,
            this.batteryRequired,
            this.educational,
        );
    }
}