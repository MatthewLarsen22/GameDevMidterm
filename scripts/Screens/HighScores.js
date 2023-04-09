// ----------------------------------------------------------------------------
//
// This file contains the high scores page. This page will include the top 5
// high scores as well as provide an option for resetting the scores.
//
// ----------------------------------------------------------------------------
MyGame.screens['high-scores'] = (function(manager) {
    'use strict';

    function initialize() {
        let highScores = localStorage.getItem("high-scores");
        if (highScores !== null) {
            highScores = highScores.split(",");
            let listOfScores = document.getElementById('id-high-scores-list');
            for (let i = 0; i < highScores.length; i++){
                let scoreText = document.createTextNode(highScores[i]);
                let listItem = document.createElement("li")
                listItem.appendChild(scoreText);
                listOfScores.appendChild(listItem);
            }
        }

        document.getElementById('id-high-scores-back').addEventListener(
            'click',
            function() { manager.showScreen('main-menu'); });
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