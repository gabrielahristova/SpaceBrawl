import { Sprite } from 'pixi.js';
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
          console.log(e.keyCode)
          if(e.keyCode === 87 || e.keyCode === 38) {
            activeShield.visible = true
          }
          else if (e.keyCode === 83 || e.keyCode === 40) {
            inactiveShield.visible = true
          }
          else if (e.keyCode === 65 || e.keyCode === 37) {
            activeShield.rotation = -2.4
            activeShield.x = 315
            activeShield.y = -30
          }
          else if (e.keyCode === 68 || e.keyCode === 39) {
            activeShield.rotation = -0.80
            activeShield.x = 430
            activeShield.y = -145
          }
        })

        activeShield.visible = false;
        inactiveShield.visible = false;

        const footer = new Footer();
        footer.x = - window.innerWidth / 2;
        footer.y = window.innerHeight / 2 - footer.height;
        this.addChild(footer);

        this.addChild(background, firstPlanet, 
          secondPlanet, thirdPlanet, 
          fourthPlanet, player, 
          enemyPlayer, activeShield, inactiveShield, shadow, 
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