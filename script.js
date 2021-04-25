var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#f9f9f9',
    physics:{
      default: 'arcade',
      arcade: {
        gravity: {
          y : 1000
        },
        debug:false
      }
    },
    
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
  //load and create images and sprites
  //images cannot animate like sprites
  this.load.image('player', 'assets/images/chick.png');
}

function create ()
{
  //set controls
  this.keys = {
    'w' : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
    'a' : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
    's' : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
    'd' : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
  };
  //this.player = this.physics.add(x, y, image);
  //this.player.setScale(0.25);
  this.player = this.physics.add.image(200, 200, 'player');
  this.player.setScale(0.15);
  this.player.setCollideWorldBounds(true);
  this.player.jumpTimer = 200;
  
  this.player.xVel = 0;
  this.player.MAX_SPEED = 300;

  //the playforms
  this.platforms = this.physics.add.staticGroup();
  var ground = this.add.rectangle(config.width/2, config.height-10,config.width, 50,  0x11cc66);
  this.platforms.add(ground);
  var rect = this.add.rectangle(400, 400, 250, 50, 0x11cc66);
  this.platforms.add(rect);
 
  
  this.player.setBounce(0.2);
  this.player.setCollideWorldBounds(true);
  this.physics.add.collider(this.player, this.platforms);
}

function update (){
  let player = this.player;
  player.xVel = 0;
  if (this.keys.a.isDown){
    player.xVel -= this.player.MAX_SPEED;
    player.flipX = false;
  }
  else if (this.keys.d.isDown){
    player.xVel += this.player.MAX_SPEED;
    player.flipX = true;
  }
  
  player.setVelocityX(this.player.xVel);
  console.log(player.body.touching.down);
  if (this.keys.w.isDown && player.body.touching.down){
    player.setVelocityY(-800);
    //player.jumpTimer = 0;
  }
  else{
    //this.player.jumpTimer++;
  }
}
