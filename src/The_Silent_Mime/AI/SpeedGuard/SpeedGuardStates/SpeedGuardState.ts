import State from "../../../../Wolfie2D/DataTypes/State/State";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import SpeedGuardActor from "../../../Actors/SpeedGuardActor";
import SpeedGuardAI from "../SpeedGuardAI";

export enum SpeedGuardStateType {
  PATROL = "PATROL",
  CHASE = "CHASE",
  RETURN = "RETURN",
}

export enum SpeedGuardAnimationType {
  IDLE_LEFT = "IDLE_LEFT",
  IDLE_RIGHT = "IDLE_RIGHT",
  IDLE_UP = "IDLE_UP",
  IDLE_DOWN = "IDLE_DOWN",
  MOVING_LEFT = "MOVING_LEFT",
  MOVING_UP = "MOVING_UP",
  MOVING_DOWN = "MOVING_DOWN",
  MOVING_RIGHT = "MOVING_RIGHT",
}

export default class SpeedGuardState extends State {
  protected parent: SpeedGuardAI;
  protected owner: SpeedGuardActor;
  public constructor(parent: SpeedGuardAI, owner: SpeedGuardActor) {
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
  update(deltaT: number): void {}
  onExit(): Record<string, any> {
    return {};
  }
}

import SpeedPatrol from "./SpeedPatrol";
import SpeedChase from "./SpeedChase";
import SpeedReturn from "./SpeedReturn";
export { SpeedPatrol, SpeedChase, SpeedReturn };
