let websocket = null, ip, port;
let width = window.innerWidth, height = window.innerHeight;
let touchEvent = 'None', touchX = 0, touchY = 0;


// if (typeof console  != "undefined") 
//     if (typeof console.log != 'undefined')
//         console.olog = console.log;
//     else
//         console.olog = function() {};

// console.log = function(message) {
//     console.olog(message);
//     document.getElementById('app').append(message);
// };
// console.error = console.debug = console.info =  console.log


// Get IP and port from localStorage
// if (localStorage.getItem("ip")) {
//     ip = localStorage.getItem("ip");
//     document.getElementById('ip-input').value = ip;
// }
// if (localStorage.getItem("port")) {
//     port = localStorage.getItem("port");
//     document.getElementById('port-input').value = port;
// }

// Resize handler
function onResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    updateInfo();
}

// Disable scrolling
document.body.onselectstart = function () { 
    return false; 
};

document.body.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, {passive: false});


function connectClicked() {
    if (websocket) {
        console.error("Connect button clicked while connected. This is not supposed to happen. What did you do?");
        return;
    }

    document.getElementById('connect').disabled = true;
    document.getElementById('connect').innerHTML = 'Connecting...';

    ip = document.getElementById('ip-input').value;
    port = document.getElementById('port-input').value;

    // localStorage.setItem("ip", ip);
    // localStorage.setItem("port", port);
    
    connect(ip, port);
}



function updateInfo() {
    document.getElementById('address').innerHTML = `Connection: ${ip}:${port}`;
    document.getElementById('size').innerHTML = `Canvas size: ${width} x ${height}`;
    document.getElementById('event').innerHTML = `Touch event: ${touchEvent}`;
    document.getElementById('position').innerHTML = `Touch position: (${Math.round(touchX)}, ${Math.round(touchY)})`;
}

function enableTouchEvents() {
    window.onresize = onResize;
    window.ontouchstart = onTouchStart;
    window.ontouchmove = onTouchMove;
    window.ontouchend = onTouchEnd;
    document.getElementById('overlay').hidden = true;
    updateInfo();
}

function disableTouchEvents() {
    window.onresize = null;
    // document.querySelector('#overlay').hidden = true;
    updateInfo();
}
