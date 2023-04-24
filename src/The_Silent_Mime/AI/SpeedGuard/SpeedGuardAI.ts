import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import AI from "../../../Wolfie2D/DataTypes/Interfaces/AI";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import PlayerActor from "../../Actors/PlayerActor";
import SpeedGuardActor from "../../Actors/SpeedGuardActor";
import SpeedChase from "./SpeedGuardStates/SpeedChase";
import {
  SpeedGuardStateType,
  SpeedReturn,
} from "./SpeedGuardStates/SpeedGuardState";
import SpeedPatrol from "./SpeedGuardStates/SpeedPatrol";

export default class SpeedGuardAI extends StateMachineAI implements AI {
  public owner: SpeedGuardActor;
  public patrolPath: Array<Vec2>;
  public player: PlayerActor;

  public initializeAI(
    owner: SpeedGuardActor,
    options: SpeedGuardOptions
  ): void {
    this.owner = owner;
    this.patrolPath = options.patrolPath;
    this.player = options.target;

    this.addState(SpeedGuardStateType.CHASE, new SpeedChase(this, this.owner));
    this.addState(
      SpeedGuardStateType.PATROL,
      new SpeedPatrol(this, this.owner)
    );
    this.addState(
      SpeedGuardStateType.RETURN,
      new SpeedReturn(this, this.owner)
    );

    this.initialize(SpeedGuardStateType.PATROL);
  }
}

export interface SpeedGuardOptions {
  patrolPath: Array<Vec2>;
  target: PlayerActor;
}
