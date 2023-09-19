import { makeObservable, observable, action } from "mobx"

class Game {
    scene = "demo"
    speed = 10
    constructor() {
        makeObservable(this, {
            scene: observable,
            speed: observable,
            setScene: action,
            setSpeed: action
        })
    }
    setScene(scene: string) {
        this.scene = scene
    }
    setSpeed(speed: number) {
        this.speed = speed
    }
}

export const game = new Game();