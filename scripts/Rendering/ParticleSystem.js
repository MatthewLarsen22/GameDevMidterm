// ------------------------------------------------------------------
//
// Rendering function for a /Components/ParticleSystem object.
//
// ------------------------------------------------------------------
MyGame.renderer.ParticleSystem = (function(core) {
    'use strict';
    let that = {};

    // ------------------------------------------------------------------
    //
    // Work through all of the known particles and draw them.
    //
    // ------------------------------------------------------------------
    that.render = function(system) {
        for (let value = 0; value < system.particleCount; value += 1) {
            let particle = system.particles[value];

            core.saveContext();
            core.rotateCanvas(particle.center, particle.rotation);

            //
            // Rendering of animated particles is different from non-animated.
            if (particle.imageSize) {
                core.drawImage(
                    particle.image,
                    particle.imageSize * particle.imageCurrent, 0,
                    particle.imageSize, particle.imageSize,
                    particle.center.x - particle.size / 2,
                    particle.center.y - particle.size / 2,
                    particle.size, particle.size);
            } else {
                core.drawImage(
                    particle.image,
                    particle.center.x - particle.size / 2,
                    particle.center.y - particle.size / 2,
                    particle.size, particle.size);
            }

            core.restoreContext();
        }
    };

    return that;
}(MyGame.renderer.core));
