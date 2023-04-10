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

  WHIP_LEFT = "WHIPE_LEFT",
  WHIP_RIGHT = "WHIPE_RIGHT",
  WHIP_DOWN = "WHIPE_DOWN",
  WHIP_UP = "WHIPE_UP",

  BARRIER_DOWN = "BARRIER_DOWN",
  BARRIER_UP = "BARRIER_UP",
  BARRIER_RIGHT = "BARRIER_RIGHT",
  BARRIER_LEFT = "BARRIER_LEFT",

  CAMO = "CAMO",
}

enum DIRECTIONS {
  LEFT = 0,
  UP = 1,
  RIGHT = 2,
  DOWN = 3,
}

export default class PlayerState extends State {
  protected parent: PlayerAI;
  protected owner: PlayerActor;

  pressedAbilityKey: Boolean;
  activeAbility: Number;
  currentDirection;

  public constructor(parent: PlayerAI, owner: PlayerActor) {
    super(parent);
    this.owner = owner;
    this.pressedAbilityKey = false;
    this.activeAbility = 1;
    console.log("constuctor set");
    this.currentDirection = DIRECTIONS.DOWN;
  }

  public override onEnter(options: Record<string, any>): void {}
  public override onExit(): Record<string, any> {
    return {};
  }

  public override update(deltaT: number): void {
    // Move the player
    let direction = this.parent.controller.moveDir;
    this.parent.owner.move(direction);

    this.currentDirection = this.currentDirection;
    if (!(direction.x == 0 && direction.y == 0)) {
      if (direction.x == -1) {
        this.currentDirection = DIRECTIONS.LEFT;
        this.parent.owner.animation.playIfNotAlready(
          PlayerAnimationType.MOVING_LEFT
        );

        //console.log("set left");
      } else if (direction.x == 1) {
        this.currentDirection = DIRECTIONS.RIGHT;
        //console.log("set right");
        this.parent.owner.animation.playIfNotAlready(
          PlayerAnimationType.MOVING_RIGHT
        );
      } else if (direction.y == 1) {
        this.currentDirection = DIRECTIONS.DOWN;
        this.parent.owner.animation.playIfNotAlready(
          PlayerAnimationType.MOVING_DOWN
        );
        //console.log("set down")
      } else if (direction.y == -1) {
        this.currentDirection = DIRECTIONS.UP;
        this.parent.owner.animation.playIfNotAlready(
          PlayerAnimationType.MOVING_UP
        );
        //console.log("set up");
      }
    } else {
      if (
        !(
          this.parent.owner.animation.currentAnimation.includes("WHIP") ||
          this.parent.owner.animation.currentAnimation.includes("BARRIER") ||
          this.parent.owner.animation.currentAnimation.includes("CAMO")
        )
      ) {
        this.parent.owner.animation.play(
          [
            PlayerAnimationType.IDLE_LEFT,
            PlayerAnimationType.IDLE_UP,
            PlayerAnimationType.IDLE_RIGHT,
            PlayerAnimationType.IDLE_DOWN,
          ][this.currentDirection]
        );
      }
    }
    //console.log("curr dir: ",this.currentDirection);
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
    if (this.parent.controller.currentAbility != -1) {
      this.activeAbility = this.parent.controller.currentAbility;
      console.log("updated current ability");
    }
    console.log("current ability", this.activeAbility);
    // console.log(this.currentAbility,this.parent.controller.currentAbility);
    if (!this.parent.controller.abilityKey) this.pressedAbilityKey = false;

    if (this.parent.controller.abilityKey && !this.pressedAbilityKey) {
      this.pressedAbilityKey = true;
      this.executeAbility();
    }
  }

  private executeAbility() {
    console.log(this.owner.animation.currentAnimation);
    var index = 0;
    var currentAnimation = this.owner.animation.currentAnimation;
    if (currentAnimation.includes("LEFT")) {
      index = 0;
      //console.log("set indcex to 0, includes left")
    } else if (currentAnimation.includes("UP")) {
      index = 1;
      //console.log("set indcex to 1, includes up",currentAnimation.includes("UP"),currentAnimation);
    } else if (currentAnimation.includes("RIGHT")) {
      index = 2;
      //console.log("set indcex to 2, includes right")
    } else if (currentAnimation.includes("DOWN")) {
      index = 3;
      //console.log("set indcex to 3, includes down")
    }

    console.log(this.activeAbility);
    if (this.activeAbility == 1) {
      this.owner.animation.play(
        [
          PlayerAnimationType.BARRIER_LEFT,
          PlayerAnimationType.BARRIER_UP,
          PlayerAnimationType.BARRIER_RIGHT,
          PlayerAnimationType.BARRIER_DOWN,
        ][this.currentDirection],
        false
      );
      this.owner.animation.queue(
        [
          PlayerAnimationType.IDLE_LEFT,
          PlayerAnimationType.IDLE_UP,
          PlayerAnimationType.IDLE_RIGHT,
          PlayerAnimationType.IDLE_DOWN,
        ][this.currentDirection],
        false
      );
    } else if (this.activeAbility == 2) {
      this.owner.animation.play(
        [
          PlayerAnimationType.WHIP_LEFT,
          PlayerAnimationType.WHIP_UP,
          PlayerAnimationType.WHIP_RIGHT,
          PlayerAnimationType.WHIP_DOWN,
        ][this.currentDirection],
        false
      );
      this.owner.animation.queue(
        [
          PlayerAnimationType.IDLE_LEFT,
          PlayerAnimationType.IDLE_UP,
          PlayerAnimationType.IDLE_RIGHT,
          PlayerAnimationType.IDLE_DOWN,
        ][this.currentDirection],
        false
      );
    } else if (this.activeAbility == 3) {
      this.owner.animation.play(PlayerAnimationType.CAMO, false);
      this.owner.animation.queue(
        [
          PlayerAnimationType.IDLE_LEFT,
          PlayerAnimationType.IDLE_UP,
          PlayerAnimationType.IDLE_RIGHT,
          PlayerAnimationType.IDLE_DOWN,
        ][this.currentDirection],
        false
      );
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
