import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import AI from "../../../Wolfie2D/DataTypes/Interfaces/AI";
import DetectiveActor from "../../Actors/DetectiveActor";
import PlayerActor from "../../Actors/PlayerActor";
import { DetectiveStateType } from "./DetectiveStates/DetectiveState";
import DetectiveTracking from "./DetectiveStates/DetectiveTrack";

export default class DetectiveAI extends StateMachineAI implements AI {
  public owner: DetectiveActor;
  public player: PlayerActor;
  public initializeAI(owner: DetectiveActor, options: DetectiveOptions): void {
    this.owner = owner;
    this.player = options.target;

    this.addState(
      DetectiveStateType.TRACKING,
      new DetectiveTracking(this, this.owner)
    );
    this.initialize(DetectiveStateType.TRACKING);
  }
}

export interface DetectiveOptions {
  target: PlayerActor;
}
