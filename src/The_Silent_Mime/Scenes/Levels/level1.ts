import PositionGraph from "../../../Wolfie2D/DataTypes/Graphs/PositionGraph";
import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";
import Input from "../../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Sprite from "../../../Wolfie2D/Nodes/Sprites/Sprite";
import OrthogonalTilemap from "../../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import Label from "../../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Navmesh from "../../../Wolfie2D/Pathfinding/Navmesh";
import RenderingManager from "../../../Wolfie2D/Rendering/RenderingManager";
import Scene from "../../../Wolfie2D/Scene/Scene";
import SceneManager from "../../../Wolfie2D/Scene/SceneManager";
import Viewport from "../../../Wolfie2D/SceneGraph/Viewport";
import Timer from "../../../Wolfie2D/Timing/Timer";
import Color from "../../../Wolfie2D/Utils/Color";
import MathUtils from "../../../Wolfie2D/Utils/MathUtils";
import DetectiveAI from "../../AI/Detective/DetectiveAI";
import PlayerAI from "../../AI/Player/PlayerAI";
import SpeedGuardAI from "../../AI/SpeedGuard/SpeedGuardAI";
import StationaryGuardAI from "../../AI/StationaryGuard/StationaryGuardAI";
import TreasureAI from "../../AI/Treasure/TreasureAI";
import DetectiveActor from "../../Actors/DetectiveActor";
import PlayerActor from "../../Actors/PlayerActor";
import SpeedGuardActor from "../../Actors/SpeedGuardActor";
import StationaryGuardActor from "../../Actors/StationaryGuardActor";
import TreasureActor from "../../Actors/TreasureActor";
import AstarStrategy from "../../PathFinding/AstarStrategy";
import MainMenu from "../MainMenu";

export default class level1 extends Scene {
  private invisTimer: Timer;
  private walls: OrthogonalTilemap;
  private player: PlayerActor;

  private dashLabel: Label;
  private dashBar: Label;
  private dashBarBg: Label;

  private disguiseLabel: Label;
  private disguiseBar: Label;
  private disguiseBarBg: Label;

  private invisUI1: Sprite;
  private invisUI2: Sprite;
  private invisUI3: Sprite;
  private invisLabel: Label;

  private pauseSprite: Sprite;
  private pauseButton;
  private pauseLayer;
  private mainmenubtn;
  private resumebtn;

  private gameoverSprite: Sprite;
  private goMenubtn;
  private gameoverLayer;

  private graph: PositionGraph;

  public constructor(
    viewport: Viewport,
    sceneManager: SceneManager,
    renderingManager: RenderingManager,
    options: Record<string, any>
  ) {
    super(viewport, sceneManager, renderingManager, options);
  }

  public loadScene() {
    this.load.tilemap("tilemap", "assets/tilesheets/test128.json");
    this.load.spritesheet("player", "assets/spritesheet/mime.json");
    this.load.spritesheet("guard", "assets/spritesheet/guards.json");
    this.load.spritesheet("detective", "assets/spritesheet/detective.json");
    this.load.spritesheet("treasure", "assets/spritesheet/treasure.json");
    this.load.image("smoke", "assets/spritesheet/smoke.png");
    this.load.image("pause", "assets/spritesheet/pause.png");
    this.load.image("gameover", "assets/spritesheet/GameOver.png");

    this.load.audio("pickup", "assets/sfx/pickup.wav");
    this.load.audio("lv1", "assets/music/lv1.mp3");
    this.load.audio("gameover", "assets/music/gameover.mp3");
  }

