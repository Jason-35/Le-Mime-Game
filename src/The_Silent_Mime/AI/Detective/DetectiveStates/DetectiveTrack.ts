import NavigationPath from "../../../../Wolfie2D/Pathfinding/NavigationPath";
import DetectiveActor from "../../../Actors/DetectiveActor";
import PlayerActor from "../../../Actors/PlayerActor";
import DetectiveState from "./DetectiveState";
import { DetectiveAnimationType } from "./DetectiveState";

export default class DetectiveTracking extends DetectiveState {
  protected _path;
  public target;
  onEnter(options: Record<string, any>): void {
    this.target = this.parent.player.position;
    this.path = this.owner.getPath(this.owner.position, this.target);
  }

  update(deltaT: number): void {
    super.update(deltaT);
    if (!this.parent.player.inInvis) {
      if (this.path !== null && !this.path.isDone()) {
        this.owner.detectiveMoveOnPath(85 * deltaT, this.path, this.owner);
      } else {
        this.path = this.owner.getPath(this.owner.position, this.target);
      }
      if (
        this.caughtMime(this.owner, this.parent.player) &&
        !this.parent.player.cheating
      ) {
        this.emitter.fireEvent("GAMEOVER");
      }
    } else {
      this.owner.animation.playIfNotAlready(DetectiveAnimationType.IDLE_DOWN);
    }
  }

  protected set path(path: NavigationPath | null) {
    this._path = path;
  }

  protected get path(): NavigationPath | null {
    return this._path;
  }

  protected caughtMime(owner: DetectiveActor, player: PlayerActor) {
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
