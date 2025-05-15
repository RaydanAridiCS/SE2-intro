import logger from '../../util/logger';
import {Cake} from '../cake.model';

export class CakeBuilder{
    
    private id!: string;
    private type!: string;
    private flavor!: string;
    private filling!: string;
    private size!: number;
    private layers!: number;
    private frostingType!: string;
    private frostingFlavor!: string;
    private decorationType!: string;
    private decorationColor!: string;
    private customMessage!: string;
    private shape!: string;
    private allergies!: string;
    private specialIngredients!: string;
    private packagingType!: string;
    private price!: number;
    private quantity!: number;

    public setId(id: string): this {
        this.id = id;
        return this;
    }

    public setType(type: string): this {
        this.type = type;
        return this;
    }

    public setFlavor(flavor: string): this {
        this.flavor = flavor;
        return this;
    }

    public setFilling(filling: string): this {
        this.filling = filling;
        return this;
    }

    public setSize(size: number): this {
        this.size = size;
        return this;
    }

    public setLayers(layers: number): this {
        this.layers = layers;
        return this;
    }

    public setFrostingType(frostingType: string): this {
        this.frostingType = frostingType;
        return this;
    }

    public setFrostingFlavor(frostingFlavor: string): this {
        this.frostingFlavor = frostingFlavor;
        return this;
    }

    public setDecorationType(decorationType: string): this {
        this.decorationType = decorationType;
        return this;
    }

    public setDecorationColor(decorationColor: string): this {
        this.decorationColor = decorationColor;
        return this;
    }

    public setCustomMessage(customMessage: string): this {
        this.customMessage = customMessage;
        return this;
    }

    public setShape(shape: string): this {
        this.shape = shape;
        return this;
    }

    public setAllergies(allergies: string): this {
        this.allergies = allergies;
        return this;
    }

    public setSpecialIngredients(specialIngredients: string): this {
        this.specialIngredients = specialIngredients;
        return this;
    }

    public setPackagingType(packagingType: string): this {
        this.packagingType = packagingType;
        return this;
    }

    public setPrice(price: number): this {
        this.price = price;
        return this;
    }

    public setQuantity(quantity: number): this {
        this.quantity = quantity;
        return this;
    }

    public build(): Cake {
        const missingFields: string[] = [];

        const fieldsToCheck= {
          id: this.id,
          type: this.type,
          flavor: this.flavor,
          filling: this.filling,
          size: this.size,
          layers: this.layers,
          frostingType: this.frostingType,
          frostingFlavor: this.frostingFlavor,
          decorationType: this.decorationType,
          decorationColor: this.decorationColor,
          customMessage: this.customMessage,
          shape: this.shape,
          allergies: this.allergies,
          specialIngredients: this.specialIngredients,
          packagingType: this.packagingType,
          price: this.price,
          quantity: this.quantity,
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

        return new Cake(
            this.id,
            this.type,
            this.flavor,
            this.filling,
            this.size,
            this.layers,
            this.frostingType,
            this.frostingFlavor,
            this.decorationType,
            this.decorationColor,
            this.customMessage,
            this.shape,
            this.allergies,
            this.specialIngredients,
            this.packagingType,
            this.price,
            this.quantity
        );
    }
}