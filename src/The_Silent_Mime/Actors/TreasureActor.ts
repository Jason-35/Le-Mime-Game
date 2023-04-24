import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";

export default class TreasureActor extends AnimatedSprite {
  protected _TreasureId: number;

  public set TreasureId(val: number) {
    this._TreasureId = val;
  }

  public get TreasureId() {
    return this._TreasureId;
  }
}
