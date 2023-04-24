import State from "../../../../Wolfie2D/DataTypes/State/State";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import TreasureActor from "../../../Actors/TreasureActor";
import TreasureAI from "../TreasureAI";

export enum TreasureStateType {
  STOLEN = "STOLEN",
}

export enum TreasureAnimationType {
  SPIN = "SPIN",
}

export default class TreasureState extends State {
  protected parent: TreasureAI;
  protected owner: TreasureActor;
  public constructor(parent: TreasureAI, owner: TreasureActor) {
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

import TreasureStolen from "./TreasureStolen";
export { TreasureStolen };
