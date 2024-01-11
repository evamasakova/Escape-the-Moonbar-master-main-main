import Safe from "../items/safe.js";
import Scene from "../scenes/scene.js";

class SceneManager {
  static activeScene = "";
  static scenes = [];

  constructor() {}

  addScene(scene) {
    SceneManager.scenes.push(scene);
  }

  async loadScenes() {
    const scenes = await fetch("./res/data/scenes.json");
    const data = await scenes.json();
    data.scenes.map((scene) => {
      this.addScene(new Scene(scene.name, scene.path));
    });
    SceneManager.activeScene = "opening scene";
  }

  loadActiveScene() {
    SceneManager.scenes.map((scene) => {
      if (scene.name === SceneManager.activeScene) {
        scene.deloadItems();
        scene.load(game);
      }
    });
  }
}

export default SceneManager;
