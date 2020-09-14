import Phaser from 'phaser'
export default function create():void{
    const width = this.game.config.width
    const height = this.game.config.height
    console.log(width,height)
    this.add.sprite(width/2,height/2, 'bg')
 
}
