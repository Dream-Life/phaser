import Phaser from 'phaser'
export default function create():void{

    this.add.image(400, 300, 'sky');

    let platforms = this.$gameData.platforms = this.physics.add.staticGroup()
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    let stars = this.$gameData.stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    let player = this.$gameData.player = this.physics.add.sprite(100,450,'dude')
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });



    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(player, platforms);
    this.physics.add.overlap(player, stars, (player, star)=>{star.disableBody(true, true)}, null, this);

    this.$gameData.cursors = this.input.keyboard.createCursorKeys();
}
