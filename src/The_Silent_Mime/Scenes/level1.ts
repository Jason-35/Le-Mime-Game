import PositionGraph from "../../Wolfie2D/DataTypes/Graphs/PositionGraph";
import Actor from "../../Wolfie2D/DataTypes/Interfaces/Actor";
import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Line from "../../Wolfie2D/Nodes/Graphics/Line";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import Navmesh from "../../Wolfie2D/Pathfinding/Navmesh";
import DirectStrategy from "../../Wolfie2D/Pathfinding/Strategies/DirectStrategy";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import Scene from "../../Wolfie2D/Scene/Scene";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";
import MathUtils from "../../Wolfie2D/Utils/MathUtils";
import GuardAI from "../AI/Guard/GuardAI";
import PlayerAI from "../AI/Player/PlayerAI";
import GuardActor from "../Actors/GuardActor";
import PlayerActor from "../Actors/PlayerActor";
import Graphic from "../../Wolfie2D/Nodes/Graphic";
import Layer from "../../Wolfie2D/Scene/Layer";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import AbilityHUD from "../Actors/AbilityHud";
import Input from "../../Wolfie2D/Input/Input";

export default class level1 extends Scene {
  /** All the battlers in the HW4Scene (including the player) */

  /** Healthbars for the battlers */

  // The wall layer of the tilemap
  private walls: OrthogonalTilemap;
  private player: PlayerActor;
  // The position graph for the navmesh
  private graph: PositionGraph;
  private guard: GuardActor;

  private mimeWall: Graphic;
  private AbilityLayer: Layer;
  private al: AnimatedSprite;

  public constructor(
    viewport: Viewport,
    sceneManager: SceneManager,
    renderingManager: RenderingManager,
    options: Record<string, any>
  ) {
    super(viewport, sceneManager, renderingManager, options);
  }

  /**
   * @see Scene.update()
   */
  public override loadScene() {
    this.load.spritesheet("player1", "project_assets/spritesheets/mime.json");
    this.load.spritesheet("guard", "project_assets/spritesheets/guards.json");
    this.load.tilemap("level", "project_assets/tilesheets/test128.json");
    this.load.spritesheet(
      "treasure",
      "project_assets/spritesheets/treasure.json"
    );
    this.load.tilemap("level", "project_assets/tilesheets/test128.json");
    this.load.spritesheet(
      "Ability_HUD",
      "project_assets/spritesheets/abilityHUD.json"
    );
  }
  /**
   * @see Scene.startScene
   */
  public override startScene() {
    // Add in the tilemap
    let tilemapLayers = this.add.tilemap("level");
    this.walls = <OrthogonalTilemap>tilemapLayers[1].getItems()[0];

    // Set the viewport bounds to the tilemap
    let tilemapSize: Vec2 = this.walls.size;

    this.viewport.setBounds(0, 0, tilemapSize.x, tilemapSize.y);
    this.viewport.setZoomLevel(3);

    this.initLayer();
    this.initializePlayer();
    this.initializeGuards();
    this.initializeTreasure();
    this.initializeMimeWalls();
    this.initializeAbilityHUD();
  }
  /**
   * @see Scene.updateScene
   */
  public override updateScene(deltaT: number): void {
    while (this.receiver.hasNextEvent()) {
      this.handleEvent(this.receiver.getNextEvent());
    }
    this.al.position.set(
      this.viewport.getCenter().x - 200,
      this.viewport.getCenter().y - 100
    );

    if (Input.isKeyPressed("1")) {
      this.al.animation.play("ABILITY1");
    } else if (Input.isKeyPressed("2")) {
      this.al.animation.play("ABILITY2");
    } else if (Input.isKeyPressed("3")) {
      this.al.animation.play("ABILITY3");
    }
  }

  /**
   * Handle events from the rest of the game
   * @param event a game event
   */
  public handleEvent(event: GameEvent): void {}

  public initLayer() {
    this.addLayer("primary", 10);
  }

  public initializeAbilityHUD() {
    this.AbilityLayer = this.addLayer("abilitylayer", 11);
    this.AbilityLayer.setHidden(false);
    this.al = this.add.animatedSprite(
      AbilityHUD,
      "Ability_HUD",
      "abilitylayer"
    );
    this.al.scale.set(2, 2);
    this.al.position.set(this.player.position.x, this.player.position.y);
  }

  public initializePlayer() {
    let player = this.add.animatedSprite(PlayerActor, "player1", "primary");
    player.position.set(170, 120);
    player.scale.set(0.75, 0.75);
    player.addPhysics(new AABB(Vec2.ZERO, new Vec2(8, 8)));
    player.addAI(PlayerAI);
    player.animation.play("IDLE");
    this.player = player;
    this.viewport.follow(player);
  }
  public initializeGuards() {
    let guard1 = this.add.animatedSprite(GuardActor, "guard", "primary");
    guard1.position.set(350, 675);
    guard1.scale.set(0.75, 0.75);
    guard1.addPhysics(new AABB(Vec2.ZERO, new Vec2(7, 7)), null, false);
    guard1.addAI(GuardAI);
    guard1.animation.play("IDLE");
    this.guard = guard1;

    let guard2 = this.add.animatedSprite(GuardActor, "guard", "primary");
    guard2.position.set(675, 275);
    guard2.scale.set(0.75, 0.75);
    guard2.addPhysics(new AABB(Vec2.ZERO, new Vec2(7, 7)), null, false);
    guard2.addAI(GuardAI);
    guard2.animation.play("IDLE");
  }

  public initializeTreasure() {
    let treasure = this.add.animatedSprite(GuardActor, "treasure", "primary");
    treasure.position.set(525, 475);
    treasure.scale.set(0.45, 0.45);
    treasure.animation.play("SPIN");
  }

  public initializeMimeWalls() {
    return;
  }
}
