import SceneManager from "../scenes/scenemanager.js";

class Bar {
  static barStorage = [];
  static barOpened = false;
  static lastElement;
  static correctOrder = [
    "Bylinky",
    "kapitan jack morgan",
    "pink water",
    "holy water",
  ];
  static currentOrder = [
    "holy water",
    "pink water",
    "Bylinky",
    "kapitan jack morgan",
  ];
  static canBeSwapped = true;

  static input(element) {
    if (!Bar.canBeSwapped) return;
    if (Bar.barStorage.length == 0 || Bar.barStorage.length == 1) {
      if (this.lastElement == element) return;
      Bar.barStorage.push(element);
      this.lastElement = element;
    }
    if (Bar.barStorage.length == 2) {
      let elementOneIndex = this.currentOrder.indexOf(Bar.barStorage[0].title);
      let elementTwoIndex = this.currentOrder.indexOf(Bar.barStorage[1].title);
      let elementOne = this.currentOrder[elementOneIndex];
      let elementTwo = this.currentOrder[elementTwoIndex];
      this.currentOrder[elementOneIndex] = elementTwo;
      this.currentOrder[elementTwoIndex] = elementOne;
      this.lastElement = null;
      let shadowElement = {
        left: Bar.barStorage[0].style.left,
      };
      Bar.barStorage[0].style.left = Bar.barStorage[1].style.left;
      Bar.barStorage[1].style.left = shadowElement.left;
      Bar.barStorage = [];
      if (Bar.rightOrder()) {
        Bar.canBeSwapped = false;
        SceneManager.scenes.map((scene) => {
          if (scene.name === SceneManager.activeScene) {
            scene.deloadItems();
          }
        });
        SceneManager.scenes.map((scene) => {
          if (scene.name === "behind bar open compartment") {
            scene.load(game);
          }
        });
      }
      return;
    }
  }

  static rightOrder() {
    return JSON.stringify(Bar.correctOrder) == JSON.stringify(Bar.currentOrder);
  }
}

export default Bar;
