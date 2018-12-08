// alternative to DOMContentLoaded
document.onreadystatechange = function () {
    if (document.readyState === "interactive") {
        initApplication();
    }
}
///////////////////////// initApplication() function //////////////////////////////////
function initApplication() {
    let canvasObj;
    let dndcanvas = document.getElementById("dndcanvas");
    let context = dndcanvas.getContext('2d');

    function initCanvas() {
        //Initialise array
        canvasObj = { x: 50, y: 50, w: 30, h: 30 };

        dndcanvas.width = window.innerWidth;
        dndcanvas.height = 200;
        dndcanvas.addEventListener("touchmove", function () {
            var touch = event.targetTouches[0];
            var offset = getOffset(dndcanvas);
            if (detectHit(canvasObj.x, canvasObj.y, touch.pageX - offset.left, touch.pageY - offset.top, canvasObj.w, canvasObj.h)) {
                canvasObj.x = touch.pageX - offset.left;
                canvasObj.y = touch.pageY - offset.top;
                reDraw();
            }
            event.preventDefault();
        }, false);

        reDraw();
    }//end initCanvas()
    initCanvas();
    function reDraw() {
        //clear canvas
        context.clearRect(0, 0, dndcanvas.width, dndcanvas.height);

        context.fillStyle = 'blue';
        context.fillRect(canvasObj.x-15, canvasObj.y-15, canvasObj.w, canvasObj.h);
    }//end redraw()
    function detectHit(x1, y1, x2, y2, w, h) {
        //Very simple detection here
        if (x2 - x1 > w) return false;
        if (y2 - y1 > h) return false;
        console.log('hit');
        return true;
    }

    //helper method to find offset of canvas from 0,0
    function getOffset(obj) {
        var offsetLeft = 0;
        var offsetTop = 0;
        do {
            if (!isNaN(obj.offsetLeft)) {
                offsetLeft += obj.offsetLeft;
            }
            if (!isNaN(obj.offsetTop)) {
                offsetTop += obj.offsetTop;
            }
        } while (obj = obj.offsetParent);
        return { left: offsetLeft, top: offsetTop };
    }

    initCanvas();

}//end function initApplication()
