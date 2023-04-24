import Spritesheet from "../../Wolfie2D/DataTypes/Spritesheet";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";

export default class PlayerActor extends AnimatedSprite {
  protected _speed: number;
  protected _treasureStolen: number[];
  protected _inDisguise: boolean;
  protected _speedBoost: number;
  protected _canDash: boolean;
  protected _maxDash: number;
  protected _currentDash: number;
  protected _canDisguise: boolean;
  protected _maxDisguiseTime: number;
  protected _currentDisguiseTime: number;
  protected _canStealth: boolean;
  protected _maxStealthTime: number;
  protected _currentStealthTime: number;
  protected _canInvisible: boolean;
  protected _maxInvisibleTime: number;
  protected _currentInvisibleTime: number;
  protected _inInvis: boolean;
  protected _invisUsage: number;
  protected _pause: boolean;
  protected _gameOver: boolean;
  protected _needStealing: number;
  protected _cheating: boolean;

  public constructor(sheet: Spritesheet) {
    super(sheet);
    this._speed = 2;
    this._treasureStolen = [];
    this._inDisguise = false;
    this._canDash = true;
    this._maxDash = 100;
    this._currentDash = 0;
    this._canDisguise = true;
    this._maxDisguiseTime = 100;
    this._currentDisguiseTime = 0;
    this._canStealth = true;
    this._maxStealthTime = 100;
    this._currentStealthTime = 0;
    this._inInvis = false;
    this._canInvisible = true;
    this._invisUsage = 3;
    this._pause = false;
    this._gameOver = false;
    this._needStealing = 1;
    this._cheating = false;
  }

  public set cheating(val: boolean) {
    this._cheating = val;
  }

  public get cheating() {
    return this._cheating;
  }

  public set invisUsage(num: number) {
    this._invisUsage = num;
  }

  public get invisUsage() {
    return this._invisUsage;
  }

  public set needStealing(num: number) {
    this._needStealing = num;
  }

  public get needStealing() {
    return this._needStealing;
  }

  public set speed(num: number) {
    this._speed = num;
  }

  public get speed() {
    return this._speed;
  }

  public treasureStolen(num: number) {
    this._treasureStolen.push(num);
  }

  public checkInventorySize() {
    return this._treasureStolen.length;
  }

  public checkIfTreasureStolen(val: number) {
    this._treasureStolen.includes(val);
  }

  public set inDisguise(val: boolean) {
    this._inDisguise = val;
  }

  public get inDisguise() {
    return this._inDisguise;
  }

  public set canDash(val: boolean) {
    this._canDash = val;
  }

  public get canDash() {
    return this._canDash;
  }

  public get maxDash() {
    return this._maxDash;
  }

  public set currentDash(val: number) {
    this._currentDash = val;
  }

  public get currentDash() {
    return this._currentDash;
  }

  public set maxDisguiseTime(val: number) {
    this._maxDisguiseTime = val;
  }

  public get maxDisguiseTime() {
    return this._maxDisguiseTime;
  }

  public set currentDisguiseTime(val: number) {
    this._currentDisguiseTime = val;
  }

  public get currentDisguiseTime() {
    return this._currentDisguiseTime;
  }

  public set canDisguise(val: boolean) {
    this._canDisguise = val;
  }

  public get canDisguise() {
    return this._canDisguise;
  }

  public set canInvisible(val: boolean) {
    this._canInvisible = val;
  }

  public get canInvisible() {
    return this._canInvisible;
  }

  public set maxInvisibleTimer(val: number) {
    this._maxInvisibleTime = val;
  }

  public get maxInvisibleTimer() {
    return this._maxInvisibleTime;
  }

  public set currentInvisibleTimer(val: number) {
    this._currentInvisibleTime = val;
  }

  public get currentInvisibleTimer() {
    return this._currentInvisibleTime;
  }

  public set inInvis(val: boolean) {
    this._inInvis = val;
  }

  public get inInvis() {
    return this._inInvis;
  }
}
