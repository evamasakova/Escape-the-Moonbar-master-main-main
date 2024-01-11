import SceneManager from "../scenes/scenemanager.js";

class Box {
  static correctSeq = ["splitTriangle", "snake", "threeLines", "whirl"];
  static seq = [];
  static canBeUsed = true;
  static opened = false;





  static input(data) {
    if (!this.canBeUsed || this.opened) return;
    if (Box.seq.length < Box.correctSeq.length) {
      Box.seq.push(data);
      console.log(Box.seq);
    }
    if (Box.checkSeqs() && Box.correctSeq.length == Box.seq.length) {
      console.log("Box opened");
      this.opened = true;
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
    } else if (Box.correctSeq.length == Box.seq.length) {
      console.log("Wrong seq");
      console.log("Your seq: " + Box.seq);
      this.canBeUsed = false;

      //prepinani 
      
     
      setTimeout(() => {
        this.canBeUsed = true;
      }, 1000);
      Box.seq = [];
      console.log("New seq");
      console.log(Box.seq);
    }

    } 
  static readData() {}

  static checkSeqs() {
    return JSON.stringify(Safe.correctSeq) == JSON.stringify(Safe.seq);
  

}
 }