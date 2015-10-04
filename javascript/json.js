app.json = app.json || {};

app.json.getData = function (n, k) {

    var deferred = $.Deferred();
    var worker = new Worker('javascript/sleep.js');

    worker.addEventListener('message', function (e) {
        if (e.data === 'READY') {
            deferred.notify('Worker started');
        } else if(e.data === 'COMPLETED') {
            var json = [],
                j = n + k,
                i;
            for (i = k; i < j; i = i + 1) {
                var item = {};
                item['index'] = i;
                item['data'] = 'JSON data ' + i;
                json.push(item);
            }
            deferred.resolve(json);
            worker.terminate();
        }
    });
    return deferred.promise();
};

