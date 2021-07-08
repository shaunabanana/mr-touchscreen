function connect(ip, port) {
    websocket = new WebSocket(`ws://${ip}:${port}`);
    websocket.onopen = enableTouchEvents;
    websocket.onclose = handleDisconnect;
    websocket.onerror = handleDisconnect;
}

function sendMessage() {
    if (!websocket) return;
    var message = {
        eventType: touchEvent,
        x: Math.round(touchX),
        y: Math.round(touchY)
    };
    websocket.send(JSON.stringify(message));
}

function handleDisconnect() {
    if (websocket) {
        websocket = null;
        setTimeout(function () {
            connect(ip, port);
        }, 1000);
    }
}