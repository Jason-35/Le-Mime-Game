import NavigationPath from "../../../../Wolfie2D/Pathfinding/NavigationPath";
import PlayerActor from "../../../Actors/PlayerActor";
import StationaryGuardActor from "../../../Actors/StationaryGuardActor";
import StationaryGuardState, {
  StationaryGuardAnimationType,
  StationaryGuardStateType,
} from "./StationaryGuardState";

export default class StationaryGuardStation extends StationaryGuardState {
  public target;
  public range;
  protected _path;
  onEnter(options: Record<string, any>): void {
    this.target = this.parent.player;
    this.range = this.parent.range;
    this.path = this.owner.getPath(this.owner.position, this.parent.station);
  }

  update(deltaT: number): void {
    if (
      this.path !== null &&
      !this.path.isDone() &&
      (this.owner.position.x != this.parent.station.x ||
        this.owner.position.y != this.parent.station.y)
    ) {
      this.owner.detectiveMoveOnPath(50 * deltaT, this.path, this.owner);
    } else {
      this.owner.animation.playIfNotAlready(
        StationaryGuardAnimationType.IDLE_DOWN
      );
    }
    this.inArea(this.owner, this.target);
  }

  inArea(owner: StationaryGuardActor, player: PlayerActor) {
    if (
      owner.position.x + this.range > player.position.x &&
      owner.position.x - this.range < player.position.x &&
      owner.position.y + this.range > player.position.y &&
      owner.position.y - this.range < player.position.y &&
      !player.inDisguise &&
      !player.inInvis
    ) {
      this.finished(StationaryGuardStateType.CHASE);
    }
  }

  protected set path(path: NavigationPath | null) {
    this._path = path;
  }

  protected get path(): NavigationPath | null {
    return this._path;
  }
}
