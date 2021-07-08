let websocket = null, ip, port;
let width = window.innerWidth, height = window.innerHeight;
let touchEvent = 'None', touchX = 0, touchY = 0;

// Get IP and port from localStorage
if (localStorage.getItem("ip")) {
    ip = localStorage.getItem("ip");
    document.querySelector('#popup #ip').value = ip;
}
if (localStorage.getItem("port")) {
    port = localStorage.getItem("port");
    document.querySelector('#popup #port').value = port;
}

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
        console.error("Connent button clicked while connected. This is not supposed to happen. What did you do?");
        return;
    }

    document.querySelector('#popup button').disabled = true;
    document.querySelector('#popup button').innerHTML = 'Connecting...';

    ip = document.querySelector('#popup #ip').value;
    port = document.querySelector('#popup #port').value;

    localStorage.setItem("ip", ip);
    localStorage.setItem("port", port);

    connect(ip, port);
}



function updateInfo() {
    document.querySelector('#touch #address').innerHTML = `Connection: ${ip}:${port}`;
    document.querySelector('#touch #size').innerHTML = `Canvas size: ${width} x ${height}`;
    document.querySelector('#touch #event').innerHTML = `Touch event: ${touchEvent}`;
    document.querySelector('#touch #position').innerHTML = `Touch position: (${Math.round(touchX)}, ${Math.round(touchY)})`;
}

function enableTouchEvents() {
    window.onresize = onResize;
    window.ontouchstart = onTouchStart;
    window.ontouchmove = onTouchMove;
    window.ontouchend = onTouchEnd;
    document.querySelector('#overlay').hidden = true;
    updateInfo();
}

function disableTouchEvents() {
    window.onresize = null;
    // document.querySelector('#overlay').hidden = true;
    updateInfo();
}

