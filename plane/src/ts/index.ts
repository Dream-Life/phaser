import Phaser from  'phaser'
import home from './home'
import loading from './loading'

const game:Phaser.Game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 240,
    height: 400
})

console.log(game)
game.scene.add('home', home)
game.scene.add('loading', loading)
game.scene.start('loading')