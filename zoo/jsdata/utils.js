var webcamUtil = (function() {
    var _stream;
    var _constraints = {
        audio: false,
        video: true
    };

    var _getWebCam = function(nodeId) {
        var video = document.getElementById(nodeId);
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia(_constraints, handleVideo, videoError);
        }
        function handleVideo(stream) {
            _stream = stream;
            video.src = window.URL.createObjectURL(stream);
        }
        function videoError(e) {
            alert("something wrong!!");
        }
    }
    return {
        close: function(callback) {
            if (_stream && _stream.active) {
                $.each(_stream.getTracks(), function(index, track) {
                    track.stop();
                })
                //if(callback) callback();
            };
            callback();
        },
        open: function(nodeId) {
            if (!_stream || !_stream.active) {
                _getWebCam(nodeId);
            };
        }
    }
})();

var startCountDown = function(node, second, callback) {
    var _sec = second
    var _doIt = true;
    var _node = node;
    var intervalId = setInterval(function() {
            $(_node).css({
                'display': 'inline-block',
                'vertical-align': 'top',
                'z-index': '9999',
                'margin': '-30px 10px 0 0'
            });
            $(_node).animate({
                opacity: 0.9,
                fontSize: '100pt'
            }, 1000, function() {
                $(_node).css({
                    'opacity': 0,
                    'font-size': '100pt'
                });
                $(_node).text(_sec--);
            })
            if (_sec == -1) {
                clear();
                if(callback) callback();
            }
        }, 10);
    var clear = function () {
        clearInterval(intervalId);
        _node.remove();
        $('.cdContainer').remove();
    }
}

var handlePlayVideo = function () {
    if($('#mentor').length > 0){
        $('#mentor').get(0).play();
    }
}
