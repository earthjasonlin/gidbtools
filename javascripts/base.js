$(function() {
  var base = {
    event:function() {
        var _this = this;
        $('.nav-small').click(function() {
            var ele = $(this).find('.nav-con');
            if(ele.is(":visible")) {
                ele.hide();
            }else {
                ele.show();
            }
        })

        $('nav a,.nav-small a').click(function() {
            if($('#BGM').length) {
                $.session.set('audioTime',$('#BGM')[0].currentTime)
            }
        })
        $('.audio_contral img').click(function() {
            var isPlay = $(this).attr('src').includes('audio_on') ? true : false;
            $.session.set('isPlay',isPlay);
            _this.audioPlay();
        })

        $('.translate a').click(function() {
            if($(this).hasClass('active')) {
                return;
            }
            $(this).addClass('active').siblings('a').removeClass('active')
            var lang = $(this).attr('data-id');
            if(lang === 'EN') {
                translate.changeLanguage('english');
                translate.execute();
                $('nav a').each(function(i,item) {
                    var en = $(item).attr('data-lang');
                    $(item).text(en)  
                });
                $('.nav-con a').each(function(i,item) {
                    var en = $(item).attr('data-lang');
                    $(item).find('span').text(en)  
                });
                if($('.kingdom').length || $('.schedule schedule').length || $('.tlsub').length) {
                    window.location.reload();
                }
            }else {
                translate.changeLanguage('chinese_simplified');
            }
            $.session.set('lang',lang);
            console.log(lang)
        })

    },
    audioPlay:function() {
        var ele = $('#BGM');
        if(!ele.length) {
            return;
        }
        if(ele.attr('src') === '') {
            ele.attr('src',ele.attr('data-src'))
        }
        var BGM = ele[0];
        var img = $('.audio_contral').find('img'); 
        var isPlay = $.session.get('isPlay')==='true' ? true : false;
        if(!isPlay) {
            img[0].src = '/images/audio_on.png';
            BGM.pause();
            return;
        }
       BGM.currentTime = $.session.get('audioTime') ? Number($.session.get('audioTime')) : 0;
       if(BGM.paused) {
            img[0].src = '/images/audio.png';
            BGM.play();
       }else {
            img[0].src = '/images/audio_on.png';
            BGM.pause()
       }
    },
     translateLang: function() {
        if(!$('.translate a').length) {
            return;
        }
        util.loadScript('/javascripts/plug/translate.js','translate_script',function() {
            translate.setUseVersion2();
            translate.language.setLocal('chinese_simplified'); 
            translate.listener.start();
            translate.ignore.tag.push('popmask');         
            var lang = $.session.get('lang');
            if(lang === 'EN') {
                translate.execute();
                $('.translate a').removeClass('active');
                $('.translate a').eq(1).addClass('active');
                $('nav a').each(function(i,item) {
                    var en = $(item).attr('data-lang');
                    $(item).text(en)  
                });
                $('.nav-con a').each(function(i,item) {
                    var en = $(item).attr('data-lang');
                    $(item).find('span').text(en)  
                });           
            }
            //   translate.listener.renderTaskFinish = function(task){
            //     console.log('执行完一次');
            
            // }
        })
    },
    init: function() {
        this.event();
        this.translateLang();
        this.audioPlay()
    }
   }.init()
})