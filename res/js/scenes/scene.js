import SceneManager from "./scenemanager.js";

class Scene {
  items = [];

  constructor(name, path) {
    this.name = name;
    this.path = path;
  }

  load(element) {
    SceneManager.scenes.map((scene) => {
      if (scene.name === SceneManager.activeScene) {
        this.specialDeloads(scene);
        scene.deloadItems();
      }
    });
    SceneManager.activeScene = this.name;
    element.style.backgroundImage = `url(${this.path})`;
    this.loadItems();
  }

  addItem(item) {
    this.items.push(item);
  }

  loadItems() {
    this.items.map((item) => {
      item.show();
    });
  }

  deloadItems() {
    this.items.map((item) => {
      item.hide();
    });
  }

  specialDeloads(scene) {
    switch (scene.name) {
      case "codelock closeup":
        codelockInputText.style.display = "none";
        break;
    }
  }
}

export default Scene;
