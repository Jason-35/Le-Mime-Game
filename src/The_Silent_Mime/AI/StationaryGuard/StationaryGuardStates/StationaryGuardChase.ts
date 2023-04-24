import NavigationPath from "../../../../Wolfie2D/Pathfinding/NavigationPath";
import PlayerActor from "../../../Actors/PlayerActor";
import StationaryGuardActor from "../../../Actors/StationaryGuardActor";
import StationaryGuardState, {
  StationaryGuardStateType,
} from "./StationaryGuardState";

export default class StationaryGuardChase extends StationaryGuardState {
  protected _path;
  public target;
  onEnter(options: Record<string, any>): void {
    this.target = this.parent.player.position;
    this.path = this.owner.getPath(this.owner.position, this.target);
  }

  update(deltaT: number): void {
    super.update(deltaT);
    if (this.path !== null && !this.path.isDone()) {
      this.owner.detectiveMoveOnPath(85 * deltaT, this.path, this.owner);
    } else {
      this.path = this.owner.getPath(this.owner.position, this.target);
    }

    if (this.parent.player.inInvis) {
      this.finished(StationaryGuardStateType.STATION);
    }

    if (this.outOfStation(this.owner)) {
      this.finished(StationaryGuardStateType.STATION);
    }

    if (
      this.caughtMime(this.owner, this.parent.player) &&
      !this.parent.player.cheating
    ) {
      // Input.disableInput();
      this.emitter.fireEvent("GAMEOVER");
    }
  }

  protected set path(path: NavigationPath | null) {
    this._path = path;
  }

  protected get path(): NavigationPath | null {
    return this._path;
  }

  outOfStation(owner: StationaryGuardActor) {
    if (
      owner.position.x > this.parent.station.x + this.parent.range * 2 ||
      owner.position.x < this.parent.station.x - this.parent.range * 2 ||
      owner.position.y > this.parent.station.y + this.parent.range * 2 ||
      owner.position.y < this.parent.station.y - this.parent.range * 2
    ) {
      return true;
    }
    return false;
  }

  protected caughtMime(owner: StationaryGuardActor, player: PlayerActor) {
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
