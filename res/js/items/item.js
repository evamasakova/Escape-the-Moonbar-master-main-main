import SceneManager from "../scenes/scenemanager.js";
import Bar from "./bar.js";
import Codelock from "./codelock.js";
import Safe from "./safe.js";
import Box from "./box.js";

class Item {
  constructor(name, description, imagePath, x, y, w, h, type, sceneName, data) {
    this.data = data;
    this.sceneName = sceneName;
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.type = type;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.element = new Image();
    this.element.src = imagePath;
    this.element.style.position = "absolute";
    this.element.style.top = y + "px";
    this.element.style.left = x + "px";
    this.element.style.width = this.w + "px";
    this.element.style.height = this.h + "px";
    this.element.title = description;
    this.element.style.cursor = "pointer";
    this.element.classList.add(type);
    this.handleType();
    game.appendChild(this.element);
  }

  handleType() {
    switch (this.type) {
      case "play-button":
      case "portal":
        this.element.onclick = () => {
          this.teleport();
        };
        if (this.name === "toilet door") {
          this.locked = true;
        }
        break;
      case "safe-button":
        this.element.classList.add(`safe-button`);
        this.element.classList.add(`safe-button-${this.data}`);
        this.element.onclick = () => {
          this.handleSafeButtonClick();
        };
        break;
      case "safe-button-display":
        this.element.style.opacity = 0;
        this.element.id = this.data;
        this.element.classList.add("safe-button-display");
        break;
      case "codelock-button":
        this.element.classList.add(`codelock-button`);
        this.element.onclick = () => {
          this.handleCodelockButtonClick();
        };
        break;
      case "drinkbb-button":
        this.element.onclick = () => {
          this.handleDrink(this.element);
        };
        break;
      case "rickroll":
        this.element.onclick = () => {
          window.location = "https://www.youtube.com/watch?v=BBJa32lCaaY";
        };
        break;
      case "box-button":
        this.currentImageIndex = 0;
        this.element.onclick = () => {
          this.handleBoxClick();
        }
    }
  }

  handleDrink(element) {
    Bar.input(element);
  }

  show() {
    this.element.style.display = "block";
  }

  hide() {
    this.element.style.display = "none";
  }

  teleport() {
    SceneManager.scenes.map((scene) => {
      switch (this.sceneName) {
        case "codelock closeup":
          codelockInputText.style.display = "block";
          break;
        case "safe closeup":
          if (Safe.opened) {
            SceneManager.scenes.map((scene) => {
              if (scene.name === "safe closeup open") {
                scene.load(game);
                return;
              }
            });
          }
          break;
        case "behind bar closed compartment":
          if (!Bar.canBeSwapped) {
            SceneManager.scenes.map((scene) => {
              if (scene.name === "behind bar open compartment") {
                scene.load(game);
                return;
              }
            });
          }
          break;
        case "backdoor":
          if (!this.sceneName) {
            SceneManager.scenes.map((scene) => {
              if (scene.name === "hallway") {
                scene.load(game);
                return;
              }
            });
          }
          break;
        case "toilets":
          if (!this.locked) {
            SceneManager.scenes.map((scene) => {
              if (scene.name === "toilets") {
                console.log("loading toilets")
                scene.load(game);
                return;
              }
            });
          } else {
            console.log("toilets locked");
            return;
          }
          break;
      }
      if (scene.name === this.sceneName) {
        scene.load(game);
      }
    });
  }

  resetSafeDisplay() {
    [...document.getElementsByClassName("safe-button-display")].map(
      (element) => {
        element.style.opacity = 0;
      }
    );
  }

  handleSafeButtonClick() {
    this.resetSafeDisplay();
    [...document.getElementsByClassName("safe-button-display")].map(
      (element) => {
        element.style.boxShadow =
          "0 4px 8px 0 rgba(255, 255, 255, 0.1), 0 6px 20px 0 rgba(255, 255, 255, 0.69)";
        setTimeout(() => {
          element.style.boxShadow = "none";
        }, 500);
      }
    );
    switch (this.data) {
      case "orange":
        Safe.input(this.data);
        document.getElementById("safe-button-display-orange").style.opacity = 1;
        break;
      case "green":
        Safe.input(this.data);
        document.getElementById("safe-button-display-green").style.opacity = 1;
        break;
      case "pink":
        Safe.input(this.data);
        document.getElementById("safe-button-display-pink").style.opacity = 1;
        break;
      case "blue":
        Safe.input(this.data);
        document.getElementById("safe-button-display-blue").style.opacity = 1;
        break;
    }
  }

  handleCodelockButtonClick() {
    Codelock.input(this.data);
  }

  handleBoxClick() {
    Box.input(this);
  }
}

export default Item;
