import { Sprite, filters, Graphics } from 'pixi.js';
import Scene from './Scene';
import Footer from '../components/Footer';
import playScene from '../assets/play-scene.png';
import { Text, TextStyle } from 'pixi.js';
import Game from '../Game';
import planet1 from '../assets/planet-1.png';
import planet2 from '../assets/planet-2.png';
import planet3 from '../assets/planet-3.png';
import planet4 from '../assets/planet-4.png';
import rover from '../assets/rover.png';
import roverShadow from '../assets/rover-shadow.png';

export default class Countdown extends Scene {
    async onCreated() { 
        const background = Sprite.from(playScene)
        background.width= window.innerWidth
        background.height = window.innerHeight 
        background.anchor.set(0.5)

        const firstPlanet = Sprite.from(planet1);
        firstPlanet.anchor.set(0.5)
        firstPlanet.y = 400
        firstPlanet.x = 500

        const secondPlanet = Sprite.from(planet2);
        secondPlanet.anchor.set(0.5)
        secondPlanet.y = -400
        secondPlanet.x = -730

        const thirdPlanet = Sprite.from(planet3);
        thirdPlanet.anchor.set(0.5)
        thirdPlanet.y = 365
        thirdPlanet.x = -900

        const fourthPlanet = Sprite.from(planet4);
        fourthPlanet.anchor.set(0.5)
        fourthPlanet.y = -550
        fourthPlanet.x = 950

        const player = Sprite.from(rover);
        player.anchor.set(0.5)
        player.x = 430

        const enemyPlayer = Sprite.from(rover);
        enemyPlayer.anchor.set(0.5)
        enemyPlayer.scale.x = -1
        enemyPlayer.scale.y = -1
        enemyPlayer.x = -700
        enemyPlayer.y = -120

        const shadow = Sprite.from(roverShadow);
        shadow.anchor.set(0.5)
        shadow.x = 430
        shadow.y = 65

        const enemyShadow = Sprite.from(roverShadow);
        enemyShadow.anchor.set(0.5)
        enemyShadow.scale.x = -1
        enemyShadow.scale.y = -1
        enemyShadow.x = -700
        enemyShadow.y = -185

        const footer = new Footer();
        footer.x = - window.innerWidth / 2;
        footer.y = window.innerHeight / 2 - footer.height;
        this.addChild(footer);

        this.addChild(background, firstPlanet, secondPlanet, thirdPlanet, fourthPlanet, player, enemyPlayer, shadow, enemyShadow, footer);
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