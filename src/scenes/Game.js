import Phaser from '../lib/phaser.js';

export default class Game extends Phaser.Scene{
/** @type {Phaser.Physics.Arcade.Sprite} */
    platforms
    player
    sceneHeight

    /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
    cursor

    constructor(){
        super('game')
    }

    preload(){
        this.load.image('background','assets/png/background/bg_layer1.png')
        this.load.image('platform','assets/png/environment/ground_grass.png');

        this.load.image('bunny-stand','assets/png/players/bunny1_stand.png');

        this.cursor = this.input.keyboard.createCursorKeys()

    }

    create(){
        this.add.image(240,320,'background').setScrollFactor(1,0)
        
        //below line is to add a simple image (without pyshics)
        //this.add.image(190,47,'platform').setScale(0.5)

        //below line is to add a static imaage (with pyshics)
        //this.physics.add.staticImage(200,124,'platform').setScale(0.5)

        this.platforms = this.physics.add.staticGroup()

        this.sceneHeight = this.game.config.height
        console.log(this.sceneHeight)

        const maxNumOfPlatforms = Math.ceil(this.sceneHeight/150)+1
        console.log(maxNumOfPlatforms)
        for(let i = 0 ;i < parseInt(maxNumOfPlatforms);i++){

            const x = Phaser.Math.Between(80,400) //to keep the platform inside the screen
            const y = i * 150

            /** @type {Phaser.Physics.Arcade.Sprite} */
            const platform = this.platforms.create(x,y,'platform')
            platform.scale =0.5
            
            /** @type {Phaser.Physics.Arcade.StaticBody} */
            //below lines refresh the window to add new changes
            const body = platform.body
            body.updateFromGameObject()
        }
        
        this.player = this.physics.add.sprite(240,this.sceneHeight/2,'bunny-stand').setScale(0.5)
        this.physics.add.collider(this.platforms,this.player)

        this.cameras.main.startFollow(this.player)
    }

    update(t,dt){

        this.platforms.children.iterate(child =>{
            const platform = child

            const scrollY = this.cameras.main.scrollY

            if(platform.y >= scrollY+this.sceneHeight+(this.sceneHeight*.3)){
                platform.y = scrollY - Phaser.Math.Between(80,140)
                platform.body.updateFromGameObject()
            }
        })

        const touchingDown = this.player.body.touching.down

        if(touchingDown){
            this.player.setVelocityY(-300)
        }

        //left and right input logic
        if(this.cursor.left.isDown && !touchingDown){
            this.player.setVelocityX(-200)
        }
        else if(this.cursor.right.isDown && !touchingDown){
            this.player.setVelocityX(200)
        }
        else{
            this.player.setVelocityX(0)
        }

        this.player.body.checkCollision.up = false
        this.player.body.checkCollision.right = false
        this.player.body.checkCollision.left = false
    }
}