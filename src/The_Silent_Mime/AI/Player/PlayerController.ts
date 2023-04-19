import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Input from "../../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";

export enum PlayerInput {
  MOVE_UP = "MOVE_UP",
  MOVE_DOWN = "MOVE_DOWN",
  MOVE_LEFT = "MOVE_LEFT",
  MOVE_RIGHT = "MOVE_RIGHT",

  USE_ABILITY = "USE_ABILITY",
  SET_ABILITY_1 = "SET_ABILITY_1",
  SET_ABILITY_2 = "SET_ABILITY_2",
  SET_ABILITY_3 = "SET_ABILITY_3",
  SET_ABILITY_4 = "SET_ABILITY_4",

  PAUSE = "PAUSE",
}

export default class PlayerController {
  /** The GameNode that owns the AI */
  protected owner: AnimatedSprite;

  constructor(owner: AnimatedSprite) {
    this.owner = owner;
  }

  /**
   * Gets the direction the player should move based on input from the keyboard.
   * @returns a Vec2 indicating the direction the player should move.
   */
  public get moveDir(): Vec2 {
    let dir: Vec2 = Vec2.ZERO;
    if (Input.isPressed(PlayerInput.MOVE_DOWN)) {
      dir.y = 1;
    } else if (Input.isPressed(PlayerInput.MOVE_UP)) {
      dir.y = -1;
    } else if (Input.isPressed(PlayerInput.MOVE_LEFT)) {
      dir.x = -1;
    } else if (Input.isPressed(PlayerInput.MOVE_RIGHT)) {
      dir.x = 1;
    }
    return dir;
  }

  public get abilityKey(): Boolean {
    return Input.isPressed(PlayerInput.USE_ABILITY);
  }

  public get currentAbility(): Number {
    if (Input.isPressed(PlayerInput.SET_ABILITY_1)) return 1;
    else if (Input.isPressed(PlayerInput.SET_ABILITY_2)) return 2;
    else if (Input.isPressed(PlayerInput.SET_ABILITY_3)) return 3;
    else if (Input.isPressed(PlayerInput.SET_ABILITY_4)) return 4;
    return -1;
  }
}