  public startScene() {
    // Add in the tilemap
    this.invisTimer = new Timer(2500, this.handleInvis, false);
    let tilemapLayers = this.add.tilemap("tilemap");
    this.walls = <OrthogonalTilemap>tilemapLayers[1].getItems()[0];

    // Set the viewport bounds to the tilemap
    let tilemapSize: Vec2 = this.walls.size;

    this.viewport.setBounds(0, 0, tilemapSize.x, tilemapSize.y);
    this.viewport.setZoomLevel(3);

    this.initalizePause();
    this.initializeLayer();
    this.initalizePlayer();
    this.initalizeUI();
    this.initializeNavmesh();
    this.initalizeTreasure();
    this.initalizeGuards();
    this.initalizeDetective();
    this.initalizeStationaryGuards();
    this.initalizeGameOver();

    this.emitter.fireEvent(GameEventType.PLAY_SOUND, {
      key: "lv1",
      loop: true,
      holdReference: true,
    });

    this.receiver.subscribe("DASHING");
    this.receiver.subscribe("RESTORING DASH");
    this.receiver.subscribe("DASH_COOLDOWN");
    this.receiver.subscribe("DISGUISE_COOLDOWN");
    this.receiver.subscribe("DISGUISE");
    this.receiver.subscribe("INVIS");
    this.receiver.subscribe("MAINMENU");
    this.receiver.subscribe("RESUME");
    this.receiver.subscribe("GAMEOVER");
    this.receiver.subscribe("COLLISIONSFX");
    this.receiver.subscribe("FINISH");
    this.receiver.subscribe("PICKUP");
  }

  public updateScene(deltaT: number): void {
    while (this.receiver.hasNextEvent()) {
      this.handleEvent(this.receiver.getNextEvent());
    }

    if (Input.isKeyJustPressed("escape")) {
      this.pauseLayer.visible = !this.pauseLayer.visible;
      this.pauseButton.visible = !this.pauseButton.visible;
      this.pauseSprite.visible = !this.pauseSprite.visible;
      this.mainmenubtn.visible = !this.mainmenubtn.visible;
      this.resumebtn.visible = !this.resumebtn.visible;
      Input.disableKeys();
    }
  }

  protected handleEvent(event: GameEvent) {
    switch (event.type) {
      case "DASHING": {
        let currDash = event.data.get("currDash");
        let maxDash = event.data.get("maxDash");
        this.handleDashChange(currDash, maxDash);
        break;
      }
      case "MAINMENU": {
        this.viewport.setZoomLevel(1);
        this.sceneManager.changeToScene(MainMenu);
        Input.enableKeys();
        this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: "lv1" });
        break;
      }
      case "RESUME": {
        this.pauseLayer.visible = !this.pauseLayer.visible;
        this.pauseButton.visible = !this.pauseButton.visible;
        this.pauseSprite.visible = !this.pauseSprite.visible;
        this.mainmenubtn.visible = !this.mainmenubtn.visible;
        this.resumebtn.visible = !this.resumebtn.visible;
        Input.enableKeys();
        break;
      }
      case "RESTORING DASH": {
        let currDash = event.data.get("currDash");
        let maxDash = event.data.get("maxDash");
        this.handleDashChange(currDash, maxDash);
        break;
      }
      case "DASH_COOLDOWN": {
        let cooldown = event.data.get("cd");
        this.handleDashCoolDown(cooldown);
        break;
      }
      case "DISGUISE_COOLDOWN": {
        let cooldown = event.data.get("cd");
        this.handleDisguiseCoolDown(cooldown);
        break;
      }
      case "DISGUISE": {
        let currDisguise = event.data.get("currDisguise");
        let maxDisguise = event.data.get("maxDisguise");
        this.handleDisguiseChange(currDisguise, maxDisguise);
        break;
      }
      case "INVIS": {
        this.player.visible = false;
        this.player.inInvis = true;
        if (!this.player.cheating) {
          switch (this.player.invisUsage) {
            case 3: {
              this.invisUI3.visible = false;
              break;
            }
            case 2: {
              this.invisUI2.visible = false;
              break;
            }
            case 1: {
              this.invisUI1.visible = false;
              break;
            }
          }
          this.player.invisUsage = this.player.invisUsage - 1;
        }
        Input.disableInput();
        this.invisTimer.reset();
        this.invisTimer.start();
        break;
      }
      case "GAMEOVER": {
        // this.emitter.fireEvent(GameEventType.STOP_SOUND, {
        //   key: "lv1",
        // });

        this.gameoverLayer.visible = true;
        this.gameoverSprite.visible = true;
        this.goMenubtn.visible = true;
        Input.disableKeys();
        break;
      }

