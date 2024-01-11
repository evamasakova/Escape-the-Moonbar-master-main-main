import SceneManager from "../scenes/scenemanager.js";

class Codelock {
  static correctSeq = ["3", "2", "5", "7"];
  static seq = [];
  static canBeUsed = true;

  static input(data) {
    if (!this.canBeUsed) return;
    switch (data) {
      case "*":
        if (Codelock.checkSeqs()) {
          SceneManager.scenes.map((scene) => {
            if (scene.name === "ending scene") {
              scene.load(game);
              return;
            }
          });
        } else {
          this.canBeUsed = false;
          codelockInputText.style.color = "red";
          setTimeout(() => {
            codelockInputText.style.color = "black";
          }, 200);
          codelockInputText.style.color = "red";
          setTimeout(() => {
            codelockInputText.style.color = "red";
          }, 400);
          setTimeout(() => {
            codelockInputText.style.color = "black";
          }, 600);
          setTimeout(() => {
            codelockInputText.style.color = "red";
          }, 800);
          setTimeout(() => {
            Codelock.seq = [];
            codelockInputText.innerHTML = "";
            codelockInputText.style.color = "black";
            this.canBeUsed = true;
          }, 1000);
        }
        break;
      case "#":
        Codelock.seq = [];
        codelockInputText.innerHTML = "";
        break;
      default:
        if (Codelock.seq.length < 4) {
          Codelock.seq.push(data);
          codelockInputText.innerHTML += data;
          console.log(Codelock.seq);
        }
        break;
    }
  }

  static readData() {}

  static checkSeqs() {
    return JSON.stringify(Codelock.correctSeq) == JSON.stringify(Codelock.seq);
  }
}

export default Codelock;
