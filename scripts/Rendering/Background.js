// ------------------------------------------------------------------
//
// Rendering function for the background
//
// ------------------------------------------------------------------
MyGame.renderer.core.drawBackground = function() {
    'use strict';
    let core = MyGame.renderer.core;

    core.drawImage(
        MyGame.assets['background-left'],
        0,
        0,
        core.canvas.width / 2, core.canvas.height);

    core.drawImage(
        MyGame.assets['background-right'],
        core.canvas.width / 2,
        0,
        core.canvas.width / 2, core.canvas.height);

    core.drawImage(
        MyGame.assets['background-center'],
        core.canvas.width / 4,
        0,
        core.canvas.width / 2, core.canvas.height);
};