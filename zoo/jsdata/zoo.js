var handleCloseCam = function() {
    if (_stream.active) {
        $.each(_stream.getTracks(), function(track) {
            track.stop();
        })

        $('#mentor').attr('src', 'video/thankyou.mp4');
        $('#mentor').get(0).play();
        handleDetectVideoEnd();
    };

}
var handleOpenCam = function() {
    if (!_stream || !_stream.active) {
        getWebCam();
    };
}

var handleDetectVideoEnd = function() {
    document.getElementById('mentor').addEventListener('ended', myHandler, false);

    function myHandler(e) {
        location.href = 'https://tw.yahoo.com/';
    }
}
