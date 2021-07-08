function onTouchStart(e) {
    console.log(e);
    touchX = e.touches[0].clientX; //获取鼠标的X坐标（鼠标与屏幕左侧的距离，单位为px）
    touchY = e.touches[0].clientY; //获取鼠标的Y坐标（鼠标与屏幕顶部的距离，单位为px）
    touchEvent = 'TouchStart';
    updateInfo();
    sendMessage();
}

function onTouchMove(e) {
    touchX = e.touches[0].clientX; //获取鼠标的X坐标（鼠标与屏幕左侧的距离，单位为px）
    touchY = e.touches[0].clientY; //获取鼠标的Y坐标（鼠标与屏幕顶部的距离，单位为px）
    touchEvent = 'TouchMove';
    updateInfo();
    sendMessage();
}

function onTouchEnd(e) {
    touchX = e.changedTouches[0].clientX; //获取鼠标的X坐标（鼠标与屏幕左侧的距离，单位为px）
    touchY = e.changedTouches[0].clientY; //获取鼠标的Y坐标（鼠标与屏幕顶部的距离，单位为px）
    touchEvent = 'TouchEnd';
    updateInfo();
    sendMessage();
}