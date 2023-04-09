let MyGame = {
    screens : {},
    input: {},
    components: {},
    renderer: {},
    utilities: {},
    assets: {}
};

//------------------------------------------------------------------
//
// Purpose of this code is to bootstrap (maybe I should use that as the name)
// the rest of the application.  Only this file is specified in the index.html
// file, then the code in this file gets all the other code and assets
// loaded.
//
//------------------------------------------------------------------
MyGame.loader = (function() {
    'use strict';

    let assetOrder = [{
        key: 'character',
        source: './assets/graphics/spritesheet-smolangryboi-0.png'
    }, {
        key: 'background-left',
        source: './assets/graphics/background-left.png'
    }, {
        key: 'background-center',
        source: './assets/graphics/background-center.jpg'
    }, {
        key: 'background-right',
        source: './assets/graphics/background-right.png'
    }, {
        key: 'particle',
        source: './assets/graphics/particle.png'
    }, {
        key: 'audio-music-background',
        source: './assets/audio/Eggsplosion.mp3'
    }];


    //------------------------------------------------------------------
    //
    // Helper function used to load assets in the order specified by the
    // 'assets' parameter.  'assets' expects an array of objects with
    // the following format...
    //    {
    //        key: 'asset-1',
    //        source: 'asset/url/asset.png'
    //    }
    //
    // onSuccess is invoked per asset as: onSuccess(key, asset)
    // onError is invoked per asset as: onError(error)
    // onComplete is invoked once per 'assets' array as: onComplete()
    //
    function loadAssets(assets, onSuccess, onError, onComplete) {
        //
        // When we run out of things to load, that is when we call onComplete.
        if (assets.length > 0) {
            let entry = assets[0];
            loadAsset(entry.source,
                function(asset) {
                    onSuccess(entry, asset);
                    assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                },
                function(error) {
                    onError(error);
                    assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                });
        } else {
            onComplete();
        }
    }

    //------------------------------------------------------------------
    //
    // This function is used to asynchronously load image and audio assets.
    // On success the asset is provided through the onSuccess callback.
    // Reference: http://www.html5rocks.com/en/tutorials/file/xhr2/
    //
    //------------------------------------------------------------------
    function loadAsset(source, onSuccess, onError) {
        let fileExtension = source.substr(source.lastIndexOf('.') + 1);    // Source: http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript

        if (fileExtension) {
            let asset = null;
            if (fileExtension === 'png' || fileExtension === 'jpg') {
                asset = new Image();
                asset.src = source;
                asset.type = "image";
                asset.onload = function() {
                    asset.ready = true;
                    if (onSuccess) { onSuccess(asset); }
                };
            } else if (fileExtension === 'mp3') {
                asset = new Audio();
                asset.src = source;
                asset.type = "audio";
                asset.oncanplaythrough = function() {
                    asset.ready = true;
                    if (onSuccess) { onSuccess(asset); }
                };
            } else if (fileExtension === 'txt') {
                // if (onSuccess) { onSuccess(xhr.responseText); }
            }
            else {
                if (onError) { onError('Unknown file extension: ' + fileExtension); }
            }
        } else {
            if (onError) { onError('Unknown file extension: ' + fileExtension); }
        }
    }

    //------------------------------------------------------------------
    //
    // Called when all the scripts are loaded, it kicks off the demo app.
    //
    //------------------------------------------------------------------
    function mainComplete() {
        console.log('it is all loaded up');
        //MyGame.manager.initialize();
    }

    //
    // Start with loading the assets, then the scripts.
    console.log('Starting to dynamically load project assets');
    loadAssets(assetOrder,
        function(source, asset) {    // Store it on success
            MyGame.assets[source.key] = asset;
        },
        function(error) {
            console.log(error);
        },
        function() {
            console.log('All assets loaded');
        }
    );

}());