import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Layer from "../../Wolfie2D/Scene/Layer";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import level1 from "./Levels/level1";
import level2 from "./Levels/level2";

export default class MainMenu extends Scene {
  // Layers, for for main menu and selection options
  private mainMenu: Layer;
  private help: Layer;
  private controls: Layer;

  // Create layer to show the our mime logo image
  private logoLayer: Layer;
  private lg: Sprite;

  // Create layer to show the control logo image
  private controlLayer: Layer;
  private cl: Sprite;

  // Create layer to show the help bag logo image
  private helpLayer: Layer;
  private hl: Sprite;

  // Create layer to show the select level option
  private selectLayer: Layer;
  public loadScene() {
    this.load.image("logo", "assets/menu_image/Mime.png");
    this.load.image("bag", "assets/menu_image/help_bag.png");
    this.load.image("wasd", "assets/menu_image/controls.png");
  }

  public startScene() {
    //add ui layers

    this.help = this.addUILayer("HELP");
    this.controls = this.addUILayer("CONTROLS");

    // initialize the center as a variable
    const center = this.viewport.getCenter();

    // add layer to background
    this.mainMenu = this.addUILayer("background");

    // add layer to control
    this.controls = this.addUILayer("controls");
    this.controls.setHidden(true);

    // add layer to help
    this.help = this.addUILayer("help");
    this.help.setHidden(true);

    // add layer to select option
    this.selectLayer = this.addUILayer("selectlayer");
    this.selectLayer.setHidden(true);

    // title of the game
    const title1 = <Label>this.add.uiElement(
      UIElementType.LABEL,
      "background",
      {
        position: new Vec2(center.x - 450, center.y - 400),
        text: "Le Mime Silencieux",
      }
    );
    title1.textColor = Color.WHITE;
    title1.fontSize = 50;

    // add logo mime layer and add the image to the left
    this.logoLayer = this.addLayer("logolayer", 1);
    this.logoLayer.setHidden(false);
    this.lg = this.add.sprite("logo", "logolayer");

    this.lg.scale.set(2, 2.5);
    this.lg.position = new Vec2(center.x - 450, center.y + 50);

    // add wasd logo layer and add to top
    this.controlLayer = this.addLayer("controllayer", 1);
    this.controlLayer.setHidden(true);
    this.cl = this.add.sprite("wasd", "controllayer");
    this.cl.scale.set(5, 5);
    this.cl.position = new Vec2(center.x, center.y - 275);

    // add help bag logo layer and add to top
    this.helpLayer = this.addLayer("helplayer", 1);
    this.helpLayer.setHidden(true);
    this.hl = this.add.sprite("bag", "helplayer");
    this.hl.scale.set(8, 5);
    this.hl.position = new Vec2(center.x, center.y - 325);

    // add the level select buttton
    const selectBtn = this.add.uiElement(UIElementType.BUTTON, "background", {
      position: new Vec2(center.x + 350, center.y - 200),
      text: "Select Level",
    });

    selectBtn.size.set(500, 150);
    selectBtn.borderWidth = 2;
    selectBtn.borderColor = Color.WHITE;
    selectBtn.backgroundColor = Color.TRANSPARENT;
    selectBtn.onClickEventId = "select_level";

    // add the control button
    const controlBtn = this.add.uiElement(UIElementType.BUTTON, "background", {
      position: new Vec2(center.x + 350, center.y),
      text: "Control",
    });

    controlBtn.size.set(500, 150);
    controlBtn.borderWidth = 2;
    controlBtn.borderColor = Color.WHITE;
    controlBtn.backgroundColor = Color.TRANSPARENT;
    controlBtn.onClickEventId = "controlbtn";

    // add the help button
    const helpBtn = this.add.uiElement(UIElementType.BUTTON, "background", {
      position: new Vec2(center.x + 350, center.y + 200),
      text: "Help",
    });

    helpBtn.size.set(500, 150);
    helpBtn.borderWidth = 2;
    helpBtn.borderColor = Color.WHITE;
    helpBtn.backgroundColor = Color.TRANSPARENT;
    helpBtn.onClickEventId = "helpbtn";

    // add a back to main menu button
    const ctrlbackBtn = this.add.uiElement(
      UIElementType.BUTTON,
      "controllayer",
      {
        position: new Vec2(center.x, center.y + 350),
        text: "back",
      }
    );
    ctrlbackBtn.size.set(250, 100);
    ctrlbackBtn.borderColor = Color.WHITE;
    ctrlbackBtn.backgroundColor = Color.TRANSPARENT;
    ctrlbackBtn.onClickEventId = "mainMenu";

    const helpbackBtn = this.add.uiElement(UIElementType.BUTTON, "helplayer", {
      position: new Vec2(center.x, center.y + 350),
      text: "back",
    });
    helpbackBtn.size.set(250, 100);
    helpbackBtn.borderColor = Color.WHITE;
    helpbackBtn.backgroundColor = Color.TRANSPARENT;
    helpbackBtn.onClickEventId = "mainMenu";

    const selectbackBtn = this.add.uiElement(
      UIElementType.BUTTON,
      "selectlayer",
      {
        position: new Vec2(center.x, center.y + 350),
        text: "back",
      }
    );
    selectbackBtn.size.set(250, 100);
    selectbackBtn.borderColor = Color.WHITE;
    selectbackBtn.backgroundColor = Color.TRANSPARENT;
    selectbackBtn.onClickEventId = "mainMenu";

    // control texts
    const ctrlText1 = "WASD to move around";
    const ctrlText2 = "shift to dash around";
    const ctrlText3 = "j to disguise as a guard";
    const ctrlText4 = "k to turn invisible";
    const ctrlText5 = "esc to pause";

    const ctrlLine1 = <Label>this.add.uiElement(
      UIElementType.LABEL,
      "controllayer",
      {
        position: new Vec2(center.x, center.y - 75),
        text: ctrlText1,
      }
    );

    const ctrlLine2 = <Label>this.add.uiElement(
      UIElementType.LABEL,
      "controllayer",
      {
        position: new Vec2(center.x, center.y - 25),
        text: ctrlText2,
      }
    );

    const ctrlLine3 = <Label>this.add.uiElement(
      UIElementType.LABEL,
      "controllayer",
      {
        position: new Vec2(center.x, center.y + 25),
        text: ctrlText3,
      }
    );

    const ctrlLine4 = <Label>this.add.uiElement(
      UIElementType.LABEL,
      "controllayer",
      {
        position: new Vec2(center.x, center.y + 75),
        text: ctrlText4,
      }
    );

    const ctrlLine5 = <Label>this.add.uiElement(
      UIElementType.LABEL,
      "controllayer",
      {
        position: new Vec2(center.x, center.y + 125),
        text: ctrlText5,
      }
    );

    ctrlLine1.textColor = Color.WHITE;
    ctrlLine2.textColor = Color.WHITE;
    ctrlLine3.textColor = Color.WHITE;
    ctrlLine4.textColor = Color.WHITE;
    ctrlLine5.textColor = Color.WHITE;

    // About texts
    const abtText1 =
      "Marcel is a talented Mime, but during tough times he couldn't live off of his miming abilitys alone";
    const abtText2 =
      "Marcel has a special ability where whatever imitation he performs can become real";
    const abtText3 =
      "Using this unique ability, he decided to turn to the life of crime, stealing valuables from guarded locations";

    const abtLine1 = <Label>this.add.uiElement(
      UIElementType.LABEL,
      "helplayer",
      {
        position: new Vec2(center.x, center.y - 50),
        text: abtText1,
      }
    );

    const abtLine2 = <Label>this.add.uiElement(
      UIElementType.LABEL,
      "helplayer",
      {
        position: new Vec2(center.x, center.y),
        text: abtText2,
      }
    );

    const abtLine3 = <Label>this.add.uiElement(
      UIElementType.LABEL,
      "helplayer",
      {
        position: new Vec2(center.x, center.y + 50),
        text: abtText3,
      }
    );

    abtLine1.textColor = Color.WHITE;
    abtLine2.textColor = Color.WHITE;
    abtLine3.textColor = Color.WHITE;

    // title for select
    const selectTitle = <Label>this.add.uiElement(
      UIElementType.LABEL,
      "selectlayer",
      {
        position: new Vec2(center.x, center.y - 300),
        text: "Select A Level",
      }
    );
    selectTitle.textColor = Color.WHITE;

    // level select buttons
    const level1 = this.add.uiElement(UIElementType.BUTTON, "selectlayer", {
      position: new Vec2(center.x - 150, center.y - 150),
      text: "level 1",
    });

    level1.size.set(250, 100);
    level1.borderColor = Color.WHITE;
    level1.backgroundColor = Color.TRANSPARENT;
    level1.onClickEventId = "level1";

    const level2 = this.add.uiElement(UIElementType.BUTTON, "selectlayer", {
      position: new Vec2(center.x + 150, center.y - 150),
      text: "level 2",
    });

    level2.size.set(250, 100);
    level2.borderColor = Color.WHITE;
    level2.backgroundColor = Color.TRANSPARENT;
    level2.onClickEventId = "level2";

    const level3 = this.add.uiElement(UIElementType.BUTTON, "selectlayer", {
      position: new Vec2(center.x - 150, center.y),
      text: "level 3",
    });

    level3.size.set(250, 100);
    level3.borderColor = Color.WHITE;
    level3.backgroundColor = Color.TRANSPARENT;
    level3.onClickEventId = "level3";

    const level4 = this.add.uiElement(UIElementType.BUTTON, "selectlayer", {
      position: new Vec2(center.x + 150, center.y),
      text: "level 4",
    });

    level4.size.set(250, 100);
    level4.borderColor = Color.WHITE;
    level4.backgroundColor = Color.TRANSPARENT;
    level4.onClickEventId = "level4";

    const level5 = this.add.uiElement(UIElementType.BUTTON, "selectlayer", {
      position: new Vec2(center.x - 150, center.y + 150),
      text: "level 5",
    });

    level5.size.set(250, 100);
    level5.borderColor = Color.WHITE;
    level5.backgroundColor = Color.TRANSPARENT;
    level5.onClickEventId = "level5";

    const level6 = this.add.uiElement(UIElementType.BUTTON, "selectlayer", {
      position: new Vec2(center.x + 150, center.y + 150),
      text: "level 6",
    });

    level6.size.set(250, 100);
    level6.borderColor = Color.WHITE;
    level6.backgroundColor = Color.TRANSPARENT;
    level6.onClickEventId = "level6";

    // subscribe to events
    this.receiver.subscribe("level1");
    this.receiver.subscribe("level2");
    this.receiver.subscribe("level3");
    this.receiver.subscribe("level4");
    this.receiver.subscribe("level5");
    this.receiver.subscribe("level6");
    this.receiver.subscribe("select_level");
    this.receiver.subscribe("controlbtn");
    this.receiver.subscribe("helpbtn");
    this.receiver.subscribe("mainMenu");
  }

