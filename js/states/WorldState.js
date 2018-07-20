var RPG = RPG || {};

RPG.WorldState = function () {
    "use strict";
    RPG.JSONPreloadState.call(this);

    this.prefab_classes = {
        player: RPG.Player.prototype.constructor,
        door: RPG.Door.prototype.constructor
    };
};

RPG.WorldState.prototype = Object.create(RPG.JSONPreloadState.prototype);
RPG.WorldState.prototype.constructor = RPG.WorldState;

RPG.WorldState.prototype.init = function(level_data){
    "use strict";
    RPG.JSONPreloadState.prototype.init.call(this, level_data);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y =0;
};
RPG.WorldState.prototype.create = function (){
    "use strict";

    this.map = this.game.add.tilemap(this.level_data.map.key);
    var tileset_index = 0;
    this.map.tilesets.forEach(function(tileset){
        this.map.addTilesetImage(tileset.name, this.level_data.map.tilesets[tileset_index]);
        tileset_index += 1;
    },this);

    this.layers = {};
    this.map.layers.forEach(function(layer){
        this.layers[layer.name] = this.map.createLayer(layer.name);
        if(layer.properties.collision){
            this.map.setCollisionByExclusion([-1],true,layer.name);
        }
    },this);
    this.layers[this.map.layer.name].resizeWorld();

    RPG.JSONPreloadState.prototype.create.call(this);

    for( var object_layer in this.map.objects){
        this.map.objects[object_layer].forEach(this.create_object, this);
    }
};

RPG.WorldState.prototype.create_object = function (object){
    "use strict";
    var position = {x: object.x + (object.width / 2), y: object.y + (object.height / 2)};
    var prefab = new this.prefab_classes[object.type](this, object.name, position, object.properties);
};