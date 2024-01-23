import SceneManager from "../scenes/scenemanager.js";

export default class Abcd {
  static correctSeq = ["B", "C", "A", "D"];
  static changeSeq = [              //jak jdou po sobe symboly
    {
      "name": "A",
      "imagePath": "./res/img/abcd_lock/A.png"
    },
    {
      "name": "B",
      "imagePath": "./res/img/abcd_lock/B.png"
    },
    {
      "name": "C",
      "imagePath": "./res/img/abcd_lock/C.png"
    },
    {
      "name": "D",
      "imagePath": "./res/img/abcd_lock/D.png"
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
    item.element.src = Abcd.changeSeq[item.currentImageIndex].imagePath;       
    item.element.title = Abcd.changeSeq[item.currentImageIndex].name;          //nazev symbolu
    Abcd.seq[item.data.index] = Abcd.changeSeq[item.currentImageIndex].name;      //index toho symbolu ktery tam je
    if (Abcd.checkSeqs()) {                    //zchekovani sekvence
      Abcd.canBeSwapped = false;
        SceneManager.scenes.map((scene) => {
          if (scene.name === SceneManager.activeScene) {
            scene.deloadItems();
          }
        });
        SceneManager.scenes.map((scene) => {
          if (scene.name === "ending scene") {
            scene.load(game);
          }
        });
    }
  }
  static readData() { }

  static checkSeqs() {
    return JSON.stringify(Abcd.correctSeq) == JSON.stringify(Abcd.seq);
  }
}