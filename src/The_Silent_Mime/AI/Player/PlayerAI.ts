import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import AI from "../../../Wolfie2D/DataTypes/Interfaces/AI";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import PlayerActor from "../../Actors/PlayerActor";
import PlayerController from "./PlayerController";
import Disguise from "./PlayerStates/Disguise";
import { Idle, Moving, PlayerStateType } from "./PlayerStates/PlayerState";

export default class PlayerAI extends StateMachineAI implements AI {
  public owner: PlayerActor;
  public controller: PlayerController;

  public initializeAI(owner: PlayerActor, config: Record<string, any>): void {
    this.owner = owner;
    this.controller = new PlayerController(owner);
    this.addState(PlayerStateType.IDLE, new Idle(this, this.owner));
    this.addState(PlayerStateType.MOVING, new Moving(this, this.owner));
    this.addState(PlayerStateType.DISGUISE, new Disguise(this, this.owner));

    this.initialize(PlayerStateType.IDLE);
  }
}
