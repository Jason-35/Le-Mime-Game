import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import PlayerActor from "../../../Actors/PlayerActor";
import TreasureState from "./TreasureState";

export default class TreasureStolen extends TreasureState {
  public player: PlayerActor;
  onEnter(options: Record<string, any>): void {
    this.player = this.parent.player;
  }

  update(deltaT: number): void {
    if (this.owner.collisionShape.overlaps(this.player.collisionShape)) {
      this.player.treasureStolen(this.owner.TreasureId);
      this.owner.position = new Vec2(0, 0);
      this.owner.visible = false;
      this.emitter.fireEvent("PICKUP");
    }
  }
}
