
import images from './images'

export default function preload ():void{
    this.load.image('sky', images.sky);
    this.load.image('ground', images.ground);
    this.load.image('star', images.star);
    this.load.spritesheet('dude', images.dude, { frameWidth: 32, frameHeight: 48 });

    this.$gameData = {
        platforms: '',
        player:'',
        cursors:'',
        stars:''
    } 
}