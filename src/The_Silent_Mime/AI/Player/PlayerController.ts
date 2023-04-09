import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Input from "../../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";

export enum PlayerInput {
  MOVE_UP = "MOVE_UP",
  MOVE_DOWN = "MOVE_DOWN",
  MOVE_LEFT = "MOVE_LEFT",
  MOVE_RIGHT = "MOVE_RIGHT",
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
    dir.y = (Input.isPressed(PlayerInput.MOVE_UP) ? -1 : 0) + (Input.isPressed(PlayerInput.MOVE_DOWN) ? 1 : 0);
		dir.x = (Input.isPressed(PlayerInput.MOVE_LEFT) ? -1 : 0) + (Input.isPressed(PlayerInput.MOVE_RIGHT) ? 1 : 0);
    return dir.normalize();
  }
}
