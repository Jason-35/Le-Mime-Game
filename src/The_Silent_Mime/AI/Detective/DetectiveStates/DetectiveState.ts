import State from "../../../../Wolfie2D/DataTypes/State/State";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import DetectiveActor from "../../../Actors/DetectiveActor";
import DetectiveAI from "../DetectiveAI";

export enum DetectiveStateType {
  TRACKING = "TRACKING",
}

export enum DetectiveAnimationType {
  IDLE_LEFT = "IDLE_LEFT",
  IDLE_RIGHT = "IDLE_RIGHT",
  IDLE_UP = "IDLE_UP",
  IDLE_DOWN = "IDLE_DOWN",
  MOVING_LEFT = "MOVING_LEFT",
  MOVING_UP = "MOVING_UP",
  MOVING_DOWN = "MOVING_DOWN",
  MOVING_RIGHT = "MOVING_RIGHT",
}

export default class DetectiveState extends State {
  protected parent: DetectiveAI;
  protected owner: DetectiveActor;
  public constructor(parent: DetectiveAI, owner: DetectiveActor) {
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

import DetectiveTracking from "./DetectiveTrack";
export { DetectiveTracking };
