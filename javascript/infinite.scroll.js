app.infiniteScroll = app.infiniteScroll = {};

$(function () {
    var $container = $('#infinite-scroll'),
        containerWidth = $container.outerWidth(true),
        containerHeight = $container.outerHeight(true),
        $item = $('#item'),
        firstIndex,
        startIndex = 0,
        itemsNumber = 0,
        numberToTruncate,
        maxItemsNumber,
        
         _getIndicatorSize = function ($indicator) {
            return {
                width: $indicator.outerWidth(true),
                height: $indicator.outerHeight(true)
            };
        },
        
         _getItemsNumber = function (itemWidth, itemHeight) {
            var rows = Math.floor(containerHeight / itemHeight);
            var cols = Math.round(containerWidth / itemWidth);
            return  rows * cols;
         },

        _init = function () {
            var indicatorSize =  _getIndicatorSize($item),
                itemsNumberPerFrame =  _getItemsNumber(indicatorSize.width, indicatorSize.height);
            numberToTruncate = itemsNumberPerFrame;
            maxItemsNumber = itemsNumberPerFrame;

            app.json.getData(itemsNumberPerFrame, startIndex).forEach(function (item) {
                $container.append('<div class="item col-xs-6 col-md-3">' + item.data + '</div>');
            });

            $(window).scrollTop(0);

            startIndex = startIndex + itemsNumberPerFrame;
            itemsNumber = itemsNumber + itemsNumberPerFrame;
            firstIndex = 0;

            setTimeout(function () {
                $(window).on('scroll', function () {
                    var $items;
                    var scrollTop = $(window).scrollTop();

                    if(scrollTop + $(window).height() == $(document).height()) {

                        app.json.getData(itemsNumberPerFrame, startIndex).forEach(function (item) {
                            $container.append('<div class="item col-xs-6 col-md-3">' + item.data + '</div>');
                        });

                        itemsNumber = itemsNumber + itemsNumberPerFrame;
                        startIndex = startIndex + itemsNumberPerFrame;

                        if(itemsNumber >= maxItemsNumber) {
                            $items = $container.find('.item');
                            $items.slice(0, numberToTruncate).remove();
                            itemsNumber = itemsNumber - numberToTruncate;
                            firstIndex = firstIndex + numberToTruncate;
                        }
                        $(window).scrollTop(1);

                    } else if (scrollTop == 0 && firstIndex > 0) {

                        var itemsNumberToPrepend = firstIndex - itemsNumberPerFrame  < 0? firstIndex : itemsNumberPerFrame;
                        firstIndex = firstIndex - itemsNumberPerFrame  < 0? 0 : firstIndex - itemsNumberPerFrame;

                        app.json.getData(itemsNumberToPrepend, firstIndex).reverse().forEach(function (item) {
                            $container.prepend('<div class="item col-xs-6 col-md-3">' + item.data + '</div>');
                        });

                        itemsNumber = itemsNumber + itemsNumberPerFrame;

                        if(itemsNumber >= maxItemsNumber) {
                            $items = $container.find('.item');
                            $items.slice(-numberToTruncate).remove();
                            itemsNumber = itemsNumber - numberToTruncate;
                            startIndex = startIndex - numberToTruncate;
                        }
                        $(window).scrollTop(1);
                    }
                });
            }, 0);
    };

    _init();

});