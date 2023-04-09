//------------------------------------------------------------------
//
// Defines a Platform component.
// The spec is defined as:
//    {
//        gapCenter: { x: , y: }          // In world coordinates
//        gapSize: { width: , height: }        // In world coordinates
//        velocity:                         // In world coordinates
//    }
//
//------------------------------------------------------------------
MyGame.components.Platform = function(spec) {
    'use strict';
    let that = {};
    that.gapCenter = spec.gapCenter;
    that.gapSize = spec.gapSize;
    that.velocity = spec.velocity;
    that.active = false;
    that.timeSinceCreation = 0;

    Object.defineProperty(that, 'type', {
        get: function() { return MyGame.components.Types.Platform; },
        enumerable: true,
        configurable: false
    });

    that.update = function(elapsedTime) {
        that.timeSinceCreation += elapsedTime;

        if (!that.active && that.timeSinceCreation > 1250){
            that.active = true;
        }

        if (that.active) {
            that.gapCenter.y += that.velocity / elapsedTime;
            MyGame.components.ParticleSystem.createEffectFalling({
                center: that.gapCenter,
                howMany: 5
            });
        }
    }

    that.isActive = function() {
        return that.active;
    }

    that.age = function() {
        return that.timeSinceCreation;
    }

    return that;
};