// ------------------------------------------------------------------
//
// This namespace provides the core rendering code for the demo.
//
// ------------------------------------------------------------------
MyGame.renderer.core = (function() {
    'use strict';
    let canvas = null;
    let context = null;

    //------------------------------------------------------------------
    //
    // Clear the whole canvas
    //
    //------------------------------------------------------------------
    function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    //------------------------------------------------------------------
    //
    // This provides initialization of the canvas.  From here the various
    // event listeners we care about are prepared, along with setting up
    // the canvas for rendering.
    //
    //------------------------------------------------------------------
    function initialize() {
        canvas = document.getElementById('id-canvas');
        context = canvas.getContext('2d');
    }

    //------------------------------------------------------------------
    //
    // Renders the text based on the provided spec.
    //
    //------------------------------------------------------------------
    function drawText(spec) {
        context.font = spec.font;
        context.fillStyle = spec.fill;
        context.textBaseline = 'top';

        context.fillText(
            spec.text,
            spec.position.x,
            spec.position.y);
    }

    //------------------------------------------------------------------
    //
    // Draw a line segment.
    //
    //------------------------------------------------------------------
    function drawLine(style, pt1, pt2) {
        context.strokeStyle = style;
        context.beginPath();
        context.moveTo(
            0.5 + pt1.x,
            0.5 + pt1.y);
        context.lineTo(
            0.5 + pt2.x,
            0.5 + pt2.y);
        context.stroke();
    }

    //------------------------------------------------------------------
    //
    // Draw a circle.
    //
    //------------------------------------------------------------------
    function drawCircle(style, center, radius) {
        // 0.5, 0.5 is to ensure an actual 1 pixel line is drawn.
        context.strokeStyle = style;
        context.beginPath();
        context.arc(
            0.5  + center.x,
            0.5  + center.y,
            radius,
            0,
            2 * Math.PI);
        context.stroke();
    }

    //------------------------------------------------------------------
    //
    // Draw a filled circle.
    //
    //------------------------------------------------------------------
    function drawFilledCircle(style, center, radius) {
        // 0.5, 0.5 is to ensure an actual 1 pixel line is drawn.
        context.fillStyle = style;
        context.beginPath();
        context.arc(
            0.5 + center.x,
            0.5 + center.y,
            radius,
            0,
            2 * Math.PI);
        context.fill();
    }

    //------------------------------------------------------------------
    //
    // Draws a rectangle.
    //
    //------------------------------------------------------------------
    function drawRectangle(style, left, top, width, height) {
        // 0.5, 0.5 is to ensure an actual 1 pixel line is drawn.
        context.strokeStyle = style;
        context.strokeRect(
            0.5 + left,
            0.5 + top,
            width,
            height);
    }

    //------------------------------------------------------------------
    //
    // Draws a filled rectangle.
    //
    //------------------------------------------------------------------
    function drawFilledRectangle(style, left, top, width, height) {
        // 0.5, 0.5 is to ensure an actual 1 pixel line is drawn.
        context.fillStyle = style;
        context.fillRect(
            0.5 + left,
            0.5 + top,
            width,
            height);
    }

    //------------------------------------------------------------------
    //
    // Pass-through that allows an image to be drawn.
    //
    //------------------------------------------------------------------
    function drawImage() {
        let image = arguments[0],
            sx, sy,
            sWidth, sHeight,
            dx, dy,
            dWidth, dHeight;

        //
        // Figure out which version of drawImage was called and extract the correct values
        if (arguments.length === 5) {
            sx = 0;
            sy = 0;
            sWidth = image.width;
            sHeight = image.height;
            dx = arguments[1];
            dy = arguments[2];
            dWidth = arguments[3];
            dHeight = arguments[4];
        } else if (arguments.length === 9) {
            sx = arguments[1];
            sy = arguments[2];
            sWidth = arguments[3];
            sHeight = arguments[4];
            dx = arguments[5];
            dy = arguments[6];
            dWidth = arguments[7];
            dHeight = arguments[8];
        }

        //
        // Convert from world to pixel coordinates on a few items.  Using
        // floor and ceil to prevent pixel boundary rendering issues.
        context.drawImage(
            image,
            sx, sy,
            sWidth, sHeight,
            dx, dy,
            dWidth, dHeight);
    }

    //------------------------------------------------------------------
    //
    // Simple pass-through to save the canvas context.
    //
    //------------------------------------------------------------------
    function saveContext() {
        context.save();
    }

    //------------------------------------------------------------------
    //
    // Simple pass-through the restore the canvas context.
    //
    //------------------------------------------------------------------
    function restoreContext() {
        context.restore();
    }

    //------------------------------------------------------------------
    //
    // Perform a rotation of the canvas so that the next things rendered
    // will appear as rotated (after the canvas rotation is undone).
    //
    //------------------------------------------------------------------
    function rotateCanvas(center, rotation) {
        context.translate(center.x, center.y);
        context.rotate(rotation);
        context.translate(-(center.x), -(center.y));
    }

    return {
        initialize: initialize,
        clearCanvas: clearCanvas,
        drawText: drawText,
        drawLine: drawLine,
        drawRectangle: drawRectangle,
        drawFilledRectangle: drawFilledRectangle,
        drawCircle: drawCircle,
        drawFilledCircle: drawFilledCircle,
        drawImage: drawImage,
        saveContext: saveContext,
        restoreContext: restoreContext,
        rotateCanvas: rotateCanvas,
        get canvas() { return canvas; },
    };

}());