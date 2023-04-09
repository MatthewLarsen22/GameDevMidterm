// ----------------------------------------------------------------------------
//
// This file contains the main game loop as well as the processInput, update,
// and render functions. It is responsible for the core of the game and is only
// used when the user presses the new game button on the main menu.
//
// ----------------------------------------------------------------------------
MyGame.screens['game-play'] = (function(manager, input, renderer, components, model) {
    'use strict';

    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;

    let myKeyboard = input.Keyboard();
    let inputIds = {};

    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
        model.processInput(elapsedTime);
    }

    function update(elapsedTime) {
        model.update(elapsedTime);
    }

    function render(elapsedTime) {
        renderer.core.clearCanvas();
        renderer.core.saveContext();
        renderer.core.drawBackground();
        model.render(elapsedTime);
        renderer.core.restoreContext();
    }

    function gameLoop(time) {
        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;

        processInput(elapsedTime);
        update(elapsedTime);
        render(elapsedTime);

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    function initialize() {
    }

    function unregisterInputs() {
        myKeyboard.unregisterHandler('Escape', inputIds['Escape']);
        model.reset();
    }

    function registerInputs() {
        inputIds['Escape'] = myKeyboard.registerHandler(function() {
            //
            // Stop the game loop by canceling the request for the next animation frame
            cancelNextRequest = true;
            unregisterInputs();
            //
            // Then, return to the main menu
            manager.showScreen('main-menu');
        }, 'Escape', false);
    }

    function run() {
        renderer.core.initialize();
        model.initialize();
        registerInputs();

        lastTimeStamp = performance.now();
        cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
    }

    return {
        initialize : initialize,
        run : run
    };

}(MyGame.manager, MyGame.input, MyGame.renderer, MyGame.components, MyGame.model));