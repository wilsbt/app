document.onreadystatechange = function() {
    if (document.readyState === "interactive") {
        initApplication();
    }
}

    function initApplication() {
        // set constraints
        var Constraints = { video: { facingMode: "environment" }, audio: false };
        
        //define constaints
        const cameraView = document.querySelector("#camera--view"),
            cameraOutput = document.querySelector("#camera--output"),
            cameraSensor = document.querySelector("#camera--sensor"),
            cameraTrigger = document.querySelector("#camera--trigger");
    

    // access device camera and stream video to cameraView
    function cameraStart() {
        navigator.mediaDevices
            .getUserMedia(Constraints)
            .then(function(stream) {
            //track = stream.getTracks()[0];
            cameraView.srcObject = stream;
            })
        .catch(function(error) {
        console.error("oops. something is broken.", error);
        });
    }

    cameraTrigger.onclick = function() {
        cameraSensor.width = cameraView.videoWidth;
        cameraSensor.height = cameraView.videoHeight;
        cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
        cameraOutput.src = cameraSensor.toDataURL("image/webp");
        cameraOutput.classList.add("taken");
    };

    window.addEventListener("load", cameraStart, false);
}  