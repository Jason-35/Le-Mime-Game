import State from "../../../../Wolfie2D/DataTypes/State/State";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import GuardAI from "../GuardAI";

export enum GuardStateType {
  PATROL = "PATROL",
  CHASE = "CHASE",
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

export enum GuardAnimationType {
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

export default class GuardState extends State {
  protected parent: GuardAI;
  protected owner: GuardActor;
  public constructor(parent: GuardAI, owner: GuardActor) {
    super(parent);
    this.owner = owner;
  }
  onEnter(options: Record<string, any>): void {}
  handleInput(event: GameEvent): void {
    switch (event.type) {
      default: {
        throw new Error(
          `Unhandled event of type ${event.type} caught in PlayerState!`
        );
      }
    }
  }
  update(deltaT: number): void {
    this.parent.owner.move(new Vec2(1, 1));
  }
  onExit(): Record<string, any> {
    return {};
  }
}

import Chase from "./Chase";
import Patrol from "./Patrol";
import GuardActor from "../../../Actors/GuardActor";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";

export { Chase, Patrol };
