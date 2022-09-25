import Debug from "../../../Wolfie2D/Debug/Debug";
import Emitter from "../../../Wolfie2D/Events/Emitter";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import { ItemEvent } from "../../Events/ItemEvent";
import Item from "./Items/Item";

export default class Inventory {

    protected _owner: GameNode;
    protected _dirty: boolean;
    protected _cap: number;
    protected _size: number;

    protected inv: Map<number, Item>;

    constructor(owner: GameNode, items: Array<Item> = [], cap: number = 9) {
        this._owner = owner;
        this._size = 0;
        this._cap = cap;
        this.inv = new Map<number, Item>();
        items.forEach(item => item.pickup(this));
    }

    get owner(): GameNode { return this._owner; }
    get dirty(): boolean { return this._dirty; }
    protected set dirty(dirty: boolean) { this._dirty = dirty; }

    /**
     * Gets an item from this inventory by id.
     * @param id the id of the item to get
     * @returns the item if it exists; null otherwise
     */
    get(id: number): Item | null {
        if (!this.has(id)) {
            return null;
        }
        return this.inv.get(id);
    }

    /**
     * Adds an item to this inventory
     * @param item adds an item to the inventory with the key of the items owner
     * @returns if the Item was successfully added to the inventory; null otherwise
     */
    add(item: Item): Item | null { 
        if (this.has(item.owner.id) || this._size >= this._cap) {
            return null;
        }
        console.log("Inventory.add", `Adding item with id ${item.owner.id} to inventory with owner id ${this.owner.id}`);
        this.inv.set(item.owner.id, item);
        this._size += 1;
        this.dirty = true;
        return item;
    }

    has(id: number): boolean { 
        return this.inv.has(id);
    }

    remove(id: number): Item { 
        if (!this.has(id)) {
            return null;
        }
        let item: Item = this.get(id);
        this.inv.delete(id);
        this._size -= 1;
        this.dirty = true
        return item;
    }

    find(pred: (item: Item) => boolean): Item | null {
       return Array.from(this.inv.values()).find(pred);
    }

    findAll(pred: (item: Item) => boolean): Item[] | [] {
        return Array.from(this.inv.values()).filter(pred);
    }

    forEach(func: (item: Item) => void): void {}

    public clean(): void {
        this._dirty = false;
        if (this.owner.aiActive) {
            this.owner._ai.handleEvent(new GameEvent(ItemEvent.INVENTORY_CHANGED, {id: this.owner.id, inv: Array.from(this.inv.values())}));
        }
    }
}