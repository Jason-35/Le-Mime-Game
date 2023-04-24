import Input from "../../../../Wolfie2D/Input/Input";
import NavigationPath from "../../../../Wolfie2D/Pathfinding/NavigationPath";
import PlayerActor from "../../../Actors/PlayerActor";
import SpeedGuardActor from "../../../Actors/SpeedGuardActor";
import SpeedGuardState, {
  SpeedGuardAnimationType,
  SpeedGuardStateType,
} from "./SpeedGuardState";

export default class SpeedChase extends SpeedGuardState {
  protected _path;
  public target;
  onEnter(options: Record<string, any>): void {
    this.target = this.parent.player.position;
    this.path = this.owner.getPath(this.owner.position, this.target);
  }

  update(deltaT: number): void {
    super.update(deltaT);

    if (this.path !== null && !this.path.isDone()) {
      this.owner.guardMoveOnPath(150 * deltaT, this.path, this.owner);
    } else {
      this.path = this.owner.getPath(this.owner.position, this.target);
    }
    if (this.parent.player.inInvis) {
      this.finished(SpeedGuardStateType.RETURN);
    }
    if (
      this.caughtMime(this.owner, this.parent.player) &&
      !this.parent.player.cheating
    ) {
      //   Input.disableInput();
      this.emitter.fireEvent("GAMEOVER");
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

  protected caughtMime(owner: SpeedGuardActor, player: PlayerActor) {
    if (
      owner.position.x + 20 > player.position.x &&
      owner.position.x - 20 < player.position.x &&
      owner.position.y + 20 > player.position.y &&
      owner.position.y - 20 < player.position.y
    ) {
      return true;
    }
    return false;
  }
}
