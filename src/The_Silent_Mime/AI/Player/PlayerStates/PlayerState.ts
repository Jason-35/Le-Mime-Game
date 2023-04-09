import State from "../../../../Wolfie2D/DataTypes/State/State";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";

import PlayerAI from "../PlayerAI";

export enum PlayerStateType {
  IDLE = "IDLE",
  MOVING = "MOVING",
  MOVING_LEFT = "MOVING_LEFT",
  MOVING_UP = "MOVING_UP",
  MOVING_DOWN = "MOVING_DOWN",
  MOVING_RIGHT = "MOVING_RIGHT",
  IDLE_LEFT = "IDLE_LEFT",
  IDLE_RIGHT = "IDLE_RIGHT",
  IDLE_UP = "IDLE_UP",
  IDLE_DOWN = "IDLE_DOWN",
}

export enum PlayerAnimationType {
  // IDLE = "IDLE_DOWN",
  IDLE_LEFT = "IDLE_LEFT",
  IDLE_RIGHT = "IDLE_RIGHT",
  IDLE_UP = "IDLE_UP",
  IDLE_DOWN = "IDLE_DOWN",
  MOVING_LEFT = "MOVING_LEFT",
  MOVING_UP = "MOVING_UP",
  MOVING_DOWN = "MOVING_DOWN",
  MOVING_RIGHT = "MOVING_RIGHT",
}

export default class PlayerState extends State {
  protected parent: PlayerAI;
  protected owner: PlayerActor;

  pressedAbilityKey: Boolean;
  currentAbility: Number;

  public constructor(parent: PlayerAI, owner: PlayerActor) {
    super(parent);
    this.owner = owner;
    this.pressedAbilityKey = false;
    this.currentAbility = 1;
  }

  public override onEnter(options: Record<string, any>): void {}
  public override onExit(): Record<string, any> {
    return {};
  }

  public override update(deltaT: number): void {
    // Move the player
    this.parent.owner.move(this.parent.controller.moveDir);

    this.handleAbilityInput();
  }

  public override handleInput(event: GameEvent): void {
    switch (event.type) {
      default: {
        throw new Error(
          `Unhandled event of type ${event.type} caught in PlayerState!`
        );
      }
    }
  }

  private handleAbilityInput() {
    this.currentAbility = (this.parent.controller.currentAbility == -1) ? this.currentAbility :this.parent.controller.currentAbility;

    if (!this.parent.controller.abilityKey)
      this.pressedAbilityKey = false;
    
    if (this.parent.controller.abilityKey && !this.pressedAbilityKey){
      this.pressedAbilityKey = true;
      this.executeAbility();
    }
  }

  private executeAbility() {
    //this.owner.animation.play(PlayerAnimationType.MOVING_UP,false);
    if (this.currentAbility == 1) {
      this.owner.animation.play(PlayerAnimationType.MOVING_DOWN,false);
    } else if (this.currentAbility == 2){
      this.owner.animation.play(PlayerAnimationType.MOVING_LEFT,false);
    }
  }
}

import Idle from "./Idle";
import Moving from "./Moving";
import Moving_Left from "./PlayerMove/Moving_Left";
import Moving_Right from "./PlayerMove/Moving_Right";
import Moving_Up from "./PlayerMove/Moving_Up";
import Moving_Down from "./PlayerMove/Moving_Down";
import IdleDown from "./PlayerIdle/IdleDown";
import IdleLeft from "./PlayerIdle/IdleLeft";
import IdleRight from "./PlayerIdle/IdleRight";
import IdleUp from "./PlayerIdle/IdleUp";

import PlayerActor from "../../../Actors/PlayerActor";

export {
  Idle,
  Moving,
  Moving_Down,
  Moving_Right,
  Moving_Left,
  Moving_Up,
  IdleDown,
  IdleLeft,
  IdleRight,
  IdleUp,
};
