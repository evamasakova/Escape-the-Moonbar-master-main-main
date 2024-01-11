import Item from "../items/item.js";
import SceneManager from "./scenemanager.js";

class Portal extends Item {
  constructor(name, description, sceneName, x, y, imagePath, w, h, type) {
    super(name, description, imagePath, x, y, w, h, type, sceneName);
  }
}

export default Portal;
