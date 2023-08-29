$(function() {
   var index =  {
        scrollEvent:function() {
            var _this = this;
            var curIndex = 0;
            var container = $(".scroller");
            var sumCount = $(".scree_body").length;
            var $window = $(window);
            var duration = 600;
            var aniTime = 0;
        
            var scrollFunc = function (e) {
                //假设动画还没运行完，则return
                if(new Date().getTime() < aniTime + duration){
                    return;
                }
                e = e || window.event;
                var t = 0;
                if (e.wheelDelta) {
                    t = e.wheelDelta;
                    if (t > 0 && curIndex > 0) {
                        movePrev();
                    } else if (t < 0 && curIndex < sumCount - 1) {
                        moveNext();
                    }
                } else if (e.detail) {
                    t = e.detail;
                    if (t < 0 && curIndex > 0) {
                        movePrev();
                    } else if (t > 0 && curIndex < sumCount - 1) {
                        moveNext();
                    }
                }
            };
        
            function moveNext(){
                aniTime = new Date().getTime();
                container.css("transform", "translate3D(0, -" + (++curIndex) * $window.height() + "px, 0)");
            }
        
            function movePrev(){
                aniTime = new Date().getTime();
                container.css("transform", "translate3D(0, -" + (--curIndex) * $window.height() + "px, 0)");
            }
        
            function init(){
                /*注冊事件*/
                if (document.addEventListener) {
                    document.addEventListener('DOMMouseScroll', scrollFunc, false);
                }//W3C
                window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome
        
                container.css({
                    "transition": "all 0.5s",
                    "-moz-transition": "all 0.5s",
                    "-webkit-transition": "all 0.5s"
                });
            }
        
            init();
          
        },
        touchEvent:function() {
            var _this = this;
            var curIndex = 0;
            var container = $(".scroller");
            var $window = $(window);
            var screeBody = $('.scree_body');
            $(".scroller").css({
                "transition": "all 0.5s",
                "-moz-transition": "all 0.5s",
                "-webkit-transition": "all 0.5s"
            });
            $('body').swipe({
                up: function(){
                    if(curIndex === screeBody.length-1) {
                        return;
                    }
                    container.css("transform", "translate3D(0, -" + (++curIndex) * $window.height() + "px, 0)");
                },
                down: function(){
                    if(curIndex === 0) {
                        return;
                    }
                    container.css("transform", "translate3D(0, -" + (--curIndex) * $window.height() + "px, 0)");
                }
            });
        },
        init:function() {
            if(!util.isMobile()) {
                $('.index_video iframe').attr('src',"//player.bilibili.com/player.html?aid=913458631&bvid=BV12M4y1x7FF&cid=1196851048&page=1&autoplay=0");
                var lang = $.session.get('lang');
                if(lang === 'EN') {                     
                    $('.router_btn a').each(function(i,item) {
                        var en = $(item).attr('data-lang');
                        $(item).text(en) 
                    })
                }
                this.scrollEvent()
            }else{
                this.touchEvent()
            }
        }
    }.init()
})