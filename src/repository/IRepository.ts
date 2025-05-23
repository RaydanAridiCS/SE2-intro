
export type id = string;
/**
 * Represents an entity with a unique identifier.
 */
export interface ID {
    /**
     * Returns the unique identifier of the entity.
     */
    getId(): id;
}

/**
 * Create a new item in the repository.
 * 
 * @template T - The type of the entity managed by the repository.
 * 
 * @throws {InvalidItemException} If the item is not valid.
 */
export interface IRepository<T> extends ID {
    /**
     * Creates a new entity in the repository.
     * 
     * @param item - The entity to create.
     * @returns A promise that resolves to the ID of the created entity.
     * @throws {InvalidItemException} If the item is not valid.
     */
    create(item: T): Promise<id>;

    /**
     * Retrieves an entity by its ID.
     * 
     * @param id - The ID of the entity to retrieve.
     * @returns A promise that resolves to the entity.
     * @throws {ItemNotFoundException} If the item is not found.
     */
    get(id: id): Promise<T>;

    /**
     * Retrieves all entities in the repository.
     * 
     * @returns A promise that resolves to an array of entities.
     */
    getAll(): Promise<T[]>;

    /**
     * Updates an existing entity in the repository.
     * 
     * @param item - The entity to update.
     * @returns A promise that resolves when the update is complete.
     * @throws {ItemNotFoundException} If the item is not found.
     * @throws {InvalidItemException} If the item is not valid.
     */
    update(item: T): Promise<void>;

    /**
     * Deletes an entity by its ID.
     * 
     * @param id - The ID of the entity to delete.
     * @returns A promise that resolves when the deletion is complete.
     * @throws {ItemNotFoundException} If the item is not found.
     */
    delete(id: id): Promise<void>;
}
