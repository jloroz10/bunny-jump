
import Phaser from '../lib/phaser.js'

class GameOver extends Phaser.Scene{
    constructor(){
        super('game-over')
    }

    create(){
        const width = this.scale.width
        const height = this.scale.height

        this.add.text(width * 0.5, height * 0.5, 'Game Over',{
            fontsize:55
        })
        .setOrigin(0.5)

        this.input.keyboard.once('keydown_SPACE', () => {
            this.scene.start('game')
        })
    }
}

export default GameOver