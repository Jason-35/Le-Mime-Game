import State from "../../../../Wolfie2D/DataTypes/State/State";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import PlayerActor from "../../../Actors/PlayerActor";
import PlayerAI from "../PlayerAI";
import Timer from "../../../../Wolfie2D/Timing/Timer";

export enum PlayerStateType {
  IDLE = "IDLE",
  MOVING = "MOVING",
  DISGUISE = "DISGUISE",
  TELEPORT = "TELEPORT",
}

export enum PlayerAnimationType {
  IDLE_LEFT = "IDLE_LEFT",
  IDLE_RIGHT = "IDLE_RIGHT",
  IDLE_UP = "IDLE_UP",
  IDLE_DOWN = "IDLE_DOWN",
  MOVING_LEFT = "MOVING_LEFT",
  MOVING_UP = "MOVING_UP",
  MOVING_DOWN = "MOVING_DOWN",
  MOVING_RIGHT = "MOVING_RIGHT",
  DISGUISE_IDLE_DOWN = "DISGUISE_IDLE_DOWN",
  DISGUISE_IDLE_UP = "DISGUISE_IDLE_UP",
  DISGUISE_IDLE_LEFT = "DISGUISE_IDLE_LEFT",
  DISGUISE_IDLE_RIGHT = "DISGUISE_IDLE_RIGHT",
  DISGUISE_MOVING_DOWN = "DISGUISE_MOVING_DOWN",
  DISGUISE_MOVING_UP = "DISGUISE_MOVING_UP",
  DISGUISE_MOVING_LEFT = "DISGUISE_MOVING_LEFT",
  DISGUISE_MOVING_RIGHT = "DISGUISE_MOVING_RIGHT",
}

export default abstract class PlayerState extends State {
  protected parent: PlayerAI;
  protected owner: PlayerActor;

  public constructor(parent: PlayerAI, owner: PlayerActor) {
    super(parent);
    this.owner = owner;
  }

  onEnter(options: Record<string, any>): void {}
  handleInput(event: GameEvent): void {}
  update(deltaT: number): void {
    this.parent.owner.move(this.parent.controller.moveDir);
    this.parent.controller.dashing();
    this.parent.controller.disguising();
    this.parent.controller.usingDisguise();
    this.parent.controller.invisible();
    if (this.owner.checkInventorySize() === this.owner.needStealing) {
      this.emitter.fireEvent("FINISH");
    }
    if (Input.isKeyJustPressed("p")) {
      console.log("cheat on");
      this.owner.cheating = !this.owner.cheating;
    }
  }
  onExit(): Record<string, any> {
    return {};
  }
}

import Idle from "./Idle";
import Moving from "./Moving";
import Input from "../../../../Wolfie2D/Input/Input";
export { Idle, Moving };
