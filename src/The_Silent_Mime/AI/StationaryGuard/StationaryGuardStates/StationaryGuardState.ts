import State from "../../../../Wolfie2D/DataTypes/State/State";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";

export enum StationaryGuardStateType {
  STATION = "STATION",
  CHASE = "CHASE",
}

export enum StationaryGuardAnimationType {
  IDLE_LEFT = "IDLE_LEFT",
  IDLE_RIGHT = "IDLE_RIGHT",
  IDLE_UP = "IDLE_UP",
  IDLE_DOWN = "IDLE_DOWN",
  MOVING_LEFT = "MOVING_LEFT",
  MOVING_UP = "MOVING_UP",
  MOVING_DOWN = "MOVING_DOWN",
  MOVING_RIGHT = "MOVING_RIGHT",
}

export default class StationaryGuardState extends State {
  protected parent: StationaryGuardAI;
  protected owner: StationaryGuardActor;
  public constructor(parent: StationaryGuardAI, owner: StationaryGuardActor) {
    super(parent);
    this.owner = owner;
  }
  onEnter(options: Record<string, any>): void {}
  handleInput(event: GameEvent): void {}
  update(deltaT: number): void {}
  onExit(): Record<string, any> {
    return {};
  }
}

import StationaryGuardStation from "./StationaryGuardStation";
import StationaryGuardChase from "./StationaryGuardChase";
import StationaryGuardAI from "../StationaryGuardAI";
import StationaryGuardActor from "../../../Actors/StationaryGuardActor";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
export { StationaryGuardChase, StationaryGuardStation };
