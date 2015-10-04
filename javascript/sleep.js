self.postMessage('READY');
sleep(1000);
self.postMessage('COMPLETED')
function sleep(miliseconds) {
    var startingTime = new Date().getTime();
    var stopTime = startingTime + miliseconds;
    while (stopTime >= new Date().getTime()) { }
}