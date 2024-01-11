import SceneManager from "../scenes/scenemanager.js";

class Safe {
  static correctSeq = ["green", "green", "pink", "green", "blue"];
  static seq = [];
  static canBeUsed = true;
  static opened = false;

  static input(data) {
    if (!this.canBeUsed || this.opened) return;
    if (Safe.seq.length < Safe.correctSeq.length) {
      Safe.seq.push(data);
      console.log(Safe.seq);
    }
    if (Safe.checkSeqs() && Safe.correctSeq.length == Safe.seq.length) {
      console.log("Safe opened");
      this.opened = true;
      SceneManager.scenes.map((scene) => {
        if (scene.name === SceneManager.activeScene) {
          scene.deloadItems();
        }
      });
      SceneManager.scenes.map((scene) => {
        if (scene.name === "safe closeup open") {
          scene.load(game);
        }
      });
    } else if (Safe.correctSeq.length == Safe.seq.length) {
      console.log("Wrong seq");
      console.log("Your seq: " + Safe.seq);
      this.canBeUsed = false;
      [...document.getElementsByClassName("safe-button-display")].map(
        (element) => {
          element.style.boxShadow =
            "0 4px 8px 0 rgba(255, 0, 0, 0.1), 0 6px 20px 0 rgba(255, 0, 0, 0.69)";
          setTimeout(() => {
            element.style.boxShadow = "none";
          }, 200);
          setTimeout(() => {
            element.style.boxShadow =
              "0 4px 8px 0 rgba(255, 0, 0, 0.1), 0 6px 20px 0 rgba(255, 0, 0, 0.69)";
          }, 400);
          setTimeout(() => {
            element.style.boxShadow = "none";
          }, 600);
          setTimeout(() => {
            element.style.boxShadow =
              "0 4px 8px 0 rgba(255, 0, 0, 0.1), 0 6px 20px 0 rgba(255, 0, 0, 0.69)";
          }, 800);
          setTimeout(() => {
            element.style.boxShadow = "none";
          }, 1000);
        }
      );
      setTimeout(() => {
        this.canBeUsed = true;
      }, 1000);
      Safe.seq = [];
      console.log("New seq");
      console.log(Safe.seq);
    }
  }

  static readData() {}

  static checkSeqs() {
    return JSON.stringify(Safe.correctSeq) == JSON.stringify(Safe.seq);
  }
}

export default Safe;
