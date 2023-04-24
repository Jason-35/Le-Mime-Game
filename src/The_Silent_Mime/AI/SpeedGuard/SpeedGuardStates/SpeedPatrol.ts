import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import NavigationPath from "../../../../Wolfie2D/Pathfinding/NavigationPath";
import SpeedGuardState from "./SpeedGuardState";
import {
  SpeedGuardAnimationType,
  SpeedGuardStateType,
} from "./SpeedGuardState";

export default class SpeedPatrol extends SpeedGuardState {
  protected patrolPath: Vec2[];
  protected curTarget: Vec2;
  protected curIndex = 0;
  public path: NavigationPath | null;
  protected detected = false;

  onEnter(options: Record<string, any>): void {
    this.patrolPath = this.parent.patrolPath;
    this.curIndex = 0;
    this.curTarget = this.patrolPath[this.curIndex];
    this.detected = false;
  }
  public update(deltaT: number): void {
    if (
      this.parent.owner.position.x == this.curTarget.x &&
      this.parent.owner.position.y == this.curTarget.y
    ) {
      this.curIndex++;
    }
    this.curTarget = this.patrolPath[this.curIndex];

    if (this.patrolPath.length - 1 == this.curIndex) {
      this.patrolPath = this.patrolPath.slice().reverse();
      this.curIndex = 0;
    }

    let x = this.parent.owner.position.x - this.curTarget.x;
    let y = this.parent.owner.position.y - this.curTarget.y;
    if (x > 0) {
      this.parent.owner.animation.playIfNotAlready(
        SpeedGuardAnimationType.MOVING_LEFT
      );
      if (
        this.parent.owner.position.x - 100 < this.parent.player.position.x &&
        this.parent.owner.position.x > this.parent.player.position.x &&
        this.parent.owner.position.y + 50 > this.parent.player.position.y &&
        this.parent.owner.position.y - 50 < this.parent.player.position.y &&
        !this.parent.player.inInvis
      ) {
        this.detected = true;
      }
    } else if (x < 0) {
      this.parent.owner.animation.playIfNotAlready(
        SpeedGuardAnimationType.MOVING_RIGHT
      );
      if (
        this.parent.owner.position.x < this.parent.player.position.x &&
        this.parent.owner.position.x + 100 > this.parent.player.position.x &&
        this.parent.owner.position.y - 50 < this.parent.player.position.y &&
        this.parent.owner.position.y + 50 > this.parent.player.position.y &&
        !this.parent.player.inInvis
      ) {
        this.detected = true;
      }
    } else if (y < 0) {
      this.parent.owner.animation.playIfNotAlready(
        SpeedGuardAnimationType.MOVING_DOWN
      );
      if (
        this.parent.owner.position.y + 100 > this.parent.player.position.y &&
        this.parent.owner.position.y < this.parent.player.position.y &&
        this.parent.owner.position.x + 50 > this.parent.player.position.x &&
        this.parent.owner.position.x - 50 < this.parent.player.position.x &&
        !this.parent.player.inInvis
      ) {
        this.detected = true;
      }
    } else if (y > 0) {
      this.parent.owner.animation.playIfNotAlready(
        SpeedGuardAnimationType.MOVING_UP
      );
      if (
        this.parent.owner.position.y > this.parent.player.position.y &&
        this.parent.owner.position.y - 100 < this.parent.player.position.y &&
        this.parent.owner.position.x + 50 > this.parent.player.position.x &&
        this.parent.owner.position.x - 50 < this.parent.player.position.x &&
        !this.parent.player.inInvis
      ) {
        this.detected = true;
      }
    }

    this.parent.owner.move(
      new Vec2(x > 0 ? -1 : x < 0 ? 1 : 0, y > 0 ? -1 : y < 0 ? 1 : 0)
    );
    if (
      this.detected &&
      !this.parent.player.inDisguise &&
      !this.parent.player.inInvis
    ) {
      this.finished(SpeedGuardStateType.CHASE);
    }
  }
  // }

  public onExit(): Record<string, any> {
    return {};
  }

  public eqVec(v1: Vec2, v2: Vec2) {
    if (v1.x == v2.x && v1.y == v2.y) {
      return true;
    }
    return false;
  }
}
