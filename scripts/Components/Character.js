//------------------------------------------------------------------
//
// Defines a Character component.  A Character contains a sprite.
// The spec is defined as:
//    {
//        center: { x: , y: }          // In world coordinates
//        size: { width: , height: }   // In world coordinates
//        velocity: { x: , y: }        // In world coordinates
//    }
//
//------------------------------------------------------------------
MyGame.components.Character = function(spec) {
    'use strict';
    let that = MyGame.components.Entity(spec, 'character');

    Object.defineProperty(that, 'type', {
        get: function() { return MyGame.components.Types.Character; },
        enumerable: true,
        configurable: false
    });

    that.moveLeft = function(elapsedTime) {
        let dx = (elapsedTime / spec.velocity.x )
        if ((that.center.x - dx) > (MyGame.renderer.core.canvas.width / 4) + (that.size.width / 2)){
            that.center.x -= dx;
        }
    }

    that.moveRight = function(elapsedTime) {
        let dx = (elapsedTime / spec.velocity.x )
        if ((that.center.x + dx) < (MyGame.renderer.core.canvas.width * 3 / 4)- (that.size.width / 2)){
            that.center.x += dx;
        }
    }

    return that;
};