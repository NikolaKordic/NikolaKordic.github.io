var RPG = RPG || {};

var game = new Phaser.Game(640, 640, Phaser.CANVAS);

game.state.add("BootState", new RPG.BootState());
game.state.add("LoadingState", new RPG.LoadingState());
game.state.add("TitleState", new RPG.TitleState());
game.state.add("WorldState", new RPG.WorldState());
game.state.start("BootState", true, false, "assets/preload/title_screen.json", "TitleState");