import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Emitter from "../../../Wolfie2D/Events/Emitter";
import Receiver from "../../../Wolfie2D/Events/Receiver";
import Input from "../../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Timer from "../../../Wolfie2D/Timing/Timer";
import PlayerActor from "../../Actors/PlayerActor";
import { PlayerAnimationType } from "./PlayerStates/PlayerState";

export enum PlayerInput {
  MOVE_UP = "MOVE_UP",
  MOVE_DOWN = "MOVE_DOWN",
  MOVE_LEFT = "MOVE_LEFT",
  MOVE_RIGHT = "MOVE_RIGHT",
  DASH = "DASH",
  DISGUISE = "DISGUISE",
  INVISIBLE = "INVISIBLE",
  PAUSE = "PAUSE",
}

export default class PlayerController {
  protected owner: PlayerActor;
  protected _currentDirection: number;
  protected emitter: Emitter;

  constructor(owner: PlayerActor) {
    this.owner = owner;
    this._currentDirection = 1;
    this.emitter = new Emitter();
  }

  public get moveDir(): Vec2 {
    let dir: Vec2 = Vec2.ZERO;
    if (Input.isPressed(PlayerInput.MOVE_DOWN)) {
      dir.y = this.owner.speed;
      this._currentDirection = 1;
    } else if (Input.isPressed(PlayerInput.MOVE_UP)) {
      dir.y = -this.owner.speed;
      this._currentDirection = 2;
    } else if (Input.isPressed(PlayerInput.MOVE_LEFT)) {
      dir.x = -this.owner.speed;
      this._currentDirection = 3;
    } else if (Input.isPressed(PlayerInput.MOVE_RIGHT)) {
      dir.x = this.owner.speed;
      this._currentDirection = 4;
    }
    return dir;
  }

  public dashing() {
    if (Input.isPressed(PlayerInput.DASH) && this.owner.canDash) {
      this.owner.speed = 5;
      if (!this.owner.cheating) {
        if (this.owner.currentDash > this.owner.maxDash) {
          this.owner.currentDash = this.owner.maxDash;
        }
        if (this.owner.currentDash !== this.owner.maxDash) {
          this.owner.currentDash = this.owner.currentDash + 1.25;
          this.emitter.fireEvent("DASHING", {
            currDash: this.owner.currentDash,
            maxDash: this.owner.maxDash,
          });
        } else {
          this.owner.canDash = false;
          this.emitter.fireEvent("DASH_COOLDOWN", { cd: true });
        }
      }
    } else {
      this.owner.speed = 1;
      if (!this.owner.cheating) {
        if (this.owner.currentDash !== 0) {
          this.owner.currentDash = this.owner.currentDash - 0.25;
          this.emitter.fireEvent("DASHING", {
            currDash: this.owner.currentDash,
            maxDash: this.owner.maxDash,
          });
        } else {
          this.owner.canDash = true;
          this.emitter.fireEvent("DASH_COOLDOWN", { cd: false });
        }
      }
    }
  }

  public disguising() {
    if (Input.isJustPressed(PlayerInput.DISGUISE) && this.owner.canDisguise) {
      this.owner.inDisguise = !this.owner.inDisguise;
    }
  }

  public invisible() {
    if (
      Input.isJustPressed(PlayerInput.INVISIBLE) &&
      this.owner.canInvisible &&
      this.owner.invisUsage != 0
    ) {
      this.owner.canInvisible = false;
      this.emitter.fireEvent("INVIS");
    }
  }

  public usingDisguise() {
    if (this.owner.inDisguise) {
      if (this.owner.currentDisguiseTime !== this.owner.maxDisguiseTime) {
        this.owner.currentDisguiseTime = this.owner.currentDisguiseTime + 1;
        this.emitter.fireEvent("DISGUISE", {
          currDisguise: this.owner.currentDisguiseTime,
          maxDisguise: this.owner.maxDisguiseTime,
        });
      } else {
        this.owner.canDisguise = false;
        this.owner.inDisguise = false;
        this.emitter.fireEvent("DISGUISE_COOLDOWN", { cd: true });
      }
    } else {
      if (this.owner.currentDisguiseTime !== 0) {
        this.owner.currentDisguiseTime = this.owner.currentDisguiseTime - 0.5;
        this.emitter.fireEvent("DISGUISE", {
          currDisguise: this.owner.currentDisguiseTime,
          maxDisguise: this.owner.maxDisguiseTime,
        });
      } else {
        this.owner.canDisguise = true;
        this.owner.inDisguise = false;
        this.emitter.fireEvent("DISGUISE_COOLDOWN", { cd: false });
      }
    }
  }

  public get check() {
    return this.owner.inDisguise;
  }
  public get currentDirection() {
    return this._currentDirection;
  }
}
