import PlayerState, { PlayerStateType } from "../PlayerState";
import { PlayerAnimationType } from "../PlayerState";
import Vec2 from "../../../../../Wolfie2D/DataTypes/Vec2";

export default class Moving_Right extends PlayerState {
  public onEnter(options: Record<string, any>): void {
    this.parent.owner.animation.play(PlayerAnimationType.MOVING_RIGHT);
  }

  public update(deltaT: number): void {
    super.update(deltaT);

    if (this.parent.controller.moveDir.x < 0) {
      this.finished(PlayerStateType.MOVING_LEFT);
    }
    if (this.parent.controller.moveDir.y > 0) {
      this.finished(PlayerStateType.MOVING_DOWN);
    }
    if (this.parent.controller.moveDir.y < 0) {
      this.finished(PlayerStateType.MOVING_UP);
    }

    if (this.parent.controller.moveDir.equals(Vec2.ZERO)) {
      this.finished(PlayerStateType.IDLE_RIGHT);
    }
  }

  public onExit(): Record<string, any> {
    return {};
  }
}
