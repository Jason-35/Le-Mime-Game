import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";

export default class GuardController {
  protected owner: AnimatedSprite;
  constructor(owner: AnimatedSprite) {
    this.owner = owner;
  }

  public get Patrolling(): Vec2 {
    return;
  }
}
