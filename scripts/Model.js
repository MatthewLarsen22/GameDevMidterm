// ------------------------------------------------------------------
//
// This namespace holds the rotate to point demo model.
//
// ------------------------------------------------------------------
MyGame.model = (function(input, components, renderer, assets) {
    'use strict';
    let background = null;
    let character = null;
    let characterHandlerIds = undefined;
    let nextEntityId = 0;
    let entities = {};
    let nextPlatformId = 0;
    let platforms = [];
    let lastPlatformPosition = null;
    let myKeyboard = input.Keyboard();
    let elapsedGameTime = 0;
    let elapsedGameTimeStr = "00:00.000";

    let gameOver = false;

    // ------------------------------------------------------------------
    //
    // Unregister the various keyboard events.
    //
    // ------------------------------------------------------------------
    function unregisterCharacterKeyboardEvents() {
        for (let item in characterHandlerIds) {
            if (characterHandlerIds.hasOwnProperty(item)) {
                let entry = characterHandlerIds[item];
                myKeyboard.unregisterHandler(entry.key, entry.handlerId);
            }
        }
    }

    // ------------------------------------------------------------------
    //
    // Register the various keyboard events.
    //
    // ------------------------------------------------------------------
    function registerCharacterKeyboardEvents(character) {
        let handlerIds = [];
        let handlerId;

        handlerId = myKeyboard.registerHandler(function(elapsedTime) {
            character.moveLeft(elapsedTime);
        }, 'a', true);
        handlerIds.push({ key: 'a', handlerId: handlerId });

        handlerId = myKeyboard.registerHandler(function(elapsedTime) {
            character.moveRight(elapsedTime);
        }, 'd', true);
        handlerIds.push({ key: 'd', handlerId: handlerId });

        handlerId = myKeyboard.registerHandler(function(elapsedTime) {
            character.moveLeft(elapsedTime);
        }, 'ArrowLeft', true);
        handlerIds.push({ key: 'ArrowLeft', handlerId: handlerId });

        handlerId = myKeyboard.registerHandler(function(elapsedTime) {
            character.moveRight(elapsedTime);
        }, 'ArrowRight', true);
        handlerIds.push({ key: 'ArrowRight', handlerId: handlerId });

        return handlerIds;
    }

    function createPlatform() {
        let newPlatformPosition = MyGame.utilities.math.randomNumber(lastPlatformPosition, 75, .15, .75, (renderer.core.canvas.width / 4) + 10, (renderer.core.canvas.width * 3 / 4) - 10);
        let platform = components.Platform({
            gapCenter: { x: newPlatformPosition, y: 15 },
            gapSize: { width: 75, height: 12 },
            velocity: 20
        });
        platforms[nextPlatformId++] = {
            model: platform,
            renderer: renderer.Platform
        };
        lastPlatformPosition = newPlatformPosition;
    }

    function checkForCollision() {
        for (let platformId in platforms){
            if(platforms.hasOwnProperty(platformId)) {
                let platform = platforms[platformId];
                let platformBottom = platform.model.gapCenter.y + (platform.model.gapSize.height / 2);
                let platformTop = platform.model.gapCenter.y - (platform.model.gapSize.height / 2);
                let characterTop = character.center.y - (character.size.height / 2);
                let characterBottom = character.center.y + (character.size.height / 2);

                // The platform is within reach of the character potentially
                if (platformBottom > characterTop && platformTop < characterBottom) {
                    let gapRight = platform.model.gapCenter.x + (platform.model.gapSize.width / 2);
                    let gapLeft = platform.model.gapCenter.x - (platform.model.gapSize.width / 2);
                    let characterRight = character.center.x + (character.size.width / 2);
                    let characterLeft = character.center.x - (character.size.width / 2);
                    if (characterLeft < gapLeft || characterRight > gapRight) {
                        gameOver = true;
                        //
                        let highScores = localStorage.getItem("high-scores");
                        if (highScores !== null) {
                            let listOfScores = highScores.split(",");
                            if (listOfScores.length < 5){
                                localStorage.setItem("high-scores", highScores + "," + Math.floor(elapsedGameTime).toString());
                            }
                            else {
                                let minIndex = 0;
                                for (let i = 1; i < 5; i++){
                                    if (parseInt(listOfScores[i]) < parseInt(listOfScores[minIndex])) {
                                        minIndex = i;
                                    }
                                }

                                if (Math.floor(elapsedGameTime) > parseInt(listOfScores[minIndex])){
                                    listOfScores.splice(minIndex, 1);
                                    highScores = "";
                                    for (let i = 0; i < listOfScores.length; i++){
                                        highScores = highScores + listOfScores[i] + ",";
                                    }
                                    highScores = highScores + Math.floor(elapsedGameTime).toString();
                                    localStorage.setItem("high-scores", highScores);
                                }
                            }
                        }
                        else {
                            localStorage.setItem("high-scores", Math.floor(elapsedGameTime).toString());
                        }
                    }

                }
            }
        }
    }

    function updateElapsedGameTime(elapsedTime) {
        elapsedGameTime += elapsedTime;
        let millis = Math.floor(elapsedGameTime % 1000);
        let mins = Math.floor(elapsedGameTime / (60 * 1000));
        let secs = Math.floor((elapsedGameTime / 1000) - (mins * 60));

        // elapsedGameTimeStr = millis.toString();
        millis = millis.toString();

        if (millis < 10){
            millis = "00" + millis.toString();
        }
        else if (millis < 10) {
            millis = "0" + millis.toString();
        }
        else {
            millis = millis.toString();
        }

        if (secs < 10){
            secs = "0" + secs.toString();
        }
        else {
            secs = secs.toString();
        }


        if (mins < 10){
            mins = "0" + mins.toString();
        }
        else {
            mins = mins.toString();
        }

        elapsedGameTimeStr = mins + ":" + secs + ":" + millis;
    }

    // ------------------------------------------------------------------
    //
    // This function initializes the model.
    //
    // ------------------------------------------------------------------
    function initialize() {
        // let backgroundKey = 'background';
        //
        // // Define the TiledImage model we'll be using for our background.
        // background = components.TiledImage({
        //     pixel: { width: assets[backgroundKey].width, height: assets[backgroundKey].height },
        //     size: { width: world.width, height: world.height },
        //     tileSize: assets[backgroundKey].tileSize,00
        //     assetKey: backgroundKey
        // });

        //
        // Get our spaceship model and renderer created
        character = components.Character({
            size: { width: 20, height: 20 },
            center: { x: (renderer.core.canvas.width / 2), y: (renderer.core.canvas.height - 20) },
            velocity: { x: 5, y: 0 }
        });
        entities[nextEntityId++] = {
            model: character,
            renderer: renderer.Character
        };
        characterHandlerIds = registerCharacterKeyboardEvents(character);

        lastPlatformPosition = renderer.core.canvas.width / 2;

        // Start the background music.
        MyGame.assets['audio-music-background'].loop = true;
        MyGame.assets['audio-music-background'].volume = 0.5;
        MyGame.assets['audio-music-background'].play();
    }

    // ------------------------------------------------------------------
    //
    // Process all input for the model here.
    //
    // ------------------------------------------------------------------
    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    // ------------------------------------------------------------------
    //
    // This function is used to update the state of the demo model.
    //
    // ------------------------------------------------------------------
    function update(elapsedTime) {
        if (!gameOver) {
            updateElapsedGameTime(elapsedTime);
            platforms = platforms.filter(platform => platform.model.age() < 10000);

            for (let platformId in platforms) {
                if (platforms.hasOwnProperty(platformId)) {
                    let platform = platforms[platformId];
                    platform.model.update(elapsedTime);
                }
            }

            if (platforms.length === 0 || platforms[platforms.length - 1].model.isActive()) {
                createPlatform();
            }
            checkForCollision();
        }

        components.ParticleSystem.update(elapsedTime);
    }

    // ------------------------------------------------------------------
    //
    // This function renders the demo model.
    //
    // ------------------------------------------------------------------
     function render(elapsedTime) {
        renderer.Time.render(elapsedGameTimeStr);

        for (let entityId in entities) {
            if(entities.hasOwnProperty(entityId)) {
                let entity = entities[entityId];
                entity.renderer.render(entity.model, elapsedTime);
            }
        }

         for (let platformId in platforms) {
             if(platforms.hasOwnProperty(platformId)) {
                 let platform = platforms[platformId];
                 platform.renderer.render(platform.model, elapsedTime);
             }
         }

        renderer.ParticleSystem.render(components.ParticleSystem);
         if (gameOver){
             renderer.GameOver.render();
         }
    }

    function reset() {
        MyGame.assets['audio-music-background'].pause();
        MyGame.assets['audio-music-background'].currentTime = 0;

        background = null;
        character = null;
        characterHandlerIds = undefined;
        nextEntityId = 0;
        entities = {};
        nextPlatformId = 0;
        platforms = [];
        lastPlatformPosition = renderer.core.canvas.width / 2;
        myKeyboard = input.Keyboard();
        elapsedGameTime = 0;
        elapsedGameTimeStr = "00:00.000";

        unregisterCharacterKeyboardEvents();
    }

    return {
        initialize: initialize,
        processInput: processInput,
        update: update,
        render: render,
        reset: reset
    };

}(MyGame.input, MyGame.components, MyGame.renderer, MyGame.assets));