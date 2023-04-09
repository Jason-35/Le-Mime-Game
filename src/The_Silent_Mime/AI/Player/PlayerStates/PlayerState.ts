import State from "../../../../Wolfie2D/DataTypes/State/State";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";

import PlayerAI from "../PlayerAI";

export enum PlayerStateType {
  IDLE = "IDLE",
  MOVING = "MOVING",
  MOVING_LEFT = "MOVING_LEFT",
  MOVING_UP = "MOVING_UP",
  MOVING_DOWN = "MOVING_DOWN",
  MOVING_RIGHT = "MOVING_RIGHT",
  IDLE_LEFT = "IDLE_LEFT",
  IDLE_RIGHT = "IDLE_RIGHT",
  IDLE_UP = "IDLE_UP",
  IDLE_DOWN = "IDLE_DOWN",
}

export enum PlayerAnimationType {
  // IDLE = "IDLE_DOWN",
  IDLE_LEFT = "IDLE_LEFT",
  IDLE_RIGHT = "IDLE_RIGHT",
  IDLE_UP = "IDLE_UP",
  IDLE_DOWN = "IDLE_DOWN",
  MOVING_LEFT = "MOVING_LEFT",
  MOVING_UP = "MOVING_UP",
  MOVING_DOWN = "MOVING_DOWN",
  MOVING_RIGHT = "MOVING_RIGHT",
}

enum DIRECTIONS {
  LEFT = 0,
  UP = 1,
  DOWN = 2,
  RIGHT = 3
}

export default class PlayerState extends State {
  protected parent: PlayerAI;
  protected owner: PlayerActor;

  pressedAbilityKey: Boolean;
  currentAbility: Number;
  currentDirection: Number;

  public constructor(parent: PlayerAI, owner: PlayerActor) {
    super(parent);
    this.owner = owner;
    this.pressedAbilityKey = false;
    this.currentAbility = 1;
    this.currentDirection = DIRECTIONS.DOWN;
  }

  public override onEnter(options: Record<string, any>): void {}
  public override onExit(): Record<string, any> {
    return {};
  }

  public override update(deltaT: number): void {
    // Move the player
    let direction =this.parent.controller.moveDir;
    this.parent.owner.move(direction);
    
    if (direction.mag() != 0) {
      if (direction.x  == -1)
        this.currentDirection = DIRECTIONS.LEFT;
      else if (direction.x == 1) 
        this.currentDirection = DIRECTIONS.RIGHT;
      else if (direction.y == 1) {
        this.currentDirection = DIRECTIONS.DOWN;
      } else if (direction.y == -1) {
        this.currentDirection = DIRECTIONS.UP;
      }
      console.log("current direction is", this.currentDirection);
    }
    this.handleAbilityInput();
  }

  public override handleInput(event: GameEvent): void {
    switch (event.type) {
      default: {
        throw new Error(
          `Unhandled event of type ${event.type} caught in PlayerState!`
        );
      }
    }
  }

  private handleAbilityInput() {
    this.currentAbility = (this.parent.controller.currentAbility == -1) ? this.currentAbility :this.parent.controller.currentAbility;

    if (!this.parent.controller.abilityKey)
      this.pressedAbilityKey = false;
    
    if (this.parent.controller.abilityKey && !this.pressedAbilityKey){
      this.pressedAbilityKey = true;
      this.executeAbility();
    }
  }

  private executeAbility() {
    //this.owner.animation.play(PlayerAnimationType.MOVING_UP,false);
    console.log("current direction is",this.currentDirection);
    if (this.currentAbility == 1) {
      //this.owner.animation.playIfNotAlready(PlayerAnimationType.MOVING_DOWN,false);
    } else if (this.currentAbility == 2){
      //this.owner.animation.playIfNotAlready(PlayerAnimationType.MOVING_LEFT,false);
    }
  }
}

import Idle from "./Idle";
import Moving from "./Moving";
import Moving_Left from "./PlayerMove/Moving_Left";
import Moving_Right from "./PlayerMove/Moving_Right";
import Moving_Up from "./PlayerMove/Moving_Up";
import Moving_Down from "./PlayerMove/Moving_Down";
import IdleDown from "./PlayerIdle/IdleDown";
import IdleLeft from "./PlayerIdle/IdleLeft";
import IdleRight from "./PlayerIdle/IdleRight";
import IdleUp from "./PlayerIdle/IdleUp";

import PlayerActor from "../../../Actors/PlayerActor";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import DirectPathStrat from "../../../../Wolfie2D/Pathfinding/Strategies/DirectStrategy";

export {
  Idle,
  Moving,
  Moving_Down,
  Moving_Right,
  Moving_Left,
  Moving_Up,
  IdleDown,
  IdleLeft,
  IdleRight,
  IdleUp,
};
