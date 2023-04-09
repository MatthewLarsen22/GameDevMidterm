// ----------------------------------------------------------------------------
//
// This file contains the main menu including buttons to go to play a new game,
// open the credits page, and display the high scores.
//
// ----------------------------------------------------------------------------

MyGame.screens['main-menu'] = (function(manager) {
    'use strict';

    function initialize() {
        //
        // Setup each of menu events for the screens
        document.getElementById('id-new-game').addEventListener(
            'click',
            function() {manager.showScreen('game-play'); });

        document.getElementById('id-high-scores').addEventListener(
            'click',
            function() { manager.showScreen('high-scores'); });

        document.getElementById('id-credits').addEventListener(
            'click',
            function() { manager.showScreen('credits'); });
    }

    function run() {
        //
        // I know this is empty, there isn't anything to do.
    }

    return {
        initialize : initialize,
        run : run
    };
}(MyGame.manager));
