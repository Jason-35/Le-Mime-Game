import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import AI from "../../../Wolfie2D/DataTypes/Interfaces/AI";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import GuardActor from "../../Actors/GuardActor";
import { Patrol, Chase, GuardStateType } from "../Guard/GuardStates/GuardState";

export default class GuardAI extends StateMachineAI implements AI {
  public owner: GuardActor;
  public patrolPath: Array<Vec2>;
  public player;

  public initializeAI(owner: GuardActor, options: GuardOptions): void {
    this.owner = owner;
    this.patrolPath = options.patrolPath;
    this.player = options.target;

    this.addState(GuardStateType.CHASE, new Chase(this, this.owner));
    this.addState(GuardStateType.PATROL, new Patrol(this, this.owner));

    this.initialize(GuardStateType.PATROL);
  }
}

export interface GuardOptions {
  patrolPath: Array<Vec2>;
  target: number;
}
