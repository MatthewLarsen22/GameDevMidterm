//------------------------------------------------------------------
//
// Defines a base Entity component.
// The spec is defined as:
//    {
//        center: { x: , y: }            // In world coordinates
//   ** Either 'size' or 'radius' must be defined **
//         size: { width: , height: }    // In world coordinates
//         radius:                       // In world coordinates
//        velocity: { x: , y: }          // In world coordinates
//    }
//
//------------------------------------------------------------------
MyGame.components.Entity = function(spec, spriteName) {
    'use strict';
    let sprite = undefined;
    let that = {
        get type() { return MyGame.components.Types.Undefined; },
        get center() { return sprite.center; },
        get sprite() { return sprite; },
        get velocity() { return spec.velocity; }
    };
    let boundingCircle = undefined;

    //
    // An entity may be defined in terms of a rectangular size or a radius.  Depending
    // upon how it is defined, various properties of the entity are defined with respect
    // to their dimensions.
    if (spec.hasOwnProperty('size')) {
        boundingCircle = {
            get center() { return that.center; },
            get radius() { return that.size.width / 2; }
        };

        Object.defineProperty(that, 'size', {
            get: function() { return spec.size; },
            enumerable: true,
            configurable: false
        });

        //
        // Get our sprite model
        sprite = MyGame.components.Sprite({
            image: MyGame.assets[spriteName],
            spriteSize: spec.size,            // Let the sprite know about the size also
            spriteCenter: spec.center        // Maintain the center on the sprite
        });

    } else if (spec.hasOwnProperty('radius')) {
        boundingCircle = {
            get center() { return that.center; },
            get radius() { return that.radius; }
        };

        Object.defineProperty(that, 'radius', {
            get: function() { return spec.radius; },
            enumerable: true,
            configurable: false
        });

        sprite = MyGame.components.Sprite({
            image: MyGame.assets[spec.imageName],
            spriteSize: { width: spec.radius * 2, height: spec.radius * 2 },
            spriteCenter: spec.center    // Maintain the center on the sprite
        });
    } else {
        throw 'Entity does not define either "size" or "radius"';
    }

    Object.defineProperty(that, 'boundingCircle', {
        get: function() { return boundingCircle; },
        enumerable: true,
        configurable: false
    });

    //------------------------------------------------------------------
    //
    // Update the position of the entity based on its current momentum vector.
    //
    //------------------------------------------------------------------
    that.update = function(elapsedTime) {
        sprite.update(elapsedTime);

        return true;
    };

    //------------------------------------------------------------------
    //
    // Check to see if the entity collides with another entity.
    //
    //------------------------------------------------------------------
    that.intersects = function(entity) {
        return MyGame.utilities.math.circleCircleIntersect(entity.boundingCircle, that.boundingCircle);
    }

    //------------------------------------------------------------------
    //
    // Called when another entity gets within the 'vicinity' of this entity.
    //
    //------------------------------------------------------------------
    that.vicinity = function(entity) {
        //
        // Nothing to do here
    };

    //------------------------------------------------------------------
    //
    // Handle the collision behavior of the entity with another entity.
    //
    //------------------------------------------------------------------
    that.collide = function(entity) {
        return true;
    }

    return that;
};
