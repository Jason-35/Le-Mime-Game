import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import AI from "../../../Wolfie2D/DataTypes/Interfaces/AI";
import PlayerActor from "../../Actors/PlayerActor";
import PlayerController from "./PlayerController";
import { Idle, Moving, PlayerStateType } from "./PlayerStates/PlayerState";

export default class PlayerAI extends StateMachineAI implements AI {
  public owner: PlayerActor;
  /** A set of controls for the player */
  public controller: PlayerController;
  /** The inventory object associated with the player */
  public initializeAI(owner: PlayerActor, opts: Record<string, any>): void {
    this.owner = owner;
    this.controller = new PlayerController(owner);

    // Add the players states to it's StateMachine
    this.addState(PlayerStateType.IDLE, new Idle(this, this.owner));
    this.addState(PlayerStateType.MOVING, new Moving(this, this.owner));

    // Initialize the players state to Idle
    this.initialize(PlayerStateType.IDLE);
  }
}
