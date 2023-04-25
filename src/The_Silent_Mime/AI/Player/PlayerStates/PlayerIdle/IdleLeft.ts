import Vec2 from "../../../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../../../Wolfie2D/Events/GameEvent";
import PlayerState, {
  PlayerAnimationType,
  PlayerStateType,
} from "../PlayerState";

export default class IdleLeft extends PlayerState {
  public override onEnter(options: Record<string, any>): void {
    this.parent.owner.animation.playIfNotAlready(
      PlayerAnimationType.IDLE_LEFT,
      true
    );
  }

  public override handleInput(event: GameEvent): void {
    switch (event.type) {
      default: {
        super.handleInput(event);
        break;
      }
    }
  }

  public override update(deltaT: number): void {
    super.update(deltaT);
    if (!this.parent.controller.moveDir.equals(Vec2.ZERO)) {
      this.finished(PlayerStateType.MOVING);
    }
  }

  public override onExit(): Record<string, any> {
    return {};
  }
}
