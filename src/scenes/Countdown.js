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
import shieldActive from '../assets/shield-active.png';
import shieldInactive from '../assets/shield-inactive.png';
import Rocket from '../assets/rocket.png';
import healthBar from '../assets/rover-health-bar.png';
import Play from './Play';

export default class Countdown extends Scene {
    async onCreated() { 

        // add background
        const background = Sprite.from(playScene)
        background.width= window.innerWidth
        background.height = window.innerHeight 
        background.anchor.set(0.5)

        //add planet 1
        const firstPlanet = Sprite.from(planet1);
        firstPlanet.anchor.set(0.5)
        firstPlanet.y = 400
        firstPlanet.x = 500

        //add planet 2
        const secondPlanet = Sprite.from(planet2);
        secondPlanet.anchor.set(0.5)
        secondPlanet.y = -400
        secondPlanet.x = -730
      
        //add planet 3
        const thirdPlanet = Sprite.from(planet3);
        thirdPlanet.anchor.set(0.5)
        thirdPlanet.y = 365
        thirdPlanet.x = -900

        //add planet 4
        const fourthPlanet = Sprite.from(planet4);
        fourthPlanet.anchor.set(0.5)
        fourthPlanet.y = -550
        fourthPlanet.x = 950

        //add players
        const player = Sprite.from(rover);
        player.anchor.set(0.5)
        player.x = 430

        const enemyPlayer = Sprite.from(rover);
        enemyPlayer.anchor.set(0.5)
        enemyPlayer.scale.x = -1
        enemyPlayer.scale.y = -1
        enemyPlayer.x = -700
        enemyPlayer.y = -120

        //add shadows
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

        //add shields
        const activeShield = Sprite.from(shieldActive)
        activeShield.anchor.set(0.5)
        activeShield.rotation = -0.80
        activeShield.x = 430
        activeShield.y = -145

        const inactiveShield = Sprite.from(shieldInactive);
        inactiveShield.anchor.set(0.5)
        inactiveShield.rotation = -0.80
        inactiveShield.x = 315
        inactiveShield.y = -30

        const enemyActiveShield = Sprite.from(shieldActive)
        enemyActiveShield.anchor.set(0.5)
        enemyActiveShield.rotation = 2.35
        enemyActiveShield.x = -680
        enemyActiveShield.y =50

        const enemyInactiveShield = Sprite.from(shieldInactive)
        enemyInactiveShield.anchor.set(0.5)
        enemyInactiveShield.rotation = 2.35
        enemyInactiveShield.x = -560
        enemyInactiveShield.y = -70

        //add rocket
        const rocket = Sprite.from(Rocket)
        rocket.anchor.set(0.5)
        rocket.rotation = -1.2
        rocket.x = 20
        rocket.y = -50

        //add health bars
        const roverHealthBar = Sprite.from(healthBar)
        roverHealthBar.anchor.set(0.5)
        roverHealthBar.x = 425
        roverHealthBar.y = -75

        const enemyRoverHealthBar = Sprite.from(healthBar)
        enemyRoverHealthBar.anchor.set(0.5)
        enemyRoverHealthBar.x = -690
        enemyRoverHealthBar.y = -45

        //add health
        const health = new PIXI.Graphics();
		    health.beginFill(0xbfff00,1);
		    health.drawRoundedRect(368,-80.5, 80, 10, 70);
		    health.endFill();

        const enemyHealth = new PIXI.Graphics();
		    enemyHealth.beginFill(0xbfff00,1);
		    enemyHealth.drawRoundedRect(-712,-50.5, 80, 10, 70);
		    enemyHealth.endFill();

        const transparent = new PIXI.Graphics();
        transparent.beginFill(0x2f1b64,0.5);
        transparent.drawRect(-960,-500 , window.innerWidth,window.innerHeight);
        transparent.endFill();

        const circle = new PIXI.Graphics();
        circle.lineStyle(20, 0xffffff);
        circle.beginFill(0x5D248f, 0.6)
        circle.drawCircle(-100, -50, 200)
        circle.endFill();

        const style = new TextStyle({
          fontFamily: "Verdana",
          fontSize: 200,
          fill: "0xffffff",
          fontWeight: 'bold'
        });

        const text = new Text(`3`, style);
        text.x = -170
        text.y = -180

        const footer = new Footer();
        footer.x = - window.innerWidth / 2;
        footer.y = window.innerHeight / 2 - footer.height;
        this.addChild(footer);

        this.addChild(background, firstPlanet, 
          secondPlanet, thirdPlanet, 
          fourthPlanet, player, 
          enemyPlayer, shadow, 
          enemyShadow, activeShield, 
          inactiveShield, enemyActiveShield,
          enemyInactiveShield, rocket,
          roverHealthBar, enemyRoverHealthBar,
          health, enemyHealth, 
          transparent, circle,
          text, footer);

          const text2 = new Text(`2`, style);
          const text3 = new Text(`1`, style); 

          setTimeout(() => {
            this.removeChild(text);
            const text2 = new Text(`2`, style);
            this.addChild(text2);
            text2.x = -170
            text2.y = -180
            setTimeout(() => {
              this.removeChild(text2);
              this.addChild(text3);
              text3.x = -170
              text3.y = -180
              setTimeout(() => {
              this.start();
              }, "1000") 
            }, "1000")             
          }, "2000") 

          
    }

    async start() {  
        this.switchScene(Play, { scene: 'play' });
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