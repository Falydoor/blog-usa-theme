$(function() {
   var  isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };
    var t = {
        
        card_click: function() {
            $(".left-image, .card_bkr").on("click", function(t) {
                t.preventDefault();
                console.log(isMobile.any());
                if(isMobile.any()){
                   // window.location.href = $(this).data("href")+"amp";
                   console.log($(this).data("href")+"amp");
                }else{
                       // window.location.href = $(this).data("href");
                       console.log($(this).data("href"));
                }
            }).find(".disqus-container").on("click", function(t) {
                t.stopPropagation()
            })
        },
        lazyLoad: function() {
            $("div.lazy").lazyload({
                effect: "fadeIn"
            })
        },
        searchInput: function() {
            $(document).on("click", function(t) {
                "search-input" == t.target.id ? $("#search-input").width() < 100 && $("#search-input").animate({
                    width: "+=200px",
                    left: "-=200px"
                }, 500) : $("#search-input").width() > 10 && ($("#search-input").animate({
                    width: "-=200px"
                }, 500), $(".popover__wrapper").css({
                    visibility: "hidden",
                    opacity: 0
                }).children("ul").empty().html(""))
            }), $("#search-input").on("keyup", function() {
                $("#popover-content .searchfor span").html($(this).val()), $("#popover-content .searchfor a").attr("href", "/search?t=" + $(this).val()), $("#popover-content ul li").length && $(".popover__wrapper").css({
                    visibility: "visible",
                    opacity: 1
                })
            })
        },
        responseIcon: function() {
            setTimeout(function() {
                $(".number_com").each(function(t, i) {
                    ("0" == $.trim($(i).text()) || "" == $.trim($(i).text())) && $(i).html('<i class="fa fa-comment-o" aria-hidden="true"></i>')
                })
            }, 3e3)
        },
        positionning: function() {
            var t = $(".page-wrap"),
                i = t.offset().left,
                e = t.width();
            $(".primary_bar").css({
                left: i,
                width: e
            }), $("#main-navbar div:first-child").css({
                left: i,
                width: e
            }), $(window).resize(function() {
                var t = $(".page-wrap"),
                    i = t.offset().left,
                    e = t.width();
                $(".primary_bar").css({
                    left: i,
                    width: e
                }), $("#main-navbar div:first-child").css({
                    left: i,
                    width: e
                })
            }), $(window).scroll(function() {
                $(window).scrollTop() > 115 && $(".main-header").addClass("fixed-nav"), $(window).scrollTop() < 116 && $(".main-header").removeClass("fixed-nav")
            })
        },
        disqusApiCall: function(t, i) {
            return $.getJSON("https://disqus.com/api/3.0/forums/listThreads.json?api_key=" + t + "&forum=" + i).then(function(t) {
                var i = $.map(t.response, function(t) {
                    return {
                        link: t.link,
                        likes: t.likes
                    }
                });
                return i
            })
        },
        session_likes: function() {
            var t = $(location).attr("protocol") + "//" + $(location).attr("hostname");
            if (sessionStorage.getItem("savedLikes")) {
                var i = JSON.parse(sessionStorage.getItem("savedLikes"));
                $(".card").each(function(e, n) {
                    var s = $(n).data("file"),
                        a = t + s,
                        o = $.grep(i, function(t) {
                            return t.link == a
                        });
                    $.isEmptyObject(o) || "0" != o[0].likes && $(n).find(".recommend_form button").text(" " + o[0].likes)
                })
            } else this.disqusApiCall("GdXtQyStXSIwHgPIDbu8u5cLARMfubbrYe6G5QW7zekc28JXnpDIVF1om3plkrML", "https-test-ippon-ghost-io").done(function(i) {
                $(".card").each(function(e, n) {
                    var s = $(n).data("url"),
                        a = t + s,
                        o = $.grep(i, function(t) {
                            return t.link == a
                        });
                    $.isEmptyObject(o) || "0" != o[0].likes && $(n).find(".recommend_form button").text(" " + o[0].likes)
                }), sessionStorage.setItem("savedLikes", JSON.stringify(i))
            })
        },
        increment_likes: function() {
            $(".recommend_form button").on("click", function() {
                var t = $(location).attr("protocol") + "//" + $(location).attr("hostname"),
                    i = "" != $.trim($(this).text()) ? $(this).text() : 0,
                    e = 0,
                    n = $(this).parents(".card"),
                    s = n.data("file"),
                    a = t + s;
                if (e = 0 == $(this).parent(".recommend_form").data("statut") ? parseInt(i, 10) + 1 : e > 1 ? parseInt(i, 10) - 1 : "", $(this).text(" " + e), sessionStorage.getItem("savedLikes")) {
                    var o = JSON.parse(sessionStorage.getItem("savedLikes"));
                    $.each(o, function(t, i) {
                        i.link == a && (o[t].likes = e)
                    })
                }
                sessionStorage.setItem("savedLikes", JSON.stringify(o)), i = 0
            })
        },
        init: function() {
            this.card_click(), this.lazyLoad(), this.responseIcon(), this.session_likes(), this.increment_likes(), this.searchInput(), this.positionning()
        }
    };
    t.init()
});