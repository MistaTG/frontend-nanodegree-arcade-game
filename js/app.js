// Enemies our player must avoid
var Enemy = function(x ,y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // TODO make the speed random
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.checkCollisions = function(player) {
// Check if a player is colliding with any side of the enemy
    if (player.x < this.x + 75 &&
        player.x + 65 > this.x &&
        player.y < this.y + 50 &&
        player.y + 70 > this.y) { // TODO make a reset method
        player.x = 200;
        player.y = 375;
    };
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, speed) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Re-Map the enemys back to loop around again
    if (this.x > 505) {
        this.x = -100;
    };

    this.checkCollisions(player);
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x ,y) {
    this.x = x;
    this.y = y;
    this.speed = 2;
    this.sprite = "images/char-boy.png";
};

Player.prototype.update = function() {
// Make the player move and the area to reset it to
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    } else if (this.y === 0) {
        this.y = 375;
    } else if (this.y < 0) {
        this.y = 0;
    } else if (this.y > 375) {
        this.y = 375;
    };
};

Player.prototype.handleInput = function(allowedKeys) {
// Calibrate how far the player moves with each keypress
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

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [ 
        newEnemy = new Enemy(1, 225, 300), 
        anotherEnemy = new Enemy(1, 135, 200),
        nextEnemy = new Enemy(1, 50, 400)];
var player = new Player(200, 375);

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
