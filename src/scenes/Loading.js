import { Sprite, filters, Graphics } from 'pixi.js';
import Scene from './Scene';
import Footer from '../components/Footer';
import playScene from '../assets/play-scene.png';
import ooo from '../assets/ooo.png';
import keyLong from '../assets/key-long.png';
import gsap from 'gsap';
import Tutorial from './Tutorial';
import Game from '../Game';
export default class Loading extends Scene {
    async onCreated() {

        //add background
        const background = Sprite.from(playScene)
        background.width= window.innerWidth
        background.height = window.innerHeight 
        background.anchor.set(0.5)

        //add filter on background
        const blur = new filters.BlurFilter(50, 8);
        background.filters = [blur];
    
        //add logo
        const logo = Sprite.from(ooo);
        logo.width= 300;
        logo.height= 100;
        logo.anchor.set(0.5)
        logo.position.set(0, -100)
        
        // add loading bar
        const bar = Sprite.from(keyLong)
        bar.height = 100
        bar.anchor.set(0.5)
        bar.position.set(0, 50)

        const graphics = new Graphics();
        graphics.beginFill(0xffffff, 1);
        graphics.drawRect(-368, 5, 736, 88)
        graphics.endFill()

        this.addChild(background, logo, bar, graphics);

        const footer = new Footer();
        footer.x = - window.innerWidth / 2;
        footer.y = window.innerHeight / 2 - footer.height;
        this.addChild(footer);

        //add animation to loading bar
        gsap.to(graphics.scale, { x: 0, duration: 5, ease: 'linear' });

        setTimeout(() => {
        this.start();
        }, 5300)
        
      }

      async start() {
        await this.switchScene(Loading, { scene: 'loading' });
        await this.currentScene.finish;
    
        this.switchScene(Tutorial, { scene: 'tutorial' });
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