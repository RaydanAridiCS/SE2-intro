import { Item, ItemCategory } from './item.model';

export class Cake implements Item{
    getCategory(): ItemCategory {
        return ItemCategory.Cake;
    }
}