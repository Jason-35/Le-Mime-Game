import Spritesheet from "../../../Wolfie2D/DataTypes/Spritesheet";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite"
import NavigationPath from "../../../Wolfie2D/Pathfinding/NavigationPath";
import Inventory from "../../GameSystems/ItemSystem/Inventory";
import HW3Scene from "../../Scenes/HW3Scene";
import Battler from "../Battler";


export default class NPCActor extends AnimatedSprite implements Battler {

    /** Override the type of the scene to be the HW3 scene */
    protected scene: HW3Scene

    // Add our NPC stats 
    protected _maxHealth: number;
    protected _health: number;
    protected _battleGroup: number;
    protected _speed: number;

    // The NPCs inventry
    protected _inventory: Inventory;

    // The key of the Navmesh to use to build paths for this NPCActor
    protected _navkey: string;

    constructor(sheet: Spritesheet) {
        super(sheet);
        this.inventory = new Inventory();
    }

    public get battleGroup(): number { return this._battleGroup; }
    public set battleGroup(battleGroup: number) { this._battleGroup = battleGroup; }

    public get maxHealth(): number { return this._maxHealth }
    public set maxHealth(maxHealth: number) { this._maxHealth = maxHealth; }

    public get health(): number { return this._health; }
    public set health(health: number) { this._health = health; }

    public get speed(): number { return this._speed; }
    public set speed(speed: number) { this._speed = speed; }

    setScene(scene: HW3Scene): void { this.scene = scene; }
    getScene(): HW3Scene { return this.scene; }

    public get navkey(): string { return this._navkey; }
    public set navkey(navkey: string) { this._navkey = navkey; }

    getPath(to: Vec2, from: Vec2): NavigationPath { 
        return this.scene.getNavigationManager().getPath(this.navkey, to, from);
    }

    public get inventory(): Inventory { return this._inventory; }
    protected set inventory(inventory: Inventory) { this._inventory = inventory; }
}