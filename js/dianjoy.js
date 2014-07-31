/**
 * Created by admin on 2014/7/25.
 */
$(function () {
    var boo = true,
        h = $('#front').height();

    $('#front').on({
            touchstart: function () {
                var touch = event.touches[0];
                startY = touch.pageY;
                boo = true;
                if ($('#front').hasClass('transition')) {
                    $(this).removeClass('transition')
                }
            },
            touchmove: function (e) {
                e.preventDefault();
                var touch = event.touches[0];
                endY = touch.pageY;
                boo = false;
                if (endY < startY) {
                    $('#front').css('-webkit-transform', 'translate(0,' + (endY - startY) + 'px)')
                }
            },
            touchend: function () {
                if (!boo) {
                    if (startY - endY > h / 4) {
                        $('#front').addClass('transition').css(
                            '-webkit-transform', 'translate(0,-' + h + 'px)'
                        );
                        setTimeout(function () {
                            animation();
                        }, 500);
                    }
                    else {
                        $('#front').addClass('transition').css(
                            '-webkit-transform', 'translate(0,0)'
                        );
                    }
                }
            }
        }
    );
    $('#end').on({
        touchstart: function () {
            var touch = event.touches[0];
            startY = touch.pageY;
            boo = true;
            if ($('#front').hasClass('transition')) {
                $('#front').removeClass('transition')
            }

        },
        touchmove: function (e) {
            e.preventDefault();
            var touch = event.touches[0];
            endY = touch.pageY;
            boo = false;
            if (endY > startY) {
                $('#front').css('-webkit-transform', 'translate(0,' + (endY - h - startY) + 'px)')
            }
        },
        touchend: function () {
            if (!boo) {
                if (endY - startY > h / 2) {
                    $('#front').addClass('transition').css({
                        '-webkit-transform': 'translate(0,0)'
                    })
                }
                else {
                    $('#front').addClass('transition').css({
                        '-webkit-transform': 'translate(0,-' + h + 'px)'
                    });
                }
            }
        }
    });
    $('.next').click(function () {
        $('#front').addClass('transition').css('-webkit-transform', 'translate(0,-' + h + 'px)');
        $('#scroller').css('zIndex', '1');
        setTimeout(function () {
            animation();
        }, 500);
    });
    $('.up').click(function () {
        $('#front').addClass('transition').css('-webkit-transform', 'translate(0,0)')
    });
    $('.join').click(function () {
        $(this).addClass('scale0');
        setTimeout(function () {
            $('.content').hide().next().show(500);
            $('.join').removeClass('scale0')
        }, 300);

    });
    $('.close').click(function (e) {
        e.stopPropagation();
        $('.form').hide().prev().show();
    });
    $('.form').on('submit', function (e) {
        $('input', this).each(function () {
            if ($(this).val() == '') {
                $(this).focus();
                e.preventDefault();
                return false;
            }
        });
    });
    $('.eight').on('click', function () {
        $(this).toggleClass('clicked');
        if ($(this).hasClass('clicked')) {
            $('.mapup').css('webkitTransform', 'translate(0,-45%)');
            setTimeout(function () {
                $('#map').toggle().toggleClass('map1');
            }, 1000)
        } else {
            $('#map').toggle().toggleClass('map1');
            $('.mapup').css('webkitTransform', 'translate(0,0)')
        }
        var map = new BMap.Map("map");            // 创建Map实例
        map.centerAndZoom(new BMap.Point(121.5082, 31.244), 16);  //初始化时，即可设置中心点和地图缩放级别。
        map.enableScrollWheelZoom();
        map.enableContinuousZoom();
        map.enableContinuousZoom();    // 开启连续缩放效果
        map.enableInertialDragging();  // 开启惯性拖拽效果
        var marker1 = new BMap.Marker(new BMap.Point(121.514209, 31.239462));  // 创建标注
        map.addOverlay(marker1);              // 将标注添加到地图中
        var infoWindow1 = new BMap.InfoWindow("浦东新区陆家嘴环球金融中心93楼");
        marker1.addEventListener("click", function () {
            this.openInfoWindow(infoWindow1);
        });
    });
    function animation() {
        $('.circle').addClass('transform0');
        $('.date').addClass('transform0');
        setTimeout(function () {
            $('.hotel').addClass('opacity0');
        }, 500);
        setTimeout(function () {
            $('.address').addClass('opacity0');
        }, 1000);
        setTimeout(function () {
            $('.prizeframe').addClass('opacity0');
            $('.prize').addClass('opacity0');
        }, 1500);
        setTimeout(function () {
            $('.join').addClass('opacity0');
        }, 2000);
        setTimeout(function () {
            $('.water').addClass('opacity0');
        }, 2500)
    }
});