/*====================================================
  TABLE OF CONTENT
  1. function declearetion
  2. Initialization
====================================================*/

/*===========================
 1. function declearetion
 ==========================*/

/*const api = new GhostContentAPI({
	url: 'http://localhost:2368',
	key: '1aceca97f51b3144b17f6d89a6',
	version: "v3"
});*/


var themeApp = {

	setNavbar: function () {
		if (typeof fixed_navbar != "undefined" && fixed_navbar == true) {
			$('#main-navbar').addClass('navbar-fixed-top');
			$('body').addClass('has-fixed-navbar');
		}
	},

	formatDate: function (dt) {
		var d = new Date(dt);
		var month_name = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var month = month_name[d.getMonth()];
		var date = d.getDate();
		var year = d.getFullYear();
		var formatted_dt = month + ' ' + date + ',' + ' ' + year;
		return formatted_dt;
	},

	recentPosts: function (data) {
		var container = $(".recent-post");
		var recentPost;
		if(container.length && typeof recent_post_count !== 'undefined') {
			if(api) {
				api.posts
				.browse({
				limit: recent_post_count,
				include: 'tags,authors'
				})
				.then((posts) => {
				console.log(posts);
				recentPost = posts;
				var string = '';
				if (recentPost.length > 0) {
					for(i = 0; i< recentPost.length ; i++) {
						var link = recentPost[i].url;
						var title = recentPost[i].title;
						var published_at = themeApp.formatDate(recentPost[i].published_at);
						var image_link  = recentPost[i].feature_image;
						if ( image_link !== null ) {
							var image = '<div class="post-thumb pull-left" style="background-image:url(' + image_link + ')"></div>';
							var helper_class = 'have-image';
						} else {
							var image ='<div class="post-thumb pull-left"><i class="fa fa-image"></i></div>';
							var helper_class = '';
						}
						string +='<div class="recent-single-post clearfix ' +helper_class+ '"><a href="' + link + '" class="post-title">\
						'+ image +'\
						<div class="post-info"><div class="post-title">' + title + '</div><div class="date"><i class="fa fa-calendar-o"></i>' + published_at + '</div></div>\
						</a></div>'
					}
				}
				container.append(string);
				})
				.catch((err) => {
					console.error(err);
				});
			}
		
		}
	},

	formatDate: function(dt) {
		var d = new Date(dt);
		var month_name = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var month = month_name[d.getMonth()];
		var date = d.getDate();
		var year = d.getFullYear();
		var formatted_dt = month+' '+date+','+' '+year;
		return formatted_dt;
	},

	responsiveIframe: function() {
		$('.full-post').fitVids();
	},

	featuredMedia: function(){
		if ($(".full-post").length > 0) {
			$(".full-post").each(function() {
				var thiseliment = $(this);
				var media_wrapper = $(this).find('featured');
				var media_content_embeded = media_wrapper.find('iframe');
				var container = thiseliment.find('.featured-media');
				container.find('.image-container').hide();
				if (media_content_embeded.length > 0) {
					container.find('.image-container').remove();
					container.addClass('has-iframe');
					container.prepend(media_content_embeded);
				} else {
					container.addClass('no-iframe');
					thiseliment.find('.featured-media').find('.image-container').show();
				}
			});
		}
	},

	commentCount: function () {
	    var s = document.createElement('script'); s.async = true;
	    s.type = 'text/javascript';
	    s.src = '//' + disqus_shortname + '.disqus.com/count.js';
	    (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
	},

	highlighter: function() {
		// $('pre code').each(function(i, block) {
		//     hljs.highlightBlock(block);
		// });
	},

	facebook:function() {
		if ($('.fb').length) {
			var facebook_sdk_script = '<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4";fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));</script>'
			var fb_page = '<div class="fb-page" data-href="'+facebook_page_url+'" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true" data-show-posts="false"><div class="fb-xfbml-parse-ignore">Facebook</div></div>';
			$('body').append(facebook_sdk_script);
			$('.fb').append(fb_page);
			$(".fb").fitVids();
		}
	},

	searchPopup: function() {
		$('#search-open').on('click', function(e) {
			e.preventDefault();
			$('.search-popup').addClass('visible');
			$('#search-input').css('visibility', 'visible').focus();
		});
		$('.close-button').on('click', function(e) {
			e.preventDefault();
			$('.search-popup').removeClass('visible');
			$('#search-input').css('visibility', 'hidden');
		});
		$('#popup-outer').on('click', function(e) {
			if(e.target.id === 'popup-outer') {
				$('.search-popup').removeClass('visible');
				$('#search-input').css('visibility', 'hidden');
			}
		});

		if(window.location.pathname=="/search/" && window.location.search!=""){
			var  search = JSON.parse(sessionStorage.getItem("search"));
			$('#search-page-result ul').append(
				$.map(search,function(value,index){
					var image = value.image==null?"/assets/images/ippon-bkr.png":value.image;
					return "<li><img src='"+image+"' alt='' /><a href='"+value.link+"'>"+value.title+"</a></li>";
				}).join(" ")
			);
		}
	},

	backToTop: function() {
		$(window).scroll(function(){
			if ($(this).scrollTop() > 100) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});
		$('#back-to-top').on('click', function(e){
			e.preventDefault();
			$('html, body').animate({scrollTop : 0},1000);
			return false;
		});
	},
	
	init:function(){
		themeApp.setNavbar();
		//themeApp.latestSlider();
		//themeApp.specialPostsSetOne();
		//themeApp.specialPostsSetTwo();
		themeApp.recentPosts();
		themeApp.facebook();
		themeApp.featuredMedia();
		themeApp.responsiveIframe();
		themeApp.highlighter();
		/*themeApp.mailchimp();*/
		themeApp.searchPopup();
		themeApp.backToTop();
	}
}

/*===========================
2. Initialization
==========================*/
$(document).ready(function(){
	themeApp.init();
});