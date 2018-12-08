
document.onreadystatechange = function () {
    if (document.readyState === "interactive") {
        initApplication();
    }
}
///////////////////// initApplication() function /////////////////////////
function initApplication() {
    let canvasObj;
    let dndcanvas = document.getElementById("dndcanvas");
    let context = dndcanvas.getContext('2d');

    function initCanvas() {
        //intitialise array
        canvasObj = { x: 50, y: 50, w: 30, h: 30 };

        dndcanvas.width = window.innerWidth;
        dndcanvas.height = 200;
        dndcanvas.addEventListener("touchmove", function() {
            var touch = event.targetTouches[0];
            //var offset = getOffset(dndcanvas);
            if (detectHit(canvasObj.x, canvasObj.y, touch.pageX, touch.pageY, canvasObj.w, canvasObj.h)) {
                canvasObj.x = touch.pageX;
                canvasObj.y = touch.pageY;
                reDraw();
            }
            event.preventDefault();
        }, false);

        reDraw();
    }//end initCanvas();
    initCanvas();
    function reDraw() {
        //clear canvas
        context.clearRect(0, 0, dndcanvas.width, dndcanvas.height);

        context.fillStyle = 'blue';
        context.fillRect(canvasObj.x, canvasObj.y, canvasObj.w, canvasObj.h);
    }//end reDraw();
    function detectHit(x1, y1, x2, y2, w, h) {
        //very simple detection here
        if (x1 - x2 > w) return false;
        if (y2 - y1 > h) return false;
        console.log('hit');
        return true;
    }
}

///////////////////// 