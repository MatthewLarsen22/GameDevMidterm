// ------------------------------------------------------------------
//
// Rendering function for a /Components/Platform object.
//
// ------------------------------------------------------------------
MyGame.renderer.Platform = (function(core) {
    'use strict';
    let that = {};

    // ------------------------------------------------------------------
    //
    // Renders a Platform model.
    //
    // ------------------------------------------------------------------
    that.render = function(model) {
        core.saveContext();
        let style="#FFAAAA";
        if (model.active){
            style="#FF0000";
        }

        //Draw the left portion of the platform
        core.drawFilledRectangle(
            style,
            core.canvas.width / 4,
            model.gapCenter.y - (model.gapSize.height / 2),
            model.gapCenter.x - (model.gapSize.width / 2) - (core.canvas.width / 4),
            model.gapSize.height
        );

        // Draw the right portion of the platform
       core.drawFilledRectangle(
            style,
            model.gapCenter.x + (model.gapSize.width / 2),
            model.gapCenter.y - (model.gapSize.height / 2),
            (core.canvas.width * 3 / 4) - (model.gapCenter.x + (model.gapSize.width / 2)),
            model.gapSize.height
        );


        // This undoes the rotation very quickly
        core.restoreContext();
    };

    return that;
}(MyGame.renderer.core));