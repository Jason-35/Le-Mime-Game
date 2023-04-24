import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import Input from "../../../../Wolfie2D/Input/Input";
import { PlayerInput } from "../PlayerController";
import PlayerState, {
  PlayerAnimationType,
  PlayerStateType,
} from "./PlayerState";

export default class Idle extends PlayerState {
  public override onEnter(options: Record<string, any>): void {
    switch (this.parent.controller.currentDirection) {
      case 1: {
        if (this.owner.inDisguise) {
          this.owner.animation.playIfNotAlready(
            PlayerAnimationType.DISGUISE_IDLE_DOWN
          );
        } else {
          this.owner.animation.playIfNotAlready(PlayerAnimationType.IDLE_DOWN);
        }
        break;
      }
      case 2: {
        if (this.owner.inDisguise) {
          this.owner.animation.playIfNotAlready(
            PlayerAnimationType.DISGUISE_IDLE_UP
          );
        } else {
          this.owner.animation.playIfNotAlready(PlayerAnimationType.IDLE_UP);
        }
        break;
      }
      case 3: {
        if (this.owner.inDisguise) {
          this.owner.animation.playIfNotAlready(
            PlayerAnimationType.DISGUISE_IDLE_LEFT
          );
        } else {
          this.owner.animation.playIfNotAlready(PlayerAnimationType.IDLE_LEFT);
        }
        break;
      }
      case 4: {
        if (this.owner.inDisguise) {
          this.owner.animation.playIfNotAlready(
            PlayerAnimationType.DISGUISE_IDLE_RIGHT
          );
        } else {
          this.owner.animation.playIfNotAlready(PlayerAnimationType.IDLE_RIGHT);
        }
        break;
      }
    }
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

    if (Input.isJustPressed(PlayerInput.DISGUISE) && this.owner.canDisguise) {
      this.finished(PlayerStateType.DISGUISE);
    }
    if (!this.parent.controller.moveDir.equals(Vec2.ZERO)) {
      this.finished(PlayerStateType.MOVING);
    }
  }

  public override onExit(): Record<string, any> {
    return {};
  }
}
