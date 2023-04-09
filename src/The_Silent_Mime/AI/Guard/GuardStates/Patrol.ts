import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import GuardState from "./GuardState";

export default class Patrol extends GuardState {
  protected targets: Vec2[] = []; 
  protected curTarget: Vec2;
  protected curIndex = 0;

  public onEnter(options: Record<string, any>): void {
    this.targets.push(new Vec2(350, 675));
    this.targets.push(new Vec2(350, 275));
    this.targets.push(new Vec2(675, 275));
    this.targets.push(new Vec2(675, 675));

    this.curIndex = Math.floor(Math.random() * 3);

    this.curTarget = this.targets[this.curIndex];
  }

  public update(deltaT: number): void {
    if (this.parent.owner.position.x == this.curTarget.x && this.parent.owner.position.y == this.curTarget.y) {
      this.curIndex === 3 ? 0 : this.curIndex++;
    }

    this.curTarget = this.targets[this.curIndex];

    let x = this.parent.owner.position.x - this.curTarget.x;
    let y = this.parent.owner.position.y - this.curTarget.y;

    this.parent.owner.move(new Vec2(x > 0 ? -1 : x < 0 ? 1 : 0, y > 0 ? -1 : y < 0 ? 1 : 0));
  }

  public onExit(): Record<string, any> {
    return {};
  }
}
