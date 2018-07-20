var RPG = RPG || {};

RPG.JSONPreloadState = function () {
    "use strict";
    Phaser.State.call(this);
};

RPG.JSONPreloadState.prototype = Object.create(Phaser.State.prototype);
RPG.JSONPreloadState.prototype.constructor = RPG.JSONPreloadState;

RPG.JSONPreloadState.prototype.init = function (level_data) {
    "use strict";
    this.level_data = level_data;
};

RPG.JSONPreloadState.prototype.create = function () {
    "use strict";
    this.groups = {};
    this.level_data.groups.forEach(function (group_name) {
        this.groups[group_name] = this.game.add.group();
    }, this);

    this.prefabs = {};
    for (var prefab_name in this.level_data.prefabs) {
        var prefab_data = this.level_data.prefabs[prefab_name];
        if (this.prefab_classes.hasOwnProperty(prefab_data.type)) {
            var prefab = new this.prefab_classes[prefab_data.type](this, prefab_name, prefab_data.position, prefab_data.properties);
        }
    }
    this.user_input = this.game.plugins.add(RPG.UserInput, this);
    this.user_input_data = JSON.parse(this.game.cache.getText("user_input"));
    this.user_input.set_input(this.user_input_data);
};