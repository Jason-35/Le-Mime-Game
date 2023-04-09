import State from "../../../../Wolfie2D/DataTypes/State/State";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";

import PlayerAI from "../PlayerAI";

export enum PlayerStateType {
  IDLE = "IDLE",
  MOVING = "MOVING",
}

export enum PlayerAnimationType {
  IDLE = "IDLE",
}

export default class PlayerState extends State {
  protected parent: PlayerAI;
  protected owner: PlayerActor;

  public constructor(parent: PlayerAI, owner: PlayerActor) {
    super(parent);
    this.owner = owner;
  }

  public override onEnter(options: Record<string, any>): void {}
  public override onExit(): Record<string, any> {
    return {};
  }

  public override update(deltaT: number): void {
    // Move the player
    this.parent.owner.move(this.parent.controller.moveDir);
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
}

import Idle from "./Moving";
import Moving from "./Moving";

import PlayerActor from "../../../Actors/PlayerActor";
export { Idle, Moving };
