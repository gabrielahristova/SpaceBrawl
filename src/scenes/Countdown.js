import { Sprite, filters, Graphics } from 'pixi.js';
import Scene from './Scene';
import Footer from '../components/Footer';
import playScene from '../assets/play-scene.png';
import { Text, TextStyle } from 'pixi.js';
import Game from '../Game';

export default class Countdown extends Scene {
    async onCreated() { 
        const background = Sprite.from(playScene)
        background.width= window.innerWidth
        background.height = window.innerHeight 
        background.anchor.set(0.5)

        const footer = new Footer();
        footer.x = - window.innerWidth / 2;
        footer.y = window.innerHeight / 2 - footer.height;
        this.addChild(footer);

        this.addChild(background, footer);
    }

    async start() {
        await this.switchScene(Tutorial, { scene: 'tutorial' });
        await this.currentScene.finish;
    
        this.switchScene(Countdown, { scene: 'countdown' });
      }
    
      switchScene(constructor, scene) {
        this.removeChild(this.currentScene);
        this.currentScene = new constructor();
        this.currentScene.background = this._background;
        this.addChild(this.currentScene);
    
        this.emit(Game.events.SWITCH_SCENE, { scene });
    
        return this.currentScene.onCreated();
      }
}