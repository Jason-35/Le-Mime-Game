import SpeedGuardState, { SpeedGuardStateType } from "./SpeedGuardState";

export default class SpeedReturn extends SpeedGuardState {
  public path;
  onEnter(options: Record<string, any>): void {
    this.path = this.owner.getPath(
      this.owner.position,
      this.owner.startPosition
    );
  }

  update(deltaT: number): void {
    if (this.path !== null && !this.path.isDone()) {
      this.owner.detectiveMoveOnPath(85 * deltaT, this.path, this.owner);
    } else {
      this.owner.position.x = Math.round(this.owner.position.x);
      this.owner.position.y = Math.round(this.owner.position.y);
      this.finished(SpeedGuardStateType.PATROL);
    }
  }
}
