import { Sprite, filters, Graphics } from 'pixi.js';
import Scene from './Scene';
import Footer from '../components/Footer';
import playScene from '../assets/play-scene.png';
import keyDefault from '../assets/key-default.png';
import arrow from '../assets/arrow.png';
import { Text, TextStyle } from 'pixi.js'

export default class Tutorial extends Scene {
    async onCreated() { 

        // backgroung image
        const background = Sprite.from(playScene)
        background.width= window.innerWidth
        background.height = window.innerHeight 
        background.anchor.set(0.5)

        const blur = new filters.BlurFilter(50, 8);
        background.filters = [blur];

        // box image
        const rect = Sprite.from(keyDefault)
        rect.y = -200
        rect.anchor.set(0.5)

        // arrow image
        const arr = Sprite.from(arrow)
        arr.y = -200
        arr.anchor.set(0.5)

        // box rect
        const progressBar = new PIXI.Graphics();
		progressBar.lineStyle(1,0xFFFFFF);
		progressBar.beginFill(0x658d7d,0);
		progressBar.drawRoundedRect(-300,50,600,80, 70);
		progressBar.endFill();


        // description
        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 30,
            fill: "0xffffff"
        });

        const text = new Text(`Press the "A" key to move the shield left`, style);
        text.y = 85
        text.anchor.set(0.5);

        const button = new PIXI.Graphics();
		button.beginFill(0xffffff,1);
		button.drawRoundedRect(-100,300,200,80, 70);
		button.endFill();

        //button 'Next'
        const style2 = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 30,
            fill: "0x000000",
            fontWeight: "bold"
        });

        
        const text2 = new Text(`Next`, style2);
        text2.y = 340
        text2.anchor.set(0.5);

        // circles
        const circle = new PIXI.Graphics();
        circle.beginFill(0xffffff, 1);
        circle.drawCircle(-30, 170, 8, 8, 80);
        circle.endFill();

        const circle2 = new PIXI.Graphics();
        circle2.beginFill(0xffffff, 0.25);
        circle2.drawCircle(-10, 170, 8, 8, 80);
        circle2.endFill();

        const circle3 = new PIXI.Graphics();
        circle3.beginFill(0xffffff, 0.25);
        circle3.drawCircle(10, 170, 8, 8, 80);
        circle3.endFill();

        const circle4 = new PIXI.Graphics();
        circle4.beginFill(0xffffff, 0.25);
        circle4.drawCircle(30, 170, 8, 8, 80);
        circle4.endFill();


        this.addChild(background, rect, arr, progressBar, text, button, text2, circle, circle2, circle3, circle4);

        const footer = new Footer();
        footer.x = - window.innerWidth / 2;
        footer.y = window.innerHeight / 2 - footer.height;
        this.addChild(footer);

        
    }

    async start() {
        await this.switchScene(Tutorial, { scene: 'tutorial' });
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