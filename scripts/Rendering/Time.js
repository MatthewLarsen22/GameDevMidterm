// ------------------------------------------------------------------
//
// Rendering function for the time
//
// ------------------------------------------------------------------
MyGame.renderer.Time = (function(core) {
    'use strict';
    let that = {};

    that.render = function (time){
        core.drawText({
            font: "Arial",
            fill: "#FFFFFF",
            text: time,
            position: { x: (core.canvas.width * 3 / 4) + 10, y: 10 }
        });
    }

    return that;
}(MyGame.renderer.core));