$(function () {
    $('#start-worker').click(function () {
        // get promise
        var promise = beginProcessing();

        // register our event handlers
        promise.progress(function (message) {
            // Update the UI for progress
            $('#messages').append('<li>Progress: ' + message + '</li>');
        }).done(function (message) {
            // Update the UI for completion
            $('#messages').append('<li>Completion: ' + message + '</li>');
        });
    });
})

function beginProcessing() {
    // Create deferred object & make sure it's going to be in scope
    var deferred = new $.Deferred();

    // Create our worker (just like before)
    var worker = new Worker('http://s.codepen.io/GeekTrainer/pen/7fef1b0fa330f2d7e8663daec04cb12c.js');

    // Register the message event handler
    worker.addEventListener('message', function (e) {
        // simple messaging - if the worker is ready it'll send a message with READY as the text
        if (e.data === 'READY') {
            // No UI code
            // Progress notification
            deferred.notify('Worker started');

        } else if(e.data === 'COMPLETED') {
            // processing is done
            // No UI code
            // Completed notification
            deferred.resolve('Worker completed');

            worker.terminate();
        }
    });

    return deferred.promise();
}

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

