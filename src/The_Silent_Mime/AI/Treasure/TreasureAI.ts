import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import AI from "../../../Wolfie2D/DataTypes/Interfaces/AI";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import PlayerActor from "../../Actors/PlayerActor";
import TreasureActor from "../../Actors/TreasureActor";
import {
  TreasureStateType,
  TreasureStolen,
} from "./TreasureStates/TreasureState";

export default class TreasureAI extends StateMachineAI implements AI {
  public owner: TreasureActor;
  public player: PlayerActor;
  public initializeAI(owner: TreasureActor, config: TreasureOptions): void {
    this.owner = owner;
    this.player = config.target;

    this.addState(
      TreasureStateType.STOLEN,
      new TreasureStolen(this, this.owner)
    );

    this.initialize(TreasureStateType.STOLEN);
  }
}

export interface TreasureOptions {
  target: PlayerActor;
}
