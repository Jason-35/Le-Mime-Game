import Input from "../../../../Wolfie2D/Input/Input";
import NavigationPath from "../../../../Wolfie2D/Pathfinding/NavigationPath";
import { PlayerInput } from "../../Player/PlayerController";
import GuardState from "./GuardState";

export default class Chase extends GuardState {
  protected _path;
  public target;
  onEnter(options: Record<string, any>): void {
    this.target = this.parent.player.position;
    this.path = this.owner.getPath(this.owner.position, this.target);
    // console.log(this.path);
  }

  update(deltaT: number): void {
    super.update(deltaT);
    if (this.path !== null && !this.path.isDone()) {
      this.owner.moveOnPath(100 * deltaT, this.path, this.owner);
    } else {
      this.path = this.owner.getPath(this.owner.position, this.target);
    }
    if (this.owner.isColliding && !this.owner.collidedWithTilemap) {
      console.log("caught the mime");
      Input.disableInput();
    }
  }

  onExit(): Record<string, any> {
    return {};
  }

  protected set path(path: NavigationPath | null) {
    this._path = path;
  }

  protected get path(): NavigationPath | null {
    return this._path;
  }
}
