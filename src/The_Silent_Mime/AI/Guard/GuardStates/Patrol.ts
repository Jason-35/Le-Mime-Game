import GuardState from "./GuardState";

export default class Patrol extends GuardState {
  public onEnter(options: Record<string, any>): void {}

  public update(deltaT: number): void {
    super.update(deltaT);
    this.parent.owner._velocity.x += 1;
  }

  public onExit(): Record<string, any> {
    return {};
  }
}
