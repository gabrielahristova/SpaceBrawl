import { Sprite, Texture } from 'pixi.js';
import Scene from './Scene';
import gsap from 'gsap';
import playScene from '../assets/play-scene.png';
import Footer from '../components/Footer';
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
import path1 from '../assets/path-1.svg';
import path2 from '../assets/path-2.svg';
import path3 from '../assets/path-3.svg';
import path4 from '../assets/path-4.svg';
import path5 from '../assets/path-5.svg';
import path6 from '../assets/path-6.svg';
import path7 from '../assets/path-7.svg';
import path8 from '../assets/path-8.svg';
import path9 from '../assets/path-9.svg';
import path10 from '../assets/path-10.svg';
export default class Play extends Scene {
  async onCreated() {

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
		    health.drawRoundedRect(367,-80.5, 115, 10, 70);
		    health.endFill();

        const enemyHealth = new PIXI.Graphics();
		    enemyHealth.beginFill(0xbfff00,1);
		    enemyHealth.drawRoundedRect(-747,-50.5, 115, 10, 70);
		    enemyHealth.endFill();

        //add animation to the planets
        gsap.to(firstPlanet, {y:380, duration: 3.5, repeat: 100, yoyo: true})
        gsap.to(secondPlanet, {y:-380, duration: 2, repeat: 100, yoyo: true})
        gsap.to(thirdPlanet, {y:345, duration: 2.5, repeat: 100, yoyo: true})
        gsap.to(fourthPlanet, {y:-530, duration: 3, repeat: 100, yoyo: true})

        window.addEventListener('keydown', async function keysDown(e) {
          //W
          if(e.keyCode === 87 || e.keyCode === 38) {
            activeShield.visible = true
          }
          //S
          else if (e.keyCode === 83 || e.keyCode === 40) {
            inactiveShield.visible = true
          }
          //A
          else if (e.keyCode === 65 || e.keyCode === 37) {
            inactiveShield.rotation = 0.8
            inactiveShield.x = 430
            inactiveShield.y = -150

            activeShield.rotation = -2.4
            activeShield.x = 315
            activeShield.y = -30
          }
          //D
          else if (e.keyCode === 68 || e.keyCode === 39) {
            inactiveShield.rotation = -0.80
            inactiveShield.x = 315
            inactiveShield.y = -30

            activeShield.rotation = -0.80
            activeShield.x = 430
            activeShield.y = -145
          }
        })


        let randomKeys= [87, 83, 65, 68, 38, 40, 37, 39]

        async function getRandomKeys(keys) {
          let num = Math.floor(Math.random() * randomKeys.length)
          if (num === 0) {
            num = 1;
          }
          let key = keys[num]
          console.log(key)
        }

        activeShield.visible = false;
        inactiveShield.visible = false;
        enemyActiveShield.visible = false;
        enemyInactiveShield.visible = false;


        // for(let i = 0; i < randomKeys.length; i++) {
        // let num = getRandomKeys(randomKeys)
        //   //W
        //   if(num == 87 || num == 38) {
        //     enemyActiveShield.visible = true
        //   }
        //   //S
        //   else if (num == 83 || num == 40) {
        //     enemyInactiveShield.visible = true
        //   }
        //   //A
        //   else if (num === 65 || num === 37) {
            
        //   }
        //   //D
        //   else if (num === 68 || num === 39) {
        //     enemyActiveShield.rotation = 2.35
        //     enemyActiveShield.x = -680
        //     enemyActiveShield.y =50

        //     enemyInactiveShield.rotation = 2.35
        //     enemyInactiveShield.x = -560
        //     enemyInactiveShield.y = -70
        //   }
        // }

        // let  texture1 = PIXI.Texture.from('data:image/svg+xml;charset=utf8,' + path1);
        // let  texture2 = PIXI.Texture.from(path2);
        // let  texture3 = PIXI.Texture.from(path3);
        // let  texture4 = PIXI.Texture.from(path4);
        // let  texture5 = PIXI.Texture.from(path5);
        // let  texture6 = PIXI.Texture.from(path6);
        // let  texture7 = PIXI.Texture.from(path7);
        // let  texture8 = PIXI.Texture.from(path8);
        // let  texture9 = PIXI.Texture.from(path9);
        // let  texture10 = PIXI.Texture.from(path10);

        const footer = new Footer();
        footer.x = - window.innerWidth / 2;
        footer.y = window.innerHeight / 2 - footer.height;
        this.addChild(footer);

        this.addChild(background, firstPlanet, 
          secondPlanet, thirdPlanet, 
          fourthPlanet, player, 
          enemyPlayer, activeShield, 
          inactiveShield, enemyActiveShield, 
          enemyInactiveShield, shadow, 
          enemyShadow,roverHealthBar, 
          enemyRoverHealthBar, health, 
          enemyHealth, footer);
        }
  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  onResize(width, height) { // eslint-disable-line no-unused-vars

  }
}