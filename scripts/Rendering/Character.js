// ------------------------------------------------------------------
//
// Rendering function for a /Components/SpaceShip object.
//
// ------------------------------------------------------------------
MyGame.renderer.Character = (function(core) {
    'use strict';
    let that = {};

    // ------------------------------------------------------------------
    //
    // Renders a Character model.  Because the model can be rotated, that needs
    // to be done here, because the underlying sprite doesn't know
    // anything about orientation.
    //
    // ------------------------------------------------------------------
    that.render = function(model) {
        core.saveContext();
        core.rotateCanvas(model.center, model.orientation);

        MyGame.renderer.Sprite.render(model.sprite);

        // This undoes the rotation very quickly
        core.restoreContext();
    };

    return that;
}(MyGame.renderer.core));