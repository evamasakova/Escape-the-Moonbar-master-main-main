import SceneManager from "../scenes/scenemanager.js";

export default class Box {
  static correctSeq = ["splitTriangle", "snake", "threeLines", "whirl"];
  static changeSeq = [              //jak jdou po sobe symboly
    {
      "name": "whirl",
      "imagePath": "./res/img/box/Whirl.png"
    },
    {
      "name": "snake",
      "imagePath": "./res/img/box/S_symbol.png"
    },
    {
      "name": "splitTriangle",
      "imagePath": "./res/img/box/Split_triangle.png"
    },
    {
      "name": "threeLines",
      "imagePath": "./res/img/box/Three_lines.png"
    }
  ];
  static seq = ["", "", "", ""];      //currentSeq ulozena sem
  static canBeUsed = true;
  static opened = false;

  static input(item) {
    if (!this.canBeUsed || this.opened) return;
    item.currentImageIndex++;
    if (item.currentImageIndex >= this.changeSeq.length) {
      item.currentImageIndex = 0;
    }
    item.element.src = Box.changeSeq[item.currentImageIndex].imagePath;       
    item.element.title = Box.changeSeq[item.currentImageIndex].name;          //nazev symbolu
    Box.seq[item.data.index] = Box.changeSeq[item.currentImageIndex].name;      //index toho symbolu ktery tam je
    if (Box.checkSeqs()) {                    //zchekovani sekvence
      Box.canBeSwapped = false;
        SceneManager.scenes.map((scene) => {
          if (scene.name === SceneManager.activeScene) {
            scene.deloadItems();
          }
        });
        SceneManager.scenes.map((scene) => {
          if (scene.name === "box open closeup") {
            scene.load(game);
          }
        });
    }
  }
  static readData() { }

  static checkSeqs() {
    return JSON.stringify(Box.correctSeq) == JSON.stringify(Box.seq);
  }
}

