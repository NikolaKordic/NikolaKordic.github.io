var RPG = RPG || {};

RPG.Player = function (game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);

    this.anchor.setTo(0.5);

    this.walking_speed =+ properties.walking_speed;

    this.game_state.game.physics.arcade.enable(this);
    this.body.colliderWorldBounds = true;

    this.animations.add("walking_up",[9,10,11,],7,true);
    this.animations.add("walking_down",[0,1,2],7,true);
    this.animations.add("walking_right",[6,7,8],7,true);
    this.animations.add("walking_left",[3,4,5],7,true);

    this.stopped_frames = [0,3,6,9];

    this.moving = {left: false, right:false, up:false, down:false};
};

RPG.Player.prototype = Object.create(RPG.Prefab.prototype);
RPG.Player.prototype.constructor = RPG.Player;

RPG.Player.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.buildings)

    if(this.moving.left && this.body.velocity.x <=0){
        this.body.velocity.x = -this.walking_speed;
        if (this.body.velocity.y ===0){
            this.animations.play("walking_left");
        }
    }else if (this.moving.right && this.body.velocity.x >=0){
        this.body.velocity.x = +this.walking_speed;
        if (this.body.velocity.y ===0){
            this.animations.play("walking_right");
        }
    }
    else{
        this.body.velocity.x = 0;
    }
    if(this.moving.up && this.body.velocity.y <=0){
        this.body.velocity.y = -this.walking_speed;
        if (this.body.velocity.x ===0){
            this.animations.play("walking_up");
        }
    }else if (this.moving.down && this.body.velocity.y >=0){
        this.body.velocity.y = +this.walking_speed;
        if (this.body.velocity.x ===0){
            this.animations.play("walking_down");
        }
    }
    else{
        this.body.velocity.y = 0;
    }
    if (this.body.velocity.x === 0 && this.body.velocity.y ===0){
        this.animations.stop();
        this.frame = this.stopped_frames[this.body.facing];
    }
    RPG.Player.prototype.change_movement = function (direction, move){
        "use strict";
        this.moving [direction] = move;
    }
};