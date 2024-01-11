import SceneManager from "./scenes/scenemanager.js";
import Portal from "./scenes/portal.js";
import Item from "./items/item.js";

/* DOM */
const sceneManager = new SceneManager();

window.onload = () => {
  loadScenes();
};

const loadScenes = async () => {
  await sceneManager.loadScenes();
  sceneManager.loadActiveScene();
  await loadItemsToScenes();
  SceneManager.scenes[0].load(game);
};

const loadItemsToScenes = async () => {
  const items = await fetch("./res/data/items.json");
  const data = await items.json();
  SceneManager.scenes.forEach((scene) => {
    data.forEach((itemScene) => {
      if (scene.name === itemScene.scene.name) {
        itemScene.scene.items.forEach((item) => {
          if (item.type === "portal" || item.type === "play-button") {
            let imagePath;
            switch (item.direction) {
              case "up":
                imagePath = "./res/img/ui/arrow-up.png";
                break;
              case "down":
                imagePath = "./res/img/ui/arrow-down.png";
                break;
              case "left":
                imagePath = "./res/img/ui/arrow-left.png";
                break;
              case "right":
                imagePath = "./res/img/ui/arrow-right.png";
                break;
              default:
                imagePath = item.imagePath;
            }
            scene.addItem(
              new Portal(
                item.name,
                item.description,
                item.sceneName,
                item.x,
                item.y,
                imagePath,
                item.w,
                item.h,
                item.type
              )
            );
            return;
          }
          scene.addItem(
            new Item(
              item.name,
              item.description,
              item.imagePath,
              item.x,
              item.y,
              item.w,
              item.h,
              item.type,
              undefined,
              item.data
            )
          );
        });
        return;
      }
    });
    scene.deloadItems();
  });
};
