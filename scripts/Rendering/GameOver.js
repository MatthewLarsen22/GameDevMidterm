// ------------------------------------------------------------------
//
// Rendering function for the time
//
// ------------------------------------------------------------------
MyGame.renderer.GameOver = (function(core) {
    'use strict';
    let that = {};

    that.render = function (){
        core.drawText({
            font: "Arial",
            fill: "#FFFFFF",
            text: "Game Over",
            position: { x: (core.canvas.width / 2), y: (core.canvas.height / 2) }
        });
    }

    return that;
}(MyGame.renderer.core));