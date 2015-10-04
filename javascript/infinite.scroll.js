app.infiniteScroll = app.infiniteScroll = {};

$(function () {
    var $container = $('#infinite-scroll'),
        containerWidth = $(window).outerWidth(true),
        containerHeight = $(window).outerHeight(true),
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
            return  Math.ceil((containerWidth * containerHeight) / (itemWidth * itemHeight));
         },

        _init = function () {
            var indicatorSize =  _getIndicatorSize($item),
                itemsNumberPerFrame =  _getItemsNumber(indicatorSize.width, indicatorSize.height);
            numberToTruncate = itemsNumberPerFrame * 2;
            maxItemsNumber = itemsNumberPerFrame * 3;

            app.json.getData(itemsNumberPerFrame, startIndex).forEach(function (item) {
                $container.append('<div class="item col-xs-6 col-md-3">' + item.data + '</div>');
            });

            startIndex = startIndex + itemsNumberPerFrame;
            itemsNumber = itemsNumber + itemsNumberPerFrame;
            firstIndex = 0;

            setTimeout(function () {
                $(window).on('scroll', function () {
                    var $items;
                    var scrollTop = $(window).scrollTop();
                    if(scrollTop + $(window).height() == $(document).height()) {

                        if(itemsNumber > maxItemsNumber) {
                            $items = $container.find('.item');
                            $items.slice(0, numberToTruncate).remove();
                            itemsNumber = itemsNumber - numberToTruncate;
                            firstIndex = firstIndex + numberToTruncate;
                            console.log('First', firstIndex);
                        }

                        app.json.getData(itemsNumberPerFrame, startIndex).forEach(function (item) {
                            $container.append('<div class="item col-xs-6 col-md-3">' + item.data + '</div>');
                        });

                        itemsNumber = itemsNumber + itemsNumberPerFrame;
                        startIndex = startIndex + itemsNumberPerFrame;

                    } else if (scrollTop == 0 && firstIndex > 0) {

                        if(itemsNumber > maxItemsNumber) {
                            $items = $container.find('.item');
                            $items.slice(-numberToTruncate).remove();
                            itemsNumber = itemsNumber - numberToTruncate;
                            startIndex = startIndex - numberToTruncate;
                        }

                        var itemsNumberToPrepend = firstIndex - itemsNumberPerFrame  < 0? firstIndex : itemsNumberPerFrame;
                        firstIndex = firstIndex - itemsNumberPerFrame  < 0? 0 : firstIndex - itemsNumberPerFrame;

                        app.json.getData(itemsNumberToPrepend, firstIndex).reverse().forEach(function (item) {
                            $container.prepend('<div class="item col-xs-6 col-md-3">' + item.data + '</div>');
                        });

                        $(window).scrollTop(5);

                        itemsNumber = itemsNumber + itemsNumberPerFrame;
                    }
                });
            }, 0);
    };

    _init();

});