  public updateScene() {
    while (this.receiver.hasNextEvent()) {
      this.handleEvent(this.receiver.getNextEvent());
    }
  }

  public handleEvent(event: GameEvent): void {
    switch (event.type) {
      case "mainMenu": {
        console.log("main");
        this.mainMenu.setHidden(false);
        this.logoLayer.setHidden(false);
        this.controls.setHidden(true);
        this.controlLayer.setHidden(true);
        this.help.setHidden(true);
        this.helpLayer.setHidden(true);
        this.selectLayer.setHidden(true);
        break;
      }
      case "select_level": {
        console.log("selecting level");
        this.mainMenu.setHidden(true);
        this.controlLayer.setHidden(true);
        this.helpLayer.setHidden(true);
        this.logoLayer.setHidden(true);
        this.selectLayer.setHidden(false);
        break;
      }
      case "helpbtn": {
        console.log("helpbtn");
        this.mainMenu.setHidden(true);
        this.logoLayer.setHidden(true);
        this.controls.setHidden(true);
        this.controlLayer.setHidden(true);
        this.help.setHidden(false);
        this.helpLayer.setHidden(false);
        break;
      }

      case "controlbtn": {
        console.log("control button pressed");
        this.mainMenu.setHidden(true);
        this.logoLayer.setHidden(true);
        this.help.setHidden(true);
        this.helpLayer.setHidden(true);
        this.controlLayer.setHidden(false);
        this.controls.setHidden(false);
        break;
      }
      case "level1": {
        this.sceneManager.changeToScene(level1);
        break;
      }

      case "level2": {
        this.sceneManager.changeToScene(level2);
        break;
      }

      case "level3": {
        console.log("level3 pressed");
        break;
      }

      case "level4": {
        console.log("level4 pressed");
        break;
      }

      case "level5": {
        console.log("level5 pressed");
        break;
      }

      case "level6": {
        console.log("level6 pressed");
        break;
      }
    }
  }
}
