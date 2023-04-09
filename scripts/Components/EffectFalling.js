//------------------------------------------------------------------
//
// Creates an exhaust effect used by the SpaceShip when accelerating.
// The spec is defined as:
// {
//        center: { x: , y: },
//        howMany:                 // How many particles to emit
// }
//
//------------------------------------------------------------------
MyGame.components.ParticleSystem.createEffectFalling = function(spec) {
    'use strict';
    let effect = { };
    let addSpeed = 0.0005;

    effect.update = function() {
        for (let particle = 0; particle < spec.howMany; particle += 1) {
            let x = Random.nextGaussian(MyGame.renderer.core.canvas.width/2, 200);
            while (x < MyGame.renderer.core.canvas.width/4 || x > 3 * MyGame.renderer.core.canvas.width/4 || (x > spec.center.x - 37.5 && x < spec.center.x + 37.5)){
                x = Random.nextGaussian(MyGame.renderer.core.canvas.width/2, 100);
            }
            // Create a new falling particle
            MyGame.components.ParticleSystem.createParticle({
                image: MyGame.assets['particle'],
                center: { x: x, y: spec.center.y - 10 },
                size: 10,//Random.nextGaussian(0.010, 0.004),
                direction: { x: 0, y: -10 },
                speed: addSpeed + Random.nextGaussian(0.0003, 0.0001),
                rateRotation: (2 * Math.PI) / 1000,    // Radians per millisecond
                rotation: 0,
                lifetime: Random.nextGaussian(500, 50),
                alive: 0
            });
        }

        return false;    // One time emit!
    };

    return MyGame.components.ParticleSystem.addEffect(effect);
};