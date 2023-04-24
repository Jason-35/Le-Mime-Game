import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import AI from "../../../Wolfie2D/DataTypes/Interfaces/AI";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import PlayerActor from "../../Actors/PlayerActor";
import StationaryGuardActor from "../../Actors/StationaryGuardActor";
import {
  StationaryGuardChase,
  StationaryGuardStateType,
  StationaryGuardStation,
} from "./StationaryGuardStates/StationaryGuardState";

export default class StationaryGuardAI extends StateMachineAI implements AI {
  public owner: StationaryGuardActor;
  public player: PlayerActor;
  public range: number;
  public station: Vec2;
  public initializeAI(
    owner: StationaryGuardActor,
    options: StationaryGuardOptions
  ): void {
    this.owner = owner;
    this.player = options.target;
    this.range = options.range;
    this.station = options.station;

    this.addState(
      StationaryGuardStateType.STATION,
      new StationaryGuardStation(this, this.owner)
    );

    this.addState(
      StationaryGuardStateType.CHASE,
      new StationaryGuardChase(this, this.owner)
    );

    this.initialize(StationaryGuardStateType.STATION);
  }
}

export interface StationaryGuardOptions {
  target: PlayerActor;
  station: Vec2;
  range: number;
}
