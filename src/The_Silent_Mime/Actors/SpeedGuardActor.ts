import Spritesheet from "../../Wolfie2D/DataTypes/Spritesheet";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import NavigationPath from "../../Wolfie2D/Pathfinding/NavigationPath";

export default class SpeedGuardActor extends AnimatedSprite {
  protected _navkey: string;
  protected _startposition: Vec2;

  public constructor(sheet: Spritesheet) {
    super(sheet);
    this._navkey = "navkey";
  }

  public get navkey(): string {
    return this._navkey;
  }
  public set navkey(navkey: string) {
    this._navkey = navkey;
  }

  public get startPosition() {
    return this._startposition;
  }

  public set startPosition(num: Vec2) {
    this._startposition = num;
  }
  getPath(to: Vec2, from: Vec2): NavigationPath {
    return this.scene.getNavigationManager().getPath(this.navkey, to, from);
  }
}
