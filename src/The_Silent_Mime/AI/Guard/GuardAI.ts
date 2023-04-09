import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import AI from "../../../Wolfie2D/DataTypes/Interfaces/AI";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import GuardActor from "../../Actors/GuardActor";
import { Patrol, Chase, GuardStateType } from "../Guard/GuardStates/GuardState";
export default class GuardAI extends StateMachineAI implements AI {
  public owner: GuardActor;

  public initializeAI(owner: GuardActor, config: Record<string, any>): void {
    this.owner = owner;
    this.addState(GuardStateType.CHASE, new Chase(this, this.owner));
    this.addState(GuardStateType.PATROL, new Patrol(this, this.owner));
    this.initialize(GuardStateType.PATROL);
  }
}
