// ------------------------------------------------------------------
//
// Rendering function for a /Components/Text object.
//
// ------------------------------------------------------------------
MyGame.renderer.Text = (function(core) {
    'use strict';
    let that = {};

    that.render = function(text) {
        core.drawText(text);
    };

    return that;
}(MyGame.renderer.core));