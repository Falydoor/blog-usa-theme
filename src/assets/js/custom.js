! function (a) {
    "use strict";
    a.fn.fitVids = function (b) {
        var c = {
            customSelector: null,
            ignore: null
        };
        if (!document.getElementById("fit-vids-style")) {
            var d = document.head || document.getElementsByTagName("head")[0],
                e = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",
                f = document.createElement("div");
            f.innerHTML = '<p>x</p><style id="fit-vids-style">' + e + "</style>", d.appendChild(f.childNodes[1])
        }
        return b && a.extend(c, b), this.each(function () {
            var b = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', "object", "embed"];
            c.customSelector && b.push(c.customSelector);
            var d = ".fitvidsignore";
            c.ignore && (d = d + ", " + c.ignore);
            var e = a(this).find(b.join(","));
            e = e.not("object object"), e = e.not(d), e.each(function (b) {
                var c = a(this);
                if (!(c.parents(d).length > 0 || "embed" === this.tagName.toLowerCase() && c.parent("object").length || c.parent(".fluid-width-video-wrapper").length)) {
                    c.css("height") || c.css("width") || !isNaN(c.attr("height")) && !isNaN(c.attr("width")) || (c.attr("height", 9), c.attr("width", 16));
                    var e = "object" === this.tagName.toLowerCase() || c.attr("height") && !isNaN(parseInt(c.attr("height"), 10)) ? parseInt(c.attr("height"), 10) : c.height(),
                        f = isNaN(parseInt(c.attr("width"), 10)) ? c.width() : parseInt(c.attr("width"), 10),
                        g = e / f;
                    if (!c.attr("id")) {
                        var h = "fitvid" + b;
                        c.attr("id", h)
                    }
                    c.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * g + "%"), c.removeAttr("height").removeAttr("width")
                }
            })
        })
    }
}(window.jQuery || window.Zepto), ! function (a, b, c, d) {
    var e = a(b);
    a.fn.lazyload = function (f) {
        function g() {
            var b = 0;
            i.each(function () {
                var c = a(this);
                if (!j.skip_invisible || c.is(":visible"))
                    if (a.abovethetop(this, j) || a.leftofbegin(this, j));
                    else if (a.belowthefold(this, j) || a.rightoffold(this, j)) {
                    if (++b > j.failure_limit) return !1
                } else c.trigger("appear"), b = 0
            })
        }
        var h, i = this,
            j = {
                threshold: 0,
                failure_limit: 0,
                event: "scroll",
                effect: "show",
                container: b,
                data_attribute: "original",
                skip_invisible: !0,
                appear: null,
                load: null,
                placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
            };
        return f && (d !== f.failurelimit && (f.failure_limit = f.failurelimit, delete f.failurelimit), d !== f.effectspeed && (f.effect_speed = f.effectspeed, delete f.effectspeed), a.extend(j, f)), h = j.container === d || j.container === b ? e : a(j.container), 0 === j.event.indexOf("scroll") && h.bind(j.event, function () {
            return g()
        }), this.each(function () {
            var b = this,
                c = a(b);
            b.loaded = !1, (c.attr("src") === d || c.attr("src") === !1) && c.is("img") && c.attr("src", j.placeholder), c.one("appear", function () {
                if (!this.loaded) {
                    if (j.appear) {
                        var d = i.length;
                        j.appear.call(b, d, j)
                    }
                    a("<img />").bind("load", function () {
                        var d = c.attr("data-" + j.data_attribute);
                        c.hide(), c.is("img") ? c.attr("src", d) : c.css("background-image", "url('" + d + "')"), c[j.effect](j.effect_speed), b.loaded = !0;
                        var e = a.grep(i, function (a) {
                            return !a.loaded
                        });
                        if (i = a(e), j.load) {
                            var f = i.length;
                            j.load.call(b, f, j)
                        }
                    }).attr("src", c.attr("data-" + j.data_attribute))
                }
            }), 0 !== j.event.indexOf("scroll") && c.bind(j.event, function () {
                b.loaded || c.trigger("appear")
            })
        }), e.bind("resize", function () {
            g()
        }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && e.bind("pageshow", function (b) {
            b.originalEvent && b.originalEvent.persisted && i.each(function () {
                a(this).trigger("appear")
            })
        }), a(c).ready(function () {
            g()
        }), this
    }, a.belowthefold = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? (b.innerHeight ? b.innerHeight : e.height()) + e.scrollTop() : a(f.container).offset().top + a(f.container).height(), g <= a(c).offset().top - f.threshold
    }, a.rightoffold = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.width() + e.scrollLeft() : a(f.container).offset().left + a(f.container).width(), g <= a(c).offset().left - f.threshold
    }, a.abovethetop = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.scrollTop() : a(f.container).offset().top, g >= a(c).offset().top + f.threshold + a(c).height()
    }, a.leftofbegin = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.scrollLeft() : a(f.container).offset().left, g >= a(c).offset().left + f.threshold + a(c).width()
    }, a.inviewport = function (b, c) {
        return !(a.rightoffold(b, c) || a.leftofbegin(b, c) || a.belowthefold(b, c) || a.abovethetop(b, c))
    }, a.extend(a.expr[":"], {
        "below-the-fold": function (b) {
            return a.belowthefold(b, {
                threshold: 0
            })
        },
        "above-the-top": function (b) {
            return !a.belowthefold(b, {
                threshold: 0
            })
        },
        "right-of-screen": function (b) {
            return a.rightoffold(b, {
                threshold: 0
            })
        },
        "left-of-screen": function (b) {
            return !a.rightoffold(b, {
                threshold: 0
            })
        },
        "in-viewport": function (b) {
            return a.inviewport(b, {
                threshold: 0
            })
        },
        "above-the-fold": function (b) {
            return !a.belowthefold(b, {
                threshold: 0
            })
        },
        "right-of-fold": function (b) {
            return a.rightoffold(b, {
                threshold: 0
            })
        },
        "left-of-fold": function (b) {
            return !a.rightoffold(b, {
                threshold: 0
            })
        }
    })
}(jQuery, window, document), ! function (a) {
    a.fn.readingTime = function (b) {
        var c = {
                readingTimeTarget: ".eta",
                wordCountTarget: null,
                wordsPerMinute: 270,
                round: !0,
                lang: "en",
                lessThanAMinuteString: "",
                prependTimeString: "",
                prependWordString: "",
                remotePath: null,
                remoteTarget: null,
                success: function () {},
                error: function () {}
            },
            d = this,
            e = a(this);
        d.settings = a.extend({}, c, b);
        var f = d.settings;
        if (!this.length) return f.error.call(this), this;
        if ("it" == f.lang) var g = f.lessThanAMinuteString || "Meno di un minuto",
            h = "min";
        else if ("fr" == f.lang) var g = f.lessThanAMinuteString || "Moins d'une minute",
            h = "min";
        else if ("de" == f.lang) var g = f.lessThanAMinuteString || "Weniger als eine Minute",
            h = "min";
        else if ("es" == f.lang) var g = f.lessThanAMinuteString || "Menos de un minuto",
            h = "min";
        else if ("nl" == f.lang) var g = f.lessThanAMinuteString || "Minder dan een minuut",
            h = "min";
        else if ("sk" == f.lang) var g = f.lessThanAMinuteString || "Menej než minútu",
            h = "min";
        else if ("cz" == f.lang) var g = f.lessThanAMinuteString || "Méně než minutu",
            h = "min";
        else if ("hu" == f.lang) var g = f.lessThanAMinuteString || "Kevesebb mint egy perc",
            h = "perc";
        else if ("ru" == f.lang) var g = f.lessThanAMinuteString || "Меньше минуты",
            h = "мин";
        else if ("ar" == f.lang) var g = f.lessThanAMinuteString || "أقل من دقيقة",
            h = "دقيقة";
        else if ("da" == f.lang) var g = f.lessThanAMinuteString || "Mindre end et minut",
            h = "min";
        else if ("is" == f.lang) var g = f.lessThanAMinuteString || "Minna en eina mínútu",
            h = "min";
        else if ("no" == f.lang) var g = f.lessThanAMinuteString || "Mindre enn ett minutt",
            h = "min";
        else if ("pl" == f.lang) var g = f.lessThanAMinuteString || "Mniej niż minutę",
            h = "min";
        else if ("ru" == f.lang) var g = f.lessThanAMinuteString || "Меньше минуты",
            h = "мой";
        else if ("sv" == f.lang) var g = f.lessThanAMinuteString || "Mindre än en minut",
            h = "min";
        else var g = f.lessThanAMinuteString || "1 min",
            h = "min";
        var i = function (b) {
            if ("" !== b) {
                var c = b.trim().split(/\s+/g).length,
                    d = f.wordsPerMinute / 60,
                    e = c / d;
                if (f.round === !0) var i = Math.round(e / 60);
                else var i = Math.floor(e / 60);
                var j = Math.round(e - 60 * i);
                if (f.round === !0) i > 0 ? a(f.readingTimeTarget).text(f.prependTimeString + i + " " + h + " Read") : a(f.readingTimeTarget).text(f.prependTimeString + g + " Read");
                else {
                    var k = i + ":" + j;
                    a(f.readingTimeTarget).text(f.prependTimeString + k)
                }
                "" !== f.wordCountTarget && void 0 !== f.wordCountTarget && a(f.wordCountTarget).text(f.prependWordString + c), f.success.call(this)
            } else f.error.call(this, "The element is empty.")
        };
        /*e.each(function () {
            null != f.remotePath && null != f.remoteTarget ? a.get(api.posts("posts/" + f.remotePath, {
                fields: "markdown"
            }), function (b) {
                i(a("<div>" + b.posts[0].markdown + "</div>").text())
            }) : i(e.text())
        })*/
    }
}(jQuery), $(function () {
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    var a = {
        card_click: function () {},
        lazyLoad: function () {
            $("div.lazy").lazyload({
                effect: "fadeIn"
            })
        },
        searchInput: function () {
            $(document).on("click", function (a) {
                "search-input" == a.target.id ? $("#search-input").width() < 100 && $("#search-input").animate({
                    width: "+=200px",
                    left: "-=200px"
                }, 500) : $("#search-input").width() > 10 && ($("#search-input").animate({
                    width: "-=200px"
                }, 500), $(".popover__wrapper").css({
                    visibility: "hidden",
                    opacity: 0
                }).children("ul").empty().html(""))
            }), $("#search-input").on("keyup", function () {
                $("#popover-content .searchfor span").html($(this).val()), $("#popover-content .searchfor a").attr("href", "/search?t=" + $(this).val()), $("#popover-content ul li").length && $(".popover__wrapper").css({
                    visibility: "visible",
                    opacity: 1
                })
            }), window.matchMedia("(max-width: 992px)").matches || "/m-search/" == window.location.pathname ? ($(".wrap-search form").css("display", "none"), $("#link_m_search").css("display", "block")) : ($("#link_m_search").css("display", "none"), $(".wrap-search form").css("display", "block")), $(window).resize(function () {
                window.matchMedia("(max-width: 992px)").matches || "/m-search/" == window.location.pathname ? ($(".wrap-search form").css("display", "none"), $("#link_m_search").css("display", "block")) : ($("#link_m_search").css("display", "none"), $(".wrap-search form").css("display", "block"))
            })
        },
        responseIcon: function () {
            setTimeout(function () {
                $(".number_com").each(function (a, b) {
                    ("0" == $.trim($(b).text()) || "" == $.trim($(b).text())) && $(b).html('<i class="fa fa-comment-o" aria-hidden="true"></i>')
                })
            }, 3e3)
        },
        positionning: function () {
            var a = $(".page-wrap"),
                b = a.offset().left,
                c = a.width();
            $(".primary_bar").css({
                left: b,
                width: c
            }), $("#main-navbar div:first-child").css({
                left: b,
                width: c
            }), $(window).resize(function () {
                var a = $(".page-wrap"),
                    b = a.offset().left,
                    c = a.width();
                $(".primary_bar").css({
                    left: b,
                    width: c
                }), $("#main-navbar div:first-child").css({
                    left: b,
                    width: c
                })
            }), $(window).scroll(function () {
                window.matchMedia("(min-width: 768px)").matches && ($(window).scrollTop() > 115 && $(".main-header").addClass("fixed-nav"), $(window).scrollTop() < 116 && $(".main-header").removeClass("fixed-nav"))
            })
        },
        disqusApiCall: function (a, b) {
            return $.getJSON("https://disqus.com/api/3.0/forums/listThreads.json?api_key=" + a + "&forum=" + b).then(function (a) {
                var b = $.map(a.response, function (a) {
                    return {
                        link: a.link,
                        likes: a.likes
                    }
                });
                return b
            })
        },
        session_likes: function () {
            var a = $(location).attr("protocol") + "//" + $(location).attr("hostname");
            if (sessionStorage.getItem("savedLikes")) {
                var b = JSON.parse(sessionStorage.getItem("savedLikes"));
                $(".card").each(function (c, d) {
                    var e = $(d).data("file"),
                        f = a + e,
                        g = $.grep(b, function (a) {
                            return a.link == f
                        });
                    $.isEmptyObject(g) || "0" != g[0].likes && $(d).find(".recommend_form button").text(" " + g[0].likes)
                })
            } else this.disqusApiCall("GdXtQyStXSIwHgPIDbu8u5cLARMfubbrYe6G5QW7zekc28JXnpDIVF1om3plkrML", "http-blog-ippon-tech").done(function (b) {
                $(".card").each(function (c, d) {
                    var e = $(d).data("url"),
                        f = a + e,
                        g = $.grep(b, function (a) {
                            return a.link == f
                        });
                    $.isEmptyObject(g) || "0" != g[0].likes && $(d).find(".recommend_form button").text(" " + g[0].likes)
                }), sessionStorage.setItem("savedLikes", JSON.stringify(b))
            })
        },
        increment_likes: function () {
            $(".recommend_form button").on("click", function () {
                var a = $(location).attr("protocol") + "//" + $(location).attr("hostname"),
                    b = "" != $.trim($(this).text()) ? $(this).text() : 0,
                    c = 0,
                    d = $(this).parents(".card"),
                    e = d.data("file"),
                    f = a + e;
                if (c = 0 == $(this).parent(".recommend_form").data("statut") ? parseInt(b, 10) + 1 : c > 1 ? parseInt(b, 10) - 1 : "", $(this).text(" " + c), sessionStorage.getItem("savedLikes")) {
                    var g = JSON.parse(sessionStorage.getItem("savedLikes"));
                    $.each(g, function (a, b) {
                        b.link == f && (g[a].likes = c)
                    })
                }
                sessionStorage.setItem("savedLikes", JSON.stringify(g)), b = 0
            })
        },
        init: function () {
            this.card_click(), this.lazyLoad(), this.responseIcon(), this.session_likes(), this.increment_likes(), this.searchInput(), this.positionning()
        }
    };
    a.init()
});