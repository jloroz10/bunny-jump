import Phaser from './lib/phaser.js'
import Game from './scenes/Game.js';

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 480,
    height: 940,
    scene:Game,
    physics:{
        default:'arcade',
        arcade:{
            gravity:{
                y:200
            },
            debug:true
        }
    }
 })