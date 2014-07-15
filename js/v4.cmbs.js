(function(f, u, a, c) {
    var t = f.document, h = function(d) {
        var a = 0, c = 0;
        if ("getBoundingClientRect" in d) d = d.getBoundingClientRect(), a = d.top + e, 
        c = d.left + k; else {
            a += d.scrollTop || 0;
            for (c += d.scrollLeft || 0; d; ) c += d.offsetLeft || 0, a += d.offsetTop || 0, 
            d = d.offsetParent;
        }
        return {
            top: a,
            left: c
        };
    }, g = function(d, a, c) {
        return null == a ? d.lazyData || (d.lazyData = {
            ret: [],
            bind: null,
            timer: null,
            tick: function() {
                var a = 0, c = g(d), n = t.documentElement, r = t.body, p = null != d && d == d.window;
                c.WST = (p ? d.pageYOffset || n && n.scrollTop || r.scrollTop : h(d).top) || 0;
                c.WSL = (p ? d.pageXOffset || n && n.scrollLeft || r.scrollLeft : h(d).left) || 0;
                c.WH = (p ? d.innerHeight || n && n.clientHeight || r.clientHeight : d.clientHeight) || 0;
                c.WW = (p ? d.innerWidth || n && n.clientWidth || r.clientWidth : d.clientWidth) || 0;
                p && (e = c.WST, k = c.WSL);
                for (;a < c.ret.length; ) c.ret[a].length ? c.ret[a++].check() : delete c.ret.splice(a, 1)[0].checking;
                if (!c.ret.length) {
                    a: {
                        try {
                            var m = g(d, "resize");
                            f.removeEventListener ? (f.removeEventListener("resize", m, !1), d.removeEventListener("scroll", m, !1)) : (f.detachEvent("onresize", m), 
                            d.detachEvent("onscroll", m));
                        } catch (u) {
                            a = !1;
                            break a;
                        }
                        a = !0;
                    }
                    c.bind = !a;
                }
            },
            resize: function() {
                var a = g(d);
                clearTimeout(a.timer);
                a.timer = setTimeout(a.tick, 100);
            }
        }) : null == c ? g(d)[a] : g(d)[a] = c;
    }, e = 0, k = 0;
    a.fn = a.prototype = {
        constructor: a,
        length: 0,
        splice: [].splice,
        dcb: function() {
            var d = this.getAttribute("data-original");
            d && (this.src = d);
        },
        init: function(d, a) {
            var c, e, g, l = typeof a;
            if ("function" == l) c = a; else if ("object" == l && (c = a.callback, e = a.container, 
            g = parseFloat(a.range), this.isArrayLike(e) && (e = e[0]), "string" == typeof e && (e = t.getElementById(e)), 
            null == e || 1 != e.nodeType || "body" == e.nodeName.toLowerCase() || "html" == e.nodeName.toLowerCase())) e = f;
            this.cb = c || this.dcb;
            this.range = g || 0;
            this.container = e || f;
            return this.push(d);
        },
        push: function(a) {
            "string" == typeof a && (a = t.getElementById(a));
            this.merge(a);
            if (this.length && (a = g(this.container), this.checking || (a.ret.push(this), this.checking = !0), 
            a.resize(), !a.bind)) {
                var c;
                a: {
                    var e = this.container;
                    try {
                        c = g(e, "resize"), f.addEventListener ? (f.addEventListener("resize", c, !1), e.addEventListener("scroll", c, !1)) : (f.attachEvent("onresize", c), 
                        e.attachEvent("onscroll", c));
                    } catch (h) {
                        c = !1;
                        break a;
                    }
                    c = !0;
                }
                a.bind = c;
            }
            return this;
        },
        isArrayLike: function(a) {
            var c = typeof a;
            return !!a && "function" != c && "string" != c && (0 === a.length || a.length && a.length - 1 in a);
        },
        merge: function(a) {
            var c = this.length, e = 0;
            for (a = this.isArrayLike(a) ? a : [ a ]; e < a.length; ) a[e] && 1 == a[e].nodeType && (this[c++] = a[e]), 
            e++;
            this.length = c;
            return this;
        },
        check: function() {
            for (var a = 0, c = this.range, e = g(this.container), f, k; a < this.length; ) {
                f = this[a];
                k = h(f);
                var l = f, s = t.documentElement;
                !("none" == (l.currentStyle || getComputedStyle(l, null) || l.style).display || s !== l && !(s.contains ? s.contains(l) : s.compareDocumentPosition && s.compareDocumentPosition(b) & 16)) && k.top + f.offsetHeight + c >= e.WST && k.top - c <= e.WST + e.WH && k.left + f.offsetWidth + c >= e.WSL && k.left - c <= e.WSL + e.WW ? this.cb.call(this.splice(a, 1)[0]) : a++;
            }
            return this;
        }
    };
    a.fn.init.prototype = a.fn;
    return f[u] = a;
})(window, "LazyLoad", function(f, u) {
    return new arguments.callee.fn.init(f, u);
});

