import Spritesheet from "../../Wolfie2D/DataTypes/Spritesheet";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import NavigationPath from "../../Wolfie2D/Pathfinding/NavigationPath";

export default class DetectiveActor extends AnimatedSprite {
  protected _navkey: string;

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

  getPath(to: Vec2, from: Vec2): NavigationPath {
    return this.scene.getNavigationManager().getPath(this.navkey, to, from);
  }
}
