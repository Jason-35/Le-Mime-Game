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
import PlayerAI from "../AI/Player/PlayerAI";
import PlayerActor from "../Actors/PlayerActor";

export default class level1 extends Scene {
  /** All the battlers in the HW4Scene (including the player) */

  /** Healthbars for the battlers */

  // The wall layer of the tilemap
  private walls: OrthogonalTilemap;
  private player: PlayerActor;
  // The position graph for the navmesh
  private graph: PositionGraph;

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
    this.load.spritesheet("player1", "hw4_assets/spritesheets/player1.json");
    this.load.tilemap("level", "hw4_assets/tilemaps/cretin.json");
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
  }
  /**
   * @see Scene.updateScene
   */
  public override updateScene(deltaT: number): void {
    while (this.receiver.hasNextEvent()) {
      this.handleEvent(this.receiver.getNextEvent());
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
  public initializePlayer() {
    let player = this.add.animatedSprite(PlayerActor, "player1", "primary");
    player.position.set(40, 40);
    player.addPhysics(new AABB(Vec2.ZERO, new Vec2(8, 8)));

    player.addAI(PlayerAI);
    player.animation.play("IDLE");
    this.player = player;
    this.viewport.follow(player);
  }
}
