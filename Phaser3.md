# Phaser

Phaser就是一款免费开源的HTML5游戏框架, 高性能，兼容性强，学习成本低，案例和文档也较多。

网站：

​	国内：https://www.phaser-china.com/

​	国外：https://phaser.io/



环境搭建

安装：

npm

```
npm install phaser
```



cdn

<script src="//cdn.jsdelivr.net/npm/phaser@3.24.1/dist/phaser.js"></script>

<script src="//cdn.jsdelivr.net/npm/phaser@3.24.1/dist/phaser.min.js"></script>



直接下载



运行打包

http-server（官网）

```
npm install --global http-server
```

parcel

配置无，自动下载插件，但无法自定义配置

```
npm install -g parcel-bundler
```

Webpack

配置灵活，但配置繁琐



phaser-demo - ts + parcel 打包

通过一个demo来简单介绍开发过程



初始化 index.ts

```
const game: Phaser.Game = new Phaser.Game({
    type: Phaser.AUTO, // WEBGL 和 CANVAS 渲染方式
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }, // 重力
            debug: false
        }
    },
    scene: {
        preload: preload, // 资源加载
        create: create, // 初始化世界
        update: update // 更新
    }
})
```

场景切换

```
// 场景添加
game.scene.add('home', home)
game.scene.add('loading', loading)

// 通过start可以切换场景
game.scene.start('loading')
```



场景分为preload, create,update

preload资源加载 preload.ts

```
this.load.image('sky', images.sky);
this.load.image('ground', images.ground);
this.load.image('star', images.star);
this.load.spritesheet('dude', images.dude, { frameWidth: 32, frameHeight: 48 });
// 全局属性
 this.$gameData = {
        platforms: '',
        player:'',
        cursors:'',
        stars:''
    } 
```

create初始化世界 create.ts

```

    this.add.image(400, 300, 'sky');

    let platforms = this.$gameData.platforms = this.physics.add.staticGroup()
    // setScale倍数
    platforms.create(400, 568, 'ground').setScale(2);
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    let stars = this.$gameData.stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)); // Bounce弹性系数
    });

    let player = this.$gameData.player = this.physics.add.sprite(100,450,'dude')
    player.setBounce(0.2);
    // 在body中
    player.setCollideWorldBounds(true);
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10, // 10ms间隔播放
        repeat: -1 // 循环
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


	// 碰撞检测
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(player, platforms);
    // 回调函数
    this.physics.add.overlap(player, stars, (player, star)=>{star.disableBody(true, true)}, null, this);

		// 方向键
    this.$gameData.cursors = this.input.keyboard.createCursorKeys();
```

update更新函数 update.ts

```
     let {cursors,player} = this.$gameData
    if (cursors.left.isDown){
        player.setVelocityX(-160);
        player.anims.play('left', true); // 动画播放
    }else if (cursors.right.isDown){
        player.setVelocityX(160);
        player.anims.play('right', true);
    }else{
        player.setVelocityX(0);
        player.anims.play('turn');
    }

	// player.body.touching.down下边碰撞
    if (cursors.up.isDown && player.body.touching.down){
        player.setVelocityY(-330);
    }
```

