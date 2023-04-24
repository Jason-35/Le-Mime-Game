import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import Input from "../../../../Wolfie2D/Input/Input";
import { PlayerInput } from "../PlayerController";
import PlayerState, {
  PlayerAnimationType,
  PlayerStateType,
} from "./PlayerState";

export default class Moving extends PlayerState {
  public override onEnter(options: Record<string, any>): void {}

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
    if (this.owner.isColliding) {
      this.emitter.fireEvent("COLLISIONSFX");
    }
    switch (this.parent.controller.currentDirection) {
      case 1: {
        if (this.owner.inDisguise) {
          this.parent.owner.animation.playIfNotAlready(
            PlayerAnimationType.DISGUISE_MOVING_DOWN
          );
        } else {
          this.parent.owner.animation.playIfNotAlready(
            PlayerAnimationType.MOVING_DOWN
          );
        }
        break;
      }
      case 2: {
        if (this.owner.inDisguise) {
          this.parent.owner.animation.playIfNotAlready(
            PlayerAnimationType.DISGUISE_MOVING_UP
          );
        } else {
          this.parent.owner.animation.playIfNotAlready(
            PlayerAnimationType.MOVING_UP
          );
        }
        break;
      }
      case 3: {
        if (this.owner.inDisguise) {
          this.parent.owner.animation.playIfNotAlready(
            PlayerAnimationType.DISGUISE_MOVING_LEFT
          );
        } else {
          this.parent.owner.animation.playIfNotAlready(
            PlayerAnimationType.MOVING_LEFT
          );
        }
        break;
      }
      case 4: {
        if (this.owner.inDisguise) {
          this.parent.owner.animation.playIfNotAlready(
            PlayerAnimationType.DISGUISE_MOVING_RIGHT
          );
        } else {
          this.parent.owner.animation.playIfNotAlready(
            PlayerAnimationType.MOVING_RIGHT
          );
        }
        break;
      }
    }

    if (this.parent.controller.moveDir.equals(Vec2.ZERO)) {
      this.finished(PlayerStateType.IDLE);
    }
  }

  public override onExit(): Record<string, any> {
    return {};
  }
}
