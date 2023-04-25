import Game from "./Wolfie2D/Loop/Game";
import MainMenu from "./The_Silent_Mime/Scenes/MainMenu";
import { PlayerInput } from "./The_Silent_Mime/AI/Player/PlayerController";
// The main function is your entrypoint into Wolfie2D. Specify your first scene and any options here.
(function main() {
  // Run any tests
  runTests();

  // Set up options for our game
  let options = {
    canvasSize: { x: 1600, y: 900 }, // The size of the game
    clearColor: { r: 0.1, g: 0.1, b: 0.1 }, // The color the game clears to
    inputs: [
      { name: PlayerInput.MOVE_UP, keys: ["w"] },
      { name: PlayerInput.MOVE_DOWN, keys: ["s"] },
      { name: PlayerInput.MOVE_LEFT, keys: ["a"] },
      { name: PlayerInput.MOVE_RIGHT, keys: ["d"] },
      { name: PlayerInput.DASH, keys: ["shift"] },
      { name: PlayerInput.DISGUISE, keys: ["j"] },
      { name: PlayerInput.INVISIBLE, keys: ["k"] },
      { name: PlayerInput.PAUSE, keys: ["escape"] },
      // { name: PlayerInput.PAUSE, keys: ["escape"] },
    ],
    useWebGL: false, // Tell the game we want to use webgl
    showDebug: false, // Whether to show debug messages. You can change this to true if you want
  };

  // Set up custom registries

  // Create a game with the options specified
  const game = new Game(options);

  // Start our game
  game.start(MainMenu, {});
})();

function runTests() {}
