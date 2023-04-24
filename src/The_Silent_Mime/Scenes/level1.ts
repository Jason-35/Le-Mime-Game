import PositionGraph from "../../Wolfie2D/DataTypes/Graphs/PositionGraph";
import Actor from "../../Wolfie2D/DataTypes/Interfaces/Actor";
import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
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
import AstarStrategy from "../PathFinding/AstarStrategy";

export default class level1 extends Scene {
  /** All the battlers in the HW4Scene (including the player) */

  /** Healthbars for the battlers */

  // The wall layer of the tilemap
  private walls: OrthogonalTilemap;
  private player: PlayerActor;
  // The position graph for the navmesh
  private graph: PositionGraph;
  private guard: GuardActor;

  private treasure: AnimatedSprite;

  private AbilityLayer: Layer;
  private al: AnimatedSprite;

  public static readonly LEVEL_MUSIC_KEY = "LEVEL_MUSIC";
  public static readonly LEVEL_MUSIC_PATH = "project_assets/music/Game_Music.mp3";

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
    this.load.spritesheet(
      "Ability_HUD",
      "project_assets/spritesheets/abilityHUD.json"
    );
    this.load.audio(level1.LEVEL_MUSIC_KEY, level1.LEVEL_MUSIC_PATH);
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

    this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: level1.LEVEL_MUSIC_KEY, loop: true, holdReference: true});

    this.viewport.setBounds(0, 0, tilemapSize.x, tilemapSize.y);
    this.viewport.setZoomLevel(3);

    this.initLayer();
    this.initializeNavmesh();
    this.initializePlayer();
    this.initializeGuards();
    this.initializeTreasure();
    this.initializeAbilityHUD();

    console.log("Player: " + this.player.position);
    console.log("Treasure: " + this.treasure.position);
    console.log("Treasure Scale: " + this.treasure.scale);
  }

  public override unloadScene(): void {
    this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: level1.LEVEL_MUSIC_KEY, loop: true, holdReference: true})
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

    if ((this.player.position.x > this.treasure.position.x - this.treasure.boundary.getHalfSize().x &&
      this.player.position.x < this.treasure.position.x + this.treasure.boundary.getHalfSize().x) && (
        this.player.position.y > this.treasure.position.y - this.treasure.boundary.getHalfSize().y &&
        this.player.position.y < this.treasure.position.y + this.treasure.boundary.getHalfSize().y)
      ) {
        this.remove(this.treasure);
    }

    // console.log(this.guard.position);
    // console.log(this.player.position);
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
    guard1.position.set(350, 676);
    guard1.scale.set(0.75, 0.75);
    guard1.addPhysics(new AABB(Vec2.ZERO, new Vec2(7, 7)), null, false);
    let guard1PatrolPath = [];
    guard1PatrolPath.push(new Vec2(700, 676));
    guard1PatrolPath.push(new Vec2(700, 276));
    guard1PatrolPath.push(new Vec2(350, 276));
    guard1PatrolPath.push(new Vec2(350, 676));
    guard1.navkey = "navmesh";
    guard1.addAI(GuardAI, {
      target: this.player,
      patrolPath: guard1PatrolPath,
    });

    guard1.animation.play("IDLE");
    this.guard = guard1;

    // let guard2 = this.add.animatedSprite(GuardActor, "guard", "primary");
    // guard2.position.set(676, 276);
    // guard2.scale.set(0.75, 0.75);
    // guard2.addPhysics(new AABB(Vec2.ZERO, new Vec2(7, 7)), null, false);
    // let guard2PatrolPath = [];
    // guard2PatrolPath.push(new Vec2(350, 276));
    // guard2PatrolPath.push(new Vec2(350, 676));
    // guard2PatrolPath.push(new Vec2(676, 676));
    // guard2PatrolPath.push(new Vec2(676, 276));
    // guard2.addAI(GuardAI, {
    //   target: 32,
    //   range: 55,
    //   patrolPath: guard2PatrolPath,
    // });
    // guard2.animation.play("IDLE");
  }

  public initializeTreasure() {
    this.treasure = this.add.animatedSprite(GuardActor, "treasure", "primary");
    this.treasure.position.set(525, 475);
    this.treasure.scale.set(0.45, 0.45);
    this.treasure.animation.play("SPIN");
  }

  public checkGuardRange(GuardRange, PlayerPosition) {
    // const protectedGuardRangeY = GuardRange.x
    const protectedGuardRangeX = GuardRange.x;
    if (
      protectedGuardRangeX - 35 < PlayerPosition.x &&
      protectedGuardRangeX + 35 > PlayerPosition.x
    ) {
      console.log("detected player");
    }
  }

  protected initializeNavmesh(): void {
    // Create the graph
    this.graph = new PositionGraph();

    let dim: Vec2 = this.walls.getDimensions();
    for (let i = 0; i < dim.y; i++) {
      for (let j = 0; j < dim.x; j++) {
        let tile: AABB = this.walls.getTileCollider(j, i);
        this.graph.addPositionedNode(tile.center);
      }
    }

    let rc: Vec2;
    for (let i = 0; i < this.graph.numVertices; i++) {
      rc = this.walls.getTileColRow(i);
      if (
        !this.walls.isTileCollidable(rc.x, rc.y) &&
        !this.walls.isTileCollidable(
          MathUtils.clamp(rc.x - 1, 0, dim.x - 1),
          rc.y
        ) &&
        !this.walls.isTileCollidable(
          MathUtils.clamp(rc.x + 1, 0, dim.x - 1),
          rc.y
        ) &&
        !this.walls.isTileCollidable(
          rc.x,
          MathUtils.clamp(rc.y - 1, 0, dim.y - 1)
        ) &&
        !this.walls.isTileCollidable(
          rc.x,
          MathUtils.clamp(rc.y + 1, 0, dim.y - 1)
        ) &&
        !this.walls.isTileCollidable(
          MathUtils.clamp(rc.x + 1, 0, dim.x - 1),
          MathUtils.clamp(rc.y + 1, 0, dim.y - 1)
        ) &&
        !this.walls.isTileCollidable(
          MathUtils.clamp(rc.x - 1, 0, dim.x - 1),
          MathUtils.clamp(rc.y + 1, 0, dim.y - 1)
        ) &&
        !this.walls.isTileCollidable(
          MathUtils.clamp(rc.x + 1, 0, dim.x - 1),
          MathUtils.clamp(rc.y - 1, 0, dim.y - 1)
        ) &&
        !this.walls.isTileCollidable(
          MathUtils.clamp(rc.x - 1, 0, dim.x - 1),
          MathUtils.clamp(rc.y - 1, 0, dim.y - 1)
        )
      ) {
        // Create edge to the left
        rc = this.walls.getTileColRow(i + 1);
        if ((i + 1) % dim.x !== 0 && !this.walls.isTileCollidable(rc.x, rc.y)) {
          this.graph.addEdge(i, i + 1);
          // this.add.graphic(GraphicType.LINE, "graph", {start: this.graph.getNodePosition(i), end: this.graph.getNodePosition(i + 1)})
        }
        // Create edge below
        rc = this.walls.getTileColRow(i + dim.x);
        if (
          i + dim.x < this.graph.numVertices &&
          !this.walls.isTileCollidable(rc.x, rc.y)
        ) {
          this.graph.addEdge(i, i + dim.x);
          // this.add.graphic(GraphicType.LINE, "graph", {start: this.graph.getNodePosition(i), end: this.graph.getNodePosition(i + dim.x)})
        }
      }
    }

    // Set this graph as a navigable entity
    let navmesh = new Navmesh(this.graph);
    // Add different strategies to use for this navmesh
    navmesh.registerStrategy("astar", new AstarStrategy(navmesh));
    // Select A* as our navigation strategy
    navmesh.setStrategy("astar");

    // Add this navmesh to the navigation manager
    this.navManager.addNavigableEntity("navmesh", navmesh);
  }
}