      case "COLLISIONSFX": {
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {
          key: "collision",
          loop: false,
          holdReference: false,
        });
        break;
      }
      case "FINISH": {
        console.log("finish?");
        this.emitter.fireEvent("MAINMENU");
        break;
      }
      case "PICKUP": {
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {
          key: "pickup",
          loop: false,
          holdReference: false,
        });
        break;
      }
    }
  }

  public initalizeGameOver() {
    let gameoverLayer = this.addUILayer("Gameover");
    gameoverLayer.setDepth(4);
    this.gameoverSprite = this.add.sprite("gameover", "Gameover");
    this.gameoverSprite.scale.set(4, 4);
    this.gameoverSprite.position.set(260, 150);
    this.gameoverLayer = gameoverLayer;

    const MainMenuBtn = this.add.uiElement(
      UIElementType.BUTTON,
      "pauseButtons",
      {
        position: new Vec2(260, 225),
        text: "Main Menu",
      }
    );

    MainMenuBtn.onClickEventId = "MAINMENU";

    MainMenuBtn.size.set(250, 50);
    MainMenuBtn.borderColor = Color.WHITE;
    MainMenuBtn.backgroundColor = Color.TRANSPARENT;

    this.goMenubtn = MainMenuBtn;

    this.gameoverLayer.visible = false;
    this.gameoverSprite.visible = false;
    this.goMenubtn.visible = false;
  }

  public initalizePause() {
    let pauseLayer = this.addUILayer("pauseing");
    pauseLayer.setDepth(3);
    this.pauseSprite = this.add.sprite("pause", "pauseing");
    this.pauseSprite.position.set(260, 150);
    this.pauseSprite.scale.set(4, 4);
    this.pauseLayer = pauseLayer;

    let pauseButton = this.addUILayer("pauseButtons");
    this.pauseButton = pauseButton;
    pauseButton.setDepth(10);
    const MainMenuBtn = this.add.uiElement(
      UIElementType.BUTTON,
      "pauseButtons",
      {
        position: new Vec2(260, 150),
        text: "Main Menu",
      }
    );

    MainMenuBtn.onClickEventId = "MAINMENU";

    MainMenuBtn.size.set(250, 50);
    MainMenuBtn.borderColor = Color.WHITE;
    MainMenuBtn.backgroundColor = Color.TRANSPARENT;
    this.mainmenubtn = MainMenuBtn;

    const ResumeBtn = this.add.uiElement(UIElementType.BUTTON, "pauseButtons", {
      position: new Vec2(260, 200),
      text: "Resume",
    });
    ResumeBtn.size.set(250, 50);
    ResumeBtn.borderColor = Color.WHITE;
    ResumeBtn.backgroundColor = Color.TRANSPARENT;
    ResumeBtn.onClickEventId = "RESUME";
    this.resumebtn = ResumeBtn;

    this.pauseLayer.visible = false;
    this.pauseButton.visible = false;
    this.pauseSprite.visible = false;
    this.mainmenubtn.visible = false;
    this.resumebtn.visible = false;
  }

  public initializeLayer() {
    this.addLayer("primary", 10);
    this.addLayer("next", 4);
  }

  public initalizeTreasure() {
    let treasure = this.add.animatedSprite(
      TreasureActor,
      "treasure",
      "primary"
    );

    treasure.position.set(500, 500);
    treasure.scale.set(0.45, 0.45);
    treasure.addPhysics(new AABB(Vec2.ZERO, new Vec2(7, 7)), null, false);
    treasure.addAI(TreasureAI, { target: this.player });
    treasure.animation.play("SPIN");
  }

  public initalizeStationaryGuards() {
    let stationaryGuard1 = this.add.animatedSprite(
      StationaryGuardActor,
      "guard",
      "primary"
    );

    stationaryGuard1.position.set(280, 455);
    stationaryGuard1.scale.set(0.75, 0.75);
    stationaryGuard1.addPhysics(
      new AABB(Vec2.ZERO, new Vec2(7, 7)),
      null,
      false
    );

    stationaryGuard1.navkey = "navmesh";
    stationaryGuard1.addAI(StationaryGuardAI, {
      target: this.player,
      station: new Vec2(280, 455),
      range: 100,
    });

    stationaryGuard1.animation.play("IDLE");

    let stationaryGuard2 = this.add.animatedSprite(
      StationaryGuardActor,
      "guard",
      "primary"
    );

    stationaryGuard2.position.set(750, 455);
    stationaryGuard2.scale.set(0.75, 0.75);
    stationaryGuard2.addPhysics(
      new AABB(Vec2.ZERO, new Vec2(7, 7)),
      null,
      false
    );

    stationaryGuard2.navkey = "navmesh";
    stationaryGuard2.addAI(StationaryGuardAI, {
      target: this.player,
      station: new Vec2(750, 455),
      range: 100,
    });

    stationaryGuard2.animation.play("IDLE");
  }

  public initalizeGuards() {
    let guard1 = this.add.animatedSprite(SpeedGuardActor, "guard", "primary");
    guard1.position.set(350, 676);
    guard1.scale.set(0.75, 0.75);
    guard1.addPhysics(new AABB(Vec2.ZERO, new Vec2(7, 7)), null, false);
    let guard1PatrolPath = [];
    guard1PatrolPath.push(new Vec2(700, 676));
    guard1PatrolPath.push(new Vec2(700, 276));
    guard1PatrolPath.push(new Vec2(350, 276));
    guard1PatrolPath.push(new Vec2(350, 676));
    guard1.startPosition = new Vec2(350, 676);
    guard1.navkey = "navmesh";
    guard1.addAI(SpeedGuardAI, {
      target: this.player,
      patrolPath: guard1PatrolPath,
    });
    guard1.animation.play("IDLE");

    let guard2 = this.add.animatedSprite(SpeedGuardActor, "guard", "primary");
    guard2.position.set(676, 276);
    guard2.scale.set(0.75, 0.75);
    guard2.addPhysics(new AABB(Vec2.ZERO, new Vec2(7, 7)), null, false);
    let guard2PatrolPath = [];
    guard2PatrolPath.push(new Vec2(350, 276));
    guard2PatrolPath.push(new Vec2(350, 676));
    guard2PatrolPath.push(new Vec2(676, 676));
    guard2PatrolPath.push(new Vec2(676, 276));
    guard2.startPosition = new Vec2(676, 276);
    guard2.navkey = "navmesh";
    guard2.addAI(SpeedGuardAI, {
      target: this.player,
      patrolPath: guard2PatrolPath,
    });
    guard2.animation.play("IDLE");
  }

  public initalizeDetective() {
    let detective1 = this.add.animatedSprite(
      DetectiveActor,
      "detective",
      "primary"
    );
    detective1.position.set(850, 750);
    detective1.scale.set(0.75, 0.75);
    detective1.addPhysics(new AABB(Vec2.ZERO, new Vec2(7, 7)), null, false);
    detective1.navkey = "navmesh";
    detective1.addAI(DetectiveAI, {
      target: this.player,
    });
    detective1.animation.play("IDLE");
  }

  public initalizePlayer() {
    let player = this.add.animatedSprite(PlayerActor, "player", "primary");
    player.position.set(170, 120);
    player.scale.set(0.75, 0.75);
    player.addPhysics(new AABB(Vec2.ZERO, new Vec2(8, 8)));
    player.addAI(PlayerAI);
    player.animation.play("IDLE");
    this.player = player;
    this.viewport.follow(player);
  }

  public initalizeUI() {
    this.addUILayer("UI");

    this.invisLabel = <Label>this.add.uiElement(UIElementType.LABEL, "UI", {
      text: "INVISIBLE",
      position: new Vec2(27, 55),
    });
    this.invisLabel.size = new Vec2(300, 30);
    this.invisLabel.fontSize = 24;
    this.invisLabel.font = "Courier";

    //---smokes
    this.invisUI1 = this.add.sprite("smoke", "UI");
    this.invisUI1.position = new Vec2(60, 55);
    this.invisUI1.scale.set(0.5, 0.5);

    this.invisUI2 = this.add.sprite("smoke", "UI");
    this.invisUI2.position = new Vec2(75, 55);
    this.invisUI2.scale.set(0.5, 0.5);

    this.invisUI3 = this.add.sprite("smoke", "UI");
    this.invisUI3.position = new Vec2(90, 55);
    this.invisUI3.scale.set(0.5, 0.5);

    //------LABELS--------------
    this.dashLabel = <Label>this.add.uiElement(UIElementType.LABEL, "UI", {
      text: "DASH",
      position: new Vec2(15, 25),
    });
    this.dashLabel.size = new Vec2(300, 30);
    this.dashLabel.fontSize = 24;
    this.dashLabel.font = "Courier";

    this.disguiseLabel = <Label>this.add.uiElement(UIElementType.LABEL, "UI", {
      text: "DISGUISE",
      position: new Vec2(25, 40),
    });
    this.disguiseLabel.size = new Vec2(300, 30);
    this.disguiseLabel.fontSize = 24;
    this.disguiseLabel.font = "Courier";

    //------------BAR----------

    this.dashBar = <Label>this.add.uiElement(UIElementType.LABEL, "UI", {
      position: new Vec2(85, 25),
      text: "",
    });

    this.dashBar.size = new Vec2(300, 25);
    this.dashBar.backgroundColor = Color.GREEN;

    this.disguiseBar = <Label>this.add.uiElement(UIElementType.LABEL, "UI", {
      position: new Vec2(100, 40),
      text: "",
    });

    this.disguiseBar.size = new Vec2(300, 25);
    this.disguiseBar.backgroundColor = Color.GREEN;

    //------------------BG-----------

    this.dashBarBg = <Label>this.add.uiElement(UIElementType.LABEL, "UI", {
      position: new Vec2(85, 25),
      text: "",
    });
    this.dashBarBg.size = new Vec2(300, 25);
    this.dashBarBg.borderColor = Color.BLACK;

    this.disguiseBarBg = <Label>this.add.uiElement(UIElementType.LABEL, "UI", {
      position: new Vec2(100, 40),
      text: "",
    });
    this.disguiseBarBg.size = new Vec2(300, 25);
    this.disguiseBarBg.borderColor = Color.BLACK;
  }

  public handleDashChange(currentDash: number, maxDash: number) {
    let unit = this.dashBarBg.size.x / maxDash;
    let decrese = this.dashBarBg.size.x - unit * currentDash;
    if (decrese < 0) {
      decrese = 0;
    }

    this.dashBar.size.set(decrese, this.dashBarBg.size.y);
    this.dashBar.position.set(
      this.dashBarBg.position.x - currentDash / 2,
      this.dashBarBg.position.y
    );
  }

  public handleDashCoolDown(cooldown: boolean) {
    if (cooldown) {
      this.dashBar.backgroundColor = Color.YELLOW;
    } else {
      this.dashBar.backgroundColor = Color.GREEN;
    }
  }

  public handleDisguiseChange(
    currentDisguiseTime: number,
    maxDisguiseTime: number
  ) {
    let unit = this.disguiseBarBg.size.x / maxDisguiseTime;
    let decrese = this.disguiseBarBg.size.x - unit * currentDisguiseTime;
    if (decrese < 0) {
      decrese = 0;
    }

    this.disguiseBar.size.set(decrese, this.disguiseBarBg.size.y);
    this.disguiseBar.position.set(
      this.disguiseBarBg.position.x - currentDisguiseTime / 2,
      this.disguiseBarBg.position.y
    );
  }

  public handleInvis = () => {
    this.player.visible = true;
    this.player.canInvisible = true;
    this.player.inInvis = false;
    Input.enableInput();
  };

  public handleDisguiseCoolDown(cooldown: boolean) {
    if (cooldown) {
      this.disguiseBar.backgroundColor = Color.YELLOW;
    } else {
      this.disguiseBar.backgroundColor = Color.GREEN;
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