(function() {
    function f(a, c) {
        this.media = document.createElement(c || "video");
        this.bindEvents();
        this.updateConfig(a);
    }
    var u = function() {
        var a = document.createElement("video"), c = {
            mp4: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
            ogg: 'video/ogg; codecs="theora, vorbis"',
            webm: 'video/webm; codecs="vp8, vorbis"'
        };
        if ("undefined" != typeof HTMLVideoElement && a.canPlayType) for (var f in c) if (a.canPlayType(c[f])) return f;
        return !1;
    }();
    f.prototype = {
        constructor: f,
        bindEvents: function() {
            var a = this, c = this.media;
            c.addEventListener("error", function() {
                a.fire("error");
            }, !1);
            c.addEventListener("playing", function() {
                a.playing = !0;
                a.fire("play");
            }, !1);
            c.addEventListener("pause", function() {
                a.playing = !1;
                a.fire("pause");
            }, !1);
            c.addEventListener("ended", function() {
                a.playing = !1;
                a.fire("end");
            }, !1);
            c.addEventListener("canplaythrough", function() {
                a.fire("canplay");
            }, !1);
            c.addEventListener("waiting", function() {
                a.fire("waiting");
            }, !1);
            c.addEventListener("stalled", function() {
                a.fire("stalled");
            }, !1);
            c.addEventListener("loadedmetadata", function() {
                a.playing = !this.paused;
                a.muted = this.muted;
                a.length = a.parse(this.duration);
                a.currentTime = a.parse(this.currentTime);
                a.volume = a.parse(this.volume);
                a.fire("ready", a.length);
            }, !1);
            c.addEventListener("timeupdate", function() {
                a.fire("update", a.currentTime = a.parse(this.currentTime));
            }, !1);
            c.addEventListener("volumechange", function() {
                a.fire("volumechange", a.volume = a.parse(this.volume));
                (a.muted = this.muted) && a.fire("mute");
            }, !1);
        },
        updateConfig: function(a) {
            var c, f = this.media;
            for (c in a) a.hasOwnProperty(c) && (c in f ? f[c] = a[c] : f.setAttribute(c, a[c]));
        },
        parse: function(a) {
            return parseFloat(a.toFixed(2)) || 0;
        },
        fire: function(a) {
            var c = "on" + a;
            "function" == typeof this[c] && this[c].apply(this, [].slice.call(arguments, 1));
        },
        play: function() {
            this.media.play();
        },
        pause: function() {
            this.media.pause();
        },
        stop: function() {
            this.pause();
            this.reset();
        },
        reset: function() {
            this.go(0);
        },
        skip: function(a) {
            this.go(this.currentTime + a);
        },
        go: function(a) {
            try {
                this.media.currentTime = this.parse(Math.min(this.length, Math.max(a, 0)));
            } catch (c) {}
        },
        mute: function(a) {
            this.media.muted = "undefined" == typeof a ? !0 : !!a;
        },
        setVol: function(a) {
            try {
                this.media.volume = this.parse(Math.min(1, Math.max(a, 0)));
            } catch (c) {}
        },
        volUp: function() {
            this.setVol(this.volume + .1);
        },
        volDown: function() {
            this.setVol(this.volume - .1);
        }
    };
    $.easing.cheetah = function(a, c, f, h, g) {
        return c == g ? f + h : h * (-Math.pow(2, -10 * c / g) + 1) + f;
    };
    $(function() {

        var a = {
            mp4: "/images/cmbs/cb.mp4",
            ogg: "/images/cmbs/cb.ogv",
            webm: "/images/cmbs/cb.webm"
        }, c = K.isCSS("animation"), t = K.supports.touch && 540 > $(window).width(), h = [], g = [];
        t && (LazyLoad = function(a, c) {
            h.push(a[0]);
            g.push(c.callback);
        });
        LazyLoad($("#cmbsbanner"), {
            callback: function() {
                var a = $(this).find(".titlen"), d = $(this).find("h2"), e = $(this).find("a.gp");
                K.isCSS(K.cssVendor + "filter");
                K.transition ? (a.css(K.transition, K.cssVendor + "transform 800ms cubic-bezier(.07,.43,0,.97)").css(K.transform, "translate(100%,0)").css("left", "50%").fadeIn(300), 
                setTimeout(function() {
                    a.css(K.transform, "translate(0,0)");
                }, 10)) : a.fadeIn(300).animate({
                    left: 0
                }, {
                    easing: "cheetah",
                    step: function(a, c) {},
                    queue: !1,
                    duration: 1e3
                });
                c && (d.addClass("flyLeft"), e.addClass("flyRight"));
                d.parent().fadeIn();
            },
            range: -300
        });
        LazyLoad($("#cmbssmall"), {
            callback: function() {
                var a = $(this).find(".feather"), d = $(this).find(".water");
                K.transition ? (a.fadeIn(1000).css(K.transform, "rotate(0) translate(0,0)"), 
                setTimeout(function() {
                    d.fadeIn().find("div").each(function(a) {
                        $(this).css(c, "waterAni 5s infinite " + a + "s");
                    });
                }, 1200)) : a.css("top", "-180px").animate({
                    top: 400
                }, {
                    duration: 2e3,
                    easing: "cheetah",
                    queue: !1
                }).fadeIn(function() {
                    d.addClass("water-wave").fadeIn();
                });
                setTimeout(function() {
                    $("#cmbssmall").each(function() {
                        var a = $(this).find(".title .t_text img"), c = $(this).find(".title .t_mb img"), d = $(this).find("div.desc");
                        K.supports.animation && (a.addClass("flyLeft"), c.addClass("scaleIn"), d.addClass("flyBottom"));
                        a.fadeIn(function() {
                            c.fadeIn();
                        });
                        d.fadeIn();
                    });
                }, 1e3);
            },
            range: -300
        });
        if (t) {
            var e, k, d = $(h), n = h.length, r = function(a) {
                var c, f, h = function() {
                    d[a].inted || (g[a].call(d[a]), d[a].inted = !0);
                    k = !1;
                };
                a = Math.min(n - 1, Math.max(0, a));
                if (a < e) c = d.eq(a), f = d.eq(e), c.is(":hidden") && c.css(K.transform, "translate(0,-100%)").css("z-index", 5).show(), 
                setTimeout(function() {
                    c.one(K.transitionend, function() {
                        c.css(K.transition, K.cssVendor + "transform 0").css("z-index", "auto");
                        f.css(K.transition, K.cssVendor + "transform 0").hide();
                        h();
                    }).css(K.transform, "translate(0,0)");
                    f.css(K.transform, "perspective(500px) rotateX(-20deg)");
                }, 10); else {
                    c = d.eq(e).css("z-index", 5);
                    f = d.eq(a);
                    f.is(":hidden") && f.show();
                    var l = e;
                    setTimeout(function() {
                        c.one(K.transitionend, function() {
                            c.css(K.transition, K.cssVendor + "transform 0").css(K.transform, "translate(0,0)").css("z-index", "auto");
                            f.css(K.transition, K.cssVendor + "transform 0");
                            a != l && c.hide();
                            h();
                        }).css(K.transform, "translate(0,-100%)");
                        f.css(K.transform, "perspective(500px) rotateX(0)");
                    }, 10);
                }
                k = !0;
                null == e ? h() : c.length && 0 == c.position().top ? k = !1 : (c.css(K.transition, K.cssVendor + "transform 600ms"), 
                f.css(K.transition, K.cssVendor + "transform 600ms"));
                e = a;
            }, w = function(a) {
                a.originalEvent.touches && a.originalEvent.touches.length && (a.pos = {
                    x: a.originalEvent.touches.item(0).pageX,
                    y: a.originalEvent.touches.item(0).pageY
                });
            }, x, l, s, p, m, v = d.parent().height(), q;
            $(h).on("touchstart", function(a) {
                k || (w(a), m = this, l = a.pos, x = new Date());
            });

            $(document).on({
                touchmove: function(a) {
                    w(a);
                    s = a.pos;
                    if (m && (s.y != l.y || p)) q = s.y - l.y, 0 < q ? 0 < e && (p = !0, d[e - 1].style[K.transform] = "translate(0,-" + (v - q) + "px)", 
                    d[e - 1].style.zIndex = 5, d[e - 1].style.display = "block", d[e + 1] && (d[e + 1].style.display = "none", 
                    d[e + 1].style[K.transform] = "translate(0,0)"), m.style.zIndex = "auto", m.style[K.transform] = "translate(0,0) perspective(500px) rotateX(" + 20 * (1 - Math.max(1, 2 * q / v)) + "deg)") : e < n - 1 && (p = !0, 
                    m.style[K.transform] = "translate(0," + q + "px)", m.style.zIndex = 5, d[e - 1] && (d[e - 1].style[K.transform] = "translate(0,0)", 
                    d[e - 1].style.zIndex = "auto", d[e - 1].style.display = "none"), d[e + 1].style.display = "block", 
                    d[e + 1].style[K.transform] = "perspective(500px) rotateX(" + 20 * (-1 + Math.min(1, 2 * -q / v)) + "deg)");
                    return !1;
                },
                "touchend touchcancel": function(a) {
                    if (p) return 0 == q ? k = !1 : 500 < new Date() - x && Math.abs(q) < v / 3 ? (a = e, 
                    0 < q ? e-- : e++, r(a)) : 0 < q ? r(e - 1) : r(e + 1), m = q = p = null, !1;
                }


            });
            sss = document.getElementById('cmbsbanner');
            kkk = document.getElementById('cmbssmall');
            $('.detail').on({
                "click": function(a) {

                    
                    sss.style.webkitTransform = "translate(0,-1px)";
                    // sss.style.display = "none";
                    kkk.style.webkitTransform = "translate(0,0)";
                    kkk.style.display = "block";
                    500 < new Date() - x && Math.abs(q) < v / 3 ? (a = e,
                            0 < q ? e-- : e++, r(a)) : 0 < q ? r(e - 1) : r(e + 1), m = q = p = null, !1

                }
            });
            $('.up').on({
                "click": function(a) {
                    kkk.style.webkitTransform = "translate(0,0px)";
                    kkk.style.display = 'none';
                    sss.style.webkitTransform = "translate(0,0)";
                    sss.style.display = "block";
                    

                }
            });


            r(0);
        }
        $('.feather').on(
            'click' , function(){
                $('.join').css('display','none');
                $('.form').css({
                    'display':'block',
                    'top' : '20%'
                });
               
            }
        );
        $('.close').on('click',function(){
           $('.form').hide();
            $('.join').show();
        });

        
    });
})();
    $('.eight').on('click',function(){
        $(this).toggleClass('clicked');
        if($(this).hasClass('clicked')){
            $('.mapup').css('webkitTransform','translate(0,-45%)');
        setTimeout(function(){
            $('#map').toggle().toggleClass('map1');
        },1000)
    }else{
         $('#map').toggle().toggleClass('map1');
        $('.mapup').css('webkitTransform','translate(0,0)')
       

    }
        
        var map = new BMap.Map("map");            // 创建Map实例
        map.centerAndZoom(new BMap.Point(121.514209,31.239462),16);  //初始化时，即可设置中心点和地图缩放级别。
        map.enableScrollWheelZoom();
        map.enableContinuousZoom();
        map.enableContinuousZoom();    // 开启连续缩放效果
        map.enableInertialDragging();　// 开启惯性拖拽效果
        var marker1 = new BMap.Marker(new BMap.Point(121.514209,31.239462));  // 创建标注
        map.addOverlay(marker1);              // 将标注添加到地图中
        var infoWindow1 = new BMap.InfoWindow("浦东新区陆家嘴环球金融中心93楼");
        marker1.addEventListener("click", function(){this.openInfoWindow(infoWindow1);});
    })