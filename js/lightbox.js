$(document).ready(function() {
		$(document.body).prepend( '<div class="lightbox"> <div class="lightbox-background"></div> <div class="lightbox-container"><div class="lightbox-content"></div></div> </div>');

		$('.lightbox').click(function() {
			 //Hide the lightbox
                $(this).fadeOut();
		});

		$('.lightbox-content').click(function(event){
			event.stopPropagation();
		});

		// attatch lightbox functions here
        $(".url-link").click(function(e) {
			return !window.open(this.href);
		});

        $(".image-link").click(function(e) {
            e.preventDefault();

			var topMargin = 50;
	        var scrollXY = getScrollXY();
			var newImg = new Image();
			var path = $(this).attr("href");

			newImg.onload = function() {
				$(".lightbox-content").height(this.height);
				$(".lightbox-content").width(this.width);
				//$(".lightbox-content").css("margin-top", scrollXY[1] + 100);
				$(".lightbox-container").css("top", scrollXY[1] + topMargin);

				$(".lightbox-content").html('<img src="' + path + '" alt="image" />');
				$(".lightbox").fadeIn();
			};

			newImg.src = path;
		});

		$(".video-link").click(function(event) {
            event.preventDefault();

			$(".lightbox-content").html('<div id="player"></div>');

			var scrollXY = getScrollXY();
			var videoWH = $(this).attr("rel");
			var path = $(this).attr("href");

			videoWH = videoWH.split("x", 2);

			//swfobject
			var flashvars = {
				file: path,
				autostart: 'true',
			};

			var params = {
				allowfullscreen: 'true',
				allowscriptaccess: 'always'
			};

			var attributes = {};

			swfobject.embedSWF("/media/flash/player.swf", "player", videoWH[0], videoWH[1], "9.0.0", false, flashvars, params, attributes);

			$(".lightbox-content").width(parseInt(videoWH[0])).height(parseInt(videoWH[1]));
			$(".lightbox-container").css("top", scrollXY[1] + 100);
			$(".lightbox").fadeIn();
		});
});

function getScrollXY() {
    var x = 0, y = 0;
    if( typeof( window.pageYOffset ) == 'number' ) {
        // Netscape
        x = window.pageXOffset;
        y = window.pageYOffset;
    } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
        // DOM
        x = document.body.scrollLeft;
        y = document.body.scrollTop;
    } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
        // IE6 standards compliant mode
        x = document.documentElement.scrollLeft;
        y = document.documentElement.scrollTop;
    }
    return [x, y];
}