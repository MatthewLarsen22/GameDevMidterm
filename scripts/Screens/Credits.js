// ----------------------------------------------------------------------------
//
// This file contains the credits page. It should include information such as
// the developer and the instructor as well as any citations necessary for the
// music and textures that I am using.
//
// ----------------------------------------------------------------------------
MyGame.screens['credits'] = (function(manager) {
    'use strict';

    function initialize() {
        document.getElementById('id-credits-back').addEventListener(
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
