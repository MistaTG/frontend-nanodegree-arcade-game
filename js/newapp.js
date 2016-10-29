// Generic Entity Superclass
var Entity = function(x, y, speed, sprite) {
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.sprite = sprite;
};

// Draw the entity on the screen
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check for any Entities coliding with a player will only be called in Enemy subclass
Entity.prototype.checkCollisions = function(player) {
	if (player.x < this.x + 65 &&
        player.x + 70 > this.x &&
        player.y < this.y + 50 &&
        player.y + 70 > this.y) 
        {
        	// Call the player Reset function when a collision happens
	    	Player.prototype.playerReset(player);
        };
};

// Create the player subclass from Entity TODO change the sprite location
var Player = function(x, y, speed, sprite) {
	Entity.call(this, x, y, speed);
	var lives, pScore;
	this.lives = 5;
	this.pScore = 0;
	this.sprite = "images/char-boy.png";
	this.otherSprite = "images/Star.png";
};

// Make a connection to the Entity.prototype object but set the constructor to Player
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

// Calibrate how far the player moves with each keypress
Player.prototype.handleInput = function(allowedKeys) {
	switch (allowedKeys) {
        case 'left':
            this.x = this.x - 100;
            break;
        case 'down':
            this.y = this.y + 80;
            break;
        case 'right':
            this.x = this.x + 100;
            break;
        case 'up':
            this.y = this.y - 80;
            break;
    };
};

// Set limits to where the player can move to
Player.prototype.update = function() {
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    } else if (this.y === 0) {
        this.y = 375;
        this.pScore++;
        ctx.clearRect(0,0,505,100);
        //ctx.drawImage(Resources.get(this.otherSprite), 100, 400);
  //       for (var i = 1; i < 5; i++) {
	 //    	if (this.y === 0) {
	 //    		ctx.drawImage(Resources.get(this.otherSprite), 10, 400);
	 //    	}
		// }
    } else if (this.y < 0) {
        this.y = 0;
    } else if (this.y > 375) {
        this.y = 375;
    };
    
    this.score();
};

// Create a variable that stores the starting player position
Player.prototype.startPos = [200, 375];
var startPos = Player.prototype.startPos;

// Call this when the player collides with an enemy 
// set it back to the starting position
// and decrement/increment the players lives/deaths
Player.prototype.playerReset = function(player) {
	player.x = startPos[0];
	player.y = startPos[1];

	player.lives--;
	//player.pScore++;
	ctx.clearRect(0,0,505,100);
	//console.log(lives);
};

// Paint the canvas with a Lives and Score counter
Player.prototype.score = function() {
	ctx.font = "30pt Arial";
	ctx.fillText("Lives : " + this.lives, 10,45);
	ctx.fillText("Score : " + this.pScore, 300,45);
};

// Create the Enemy subclass from Entity TODO change the sprite location
var Enemy = function(x, y, speed, sprite) {
	Entity.call(this, x, y, speed);
    this.sprite = 'images/enemy-bug.png';
};

// Make a connection to the Entity.prototype object and set the constructor to Enemy
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

// Move the enemys
Enemy.prototype.update = function(dt, speed) {
	// Change its x location to it plus the speed and multiplied by the time delta
	this.x += this.speed * dt;

	// Wrap the enemy back onto the screen after it reaches the end
	if (this.x > 505) {
		this.x = -100;
	};

	// Check the if an enemy collides with a player
	this.checkCollisions(player);
};

// Initialize the Enemys and Players
var allEnemies = [ 
        newEnemy = new Enemy(1, 225, 300), 
        anotherEnemy = new Enemy(1, 135, 200),
        nextEnemy = new Enemy(1, 50, 400)];
var player = new Player(startPos[0], startPos[1], 2);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
