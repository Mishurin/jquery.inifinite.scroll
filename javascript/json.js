app.json = app.json || {};

app.json.getData = function (n, k) {
    var json = [],
        j = n + k,
        i;
    for (i = k; i < j; i = i + 1) {
        var item = {};
        item['index'] = i;
        item['data'] = 'JSON data ' + i;
        json.push(item);
    }

    return json;
};

