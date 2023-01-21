import { Sprite, filters, Graphics } from 'pixi.js';
import Scene from './Scene';
import Footer from '../components/Footer';
import playScene from '../assets/play-scene.png';
import keyDefault from '../assets/key-default.png';
import arrow from '../assets/arrow.png';
import { Text, TextStyle } from 'pixi.js';
import Game from '../Game';
import Countdown from './Countdown';

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

        //add interaction to the button
        button.interactive = true;
        button.buttonMode = true;

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

        button.on('pointerdown', () => {
            this.removeChild(circle, circle2, text);
            const circle5 = new PIXI.Graphics();
            circle5.beginFill(0xffffff, 0.25);
            circle5.drawCircle(-30, 170, 8, 8, 80);
            circle5.endFill();

            const circle6 = new PIXI.Graphics();
            circle6.beginFill(0xffffff, 1);
            circle6.drawCircle(-10, 170, 8, 8, 80);
            circle6.endFill();

            const text3 = new Text(`Press the "D" key to move the shield right`, style);
            text3.y = 85
            text3.anchor.set(0.5);
            this.addChild(circle5, circle6, text3);
            this.removeChild(button)

            const button2 = new PIXI.Graphics();
		    button2.beginFill(0xffffff,1);
		    button2.drawRoundedRect(-100,300,200,80, 70);
		    button2.endFill();
            this.removeChild(text2)
            this.addChild(button2, text2)
            button2.interactive = true;
            button2.buttonMode = true;

            button2.on('pointerdown', () => {
                this.removeChild(circle6)

                const circle7 = new PIXI.Graphics();
                circle7.beginFill(0xffffff, 0.25);
                circle7.drawCircle(-10, 170, 8, 8, 80);
                circle7.endFill();


                const circle8 = new PIXI.Graphics();
                circle8.beginFill(0xffffff, 1);
                circle8.drawCircle(10, 170, 8, 8, 80);
                circle8.endFill();

                this.removeChild(text3)

                const text4 = new Text(`Press the "W" key to move the shield right`, style);
                text4.y = 85
                text4.anchor.set(0.5); 

                this.addChild(circle7, circle8, text4);

                this.removeChild(button2);

                const button3 = new PIXI.Graphics();
		        button3.beginFill(0xffffff,1);
		        button3.drawRoundedRect(-100,300,200,80, 70);
		        button3.endFill();
                this.removeChild(text2)
                this.addChild(button3, text2)
                button3.interactive = true;
                button3.buttonMode = true;

                button3.on('pointerdown', () => {
                    this.removeChild(circle8)

                    const circle9 = new PIXI.Graphics();
                    circle9.beginFill(0xffffff, 0.25);
                    circle9.drawCircle(10, 170, 8, 8, 80);
                    circle9.endFill();


                    const circle10 = new PIXI.Graphics();
                    circle10.beginFill(0xffffff, 1);
                    circle10.drawCircle(30, 170, 8, 8, 80);
                    circle10.endFill();

                    this.removeChild(text4)

                    const text5 = new Text(`Press the "S" key to move the shield right`, style);
                    text5.y = 85
                    text5.anchor.set(0.5); 

                    this.addChild(circle9, circle10, text5);

                    this.removeChild(button3);

                    const button4 = new PIXI.Graphics();
		            button4.beginFill(0xffffff,1);
		            button4.drawRoundedRect(-100,300,200,80, 70);
		            button4.endFill();
                    this.removeChild(text2)
                    this.addChild(button4, text2)
                    button4.interactive = true;
                    button4.buttonMode = true;

                    button4.on('pointerdown', () => {
                    this.start();
                    })
                })
            })
        
        })

        
    }

    async start() {
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