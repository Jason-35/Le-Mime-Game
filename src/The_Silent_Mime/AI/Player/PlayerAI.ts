import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import AI from "../../../Wolfie2D/DataTypes/Interfaces/AI";
import PlayerActor from "../../Actors/PlayerActor";
import PlayerController from "./PlayerController";
import PlayerState, {
  Idle,
  Moving,
  PlayerStateType,
  Moving_Down,
  Moving_Right,
  Moving_Left,
  Moving_Up,
  IdleDown,
  IdleRight,
  IdleUp,
  IdleLeft,
} from "./PlayerStates/PlayerState";

export default class PlayerAI extends StateMachineAI implements AI {
  public owner: PlayerActor;
  /** A set of controls for the player */
  public controller: PlayerController;
  /** The inventory object associated with the player */
  public initializeAI(owner: PlayerActor, opts: Record<string, any>): void {
    this.owner = owner;
    this.controller = new PlayerController(owner);

    // Add the players states to it's StateMachine
    this.addState(PlayerStateType.IDLE, new PlayerState(this, this.owner));
    /*this.addState(PlayerStateType.MOVING, new Moving(this, this.owner));
    this.addState(
      PlayerStateType.MOVING_DOWN,
      new Moving_Down(this, this.owner)
    );
    this.addState(
      PlayerStateType.MOVING_LEFT,
      new Moving_Left(this, this.owner)
    );
    this.addState(
      PlayerStateType.MOVING_RIGHT,
      new Moving_Right(this, this.owner)
    );
    this.addState(PlayerStateType.MOVING_UP, new Moving_Up(this, this.owner));

    this.addState(PlayerStateType.IDLE_DOWN, new IdleDown(this, this.owner));
    this.addState(PlayerStateType.IDLE_LEFT, new IdleLeft(this, this.owner));
    this.addState(PlayerStateType.IDLE_RIGHT, new IdleRight(this, this.owner));
    this.addState(PlayerStateType.IDLE_UP, new IdleUp(this, this.owner));*/

    // Initialize the players state to Idle
    this.initialize(PlayerStateType.IDLE);
  }
}
