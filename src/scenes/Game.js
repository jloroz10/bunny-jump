import Phaser from '../lib/phaser.js';

export default class Game extends Phaser.Scene{
    constructor(){
        super('game')
    }

    preload(){
        this.load.image('background','assets/png/background/bg_layer1.png')
        this.load.image('platform','assets/png/environment/ground_grass.png');

        this.load.image('bunny-stand','assets/png/players/bunny1_stand.png');
    }

    create(){
        this.add.image(240,320,'background')
        
        //below line is to add a simple image (without pyshics)
        //this.add.image(190,47,'platform').setScale(0.5)

        //below line is to add a static imaage (with pyshics)
        //this.physics.add.staticImage(200,124,'platform').setScale(0.5)

        const platforms = this.physics.add.staticGroup()

        for(let i = 0 ;i < 5;i++){

            const x = Phaser.Math.Between(80,400) //to keep the platform inside the screen
            const y = i * 150

            /** @type {Phaser.Physics.Arcade.Sprite} */
            const platform = platforms.create(x,y,'platform')
            platform.scale =0.5
            
            /** @type {Phaser.Physics.Arcade.StaticBody} */
            //below lines refresh the window to add new changes
            const body = platform.body
            body.updateFromGameObject()
        }
        
        const player = this.physics.add.sprite(240,320,'bunny-stand').setScale(0.5)
        this.physics.add.collider(platforms,player)
    }
}