var util = {
    role: ['刻晴', '皇女', '纳西妲', '万叶', '九条裟罗', '琦良良', '白术', '温迪', '砂糖', '钟离', '八重', '琴', '班尼特', '荧', '空', '柯莱', '瑶瑶', '久岐忍', '缇纳里', '莫娜', '夜兰', '阿贝多', '心海', '芭芭拉', '重云', '申鹤', '心海', '坎蒂丝', '迪奥娜', '香菱', '行秋', '北斗', '多莉', '神里凌华','神里绫人', '胡桃', '优菈', '雷泽', '流浪者', '辛焱', '雷电将军', '七七', '迪希雅', '埃洛伊', '云堇', '凯亚', '安柏', '女仆', '米卡', '赛诺', '荒泷一斗', '宵宫', '凝光', '丽莎', '艾尔海森', '魈', '莱依拉', '五郎', '罗莎莉亚', '甘雨', '妮露', '珐露珊', '鹿野苑平藏', '烟绯', '可莉', '迪卢克'],
    weapon: {
    Sword:['磐岩结绿', '圣显之钥', '裁叶萃光', '苍古自由之誓', '天空之刃', '雾切之回光', '斫峰之刃', '风鹰剑', '波乱月白经津', '暗巷闪光', '腐殖之剑', '试作斩岩', '黑剑', '黑岩长剑', '西福斯的月光', '西风剑', '降临之剑', '笼钓瓶一心', '原木刀', '匣里龙吟', '祭礼剑', '天目影打刀', '东花纺时雨', '辰砂之纺锤', '笛剑', '铁蜂刺', '宗室长剑', '黎明神剑', '吃虎鱼刀', '飞天御剑', '冷刃', '暗铁剑', '旅行剑', '银剑', '无锋剑'],
    Zweihander : ['苇海信标', '狼的末路', '无工之剑', '松籁响起之时', '天空之傲', '赤角石溃杵', '宗室大剑', '黑岩斩刀', '祭礼大剑', '雨裁', '白影剑', '衔珠海皇', '恶王丸', '千岩古剑', '森林王器', '钟剑', '玛海菈的水色', '桂木斩长正', '试作古华', '饰铁之花', '西风大剑', '雪葬的星银', '螭骨剑', '沐浴龙血的剑', '以理服人', '飞天大御剑', '铁影阔剑', '白铁大剑', '佣兵重剑', '训练大剑'],
    Polearms : ['薙草之稻光', '息灾', '贯虹之槊', '天空之脊', '和璞鸢', '赤沙之杖', '护摩之杖', '流月针', '宗室猎枪', '断浪长鳍', '龙脊长枪', '决斗之枪', '喜多院十文字', '风信之锋', '黑岩刺枪', '西风长枪', '试作星镰', '千岩长枪', '贯月矢', '渔获', '匣里灭辰', '黑缨枪', '白缨枪', '钺矛', '铁尖枪', '新手长枪'],    
    Musical : ['四风原典', '不灭月华', '神乐之真意', '图莱杜拉的回忆', '千夜浮梦', '尘世之锁', '天空之卷', '暗巷的酒与诗', '盈满之实', '嘟嘟可故事集', '万国诸海图谱', '昭心', '证誓之明瞳', '白辰之环', '黑岩绯玉', '祭礼残章', '试作金珀', '忍冬之果', '西风秘典', '匣里日月', '流浪乐章', '宗室秘法录', '流浪的晚星', '异世界行记', '讨龙英杰谭', '魔导绪论', '甲级宝珏', '翡玉法球', '口袋魔导书', '学徒笔记'],
    Bow: ['终末嗟叹之诗', '阿莫斯之弓', '猎人之径', '天空之翼', '冬极白星', '若水', '飞雷之弦振', '试作澹月', '王下近侍', '曚云之月', '宗室长弓', '黑岩战弓', '竭泽', '西风猎弓', '钢轮弓', '幽夜华尔兹', '弓藏', '风花之颂', '绝弦', '苍翠猎弓', '落霞', '掠食者', '祭礼弓', '暗巷猎手', '破魔之弓', '弹弓', '信使', '鸦羽弓', '神射手之誓', '反曲弓', '历练的猎弓', '猎弓']},
    pageFun: function(r, callback) {
        $(r.container).empty();
        $(r.container).render({
            data: r.data,
            template: r.data.pageCount ? {
                e: 'pager',
                t: [
                    '共[[totalSize]]条记录 ',
                    {
                        e: 'button',
                        t: function(d) {
                            $(d.container).text('上一页');
                            if (d.data.page === 1) {
                                $(d.container).addClass('disable');
                            }
                        },
                        click: function(d) {
                            var page = d.org_data.page;
                            if (page > 1) {
                                callback(page - 1);
                            }
                        }
                    },
                    {
                        e: 'select',
                        a: { name: 'select_page' },
                        t: function(d) {
                            var pageArr = [];
                            if (d.data.pageCount > 0) {
                                for (var i = 0; i < d.data.pageCount; i++) {
                                    pageArr.push({ page: '第' + (i + 1) + '页' });
                                }
                                $(d.container).render({
                                    data: pageArr,
                                    e: '',
                                    template: [{
                                        e: 'option',
                                        value: '[[page]]',
                                        t: function(r) {
                                            $(r.container).text(r.data.page);
                                            if (r.data.page == '第' + d.data.page + '页') {
                                                $(r.container).attr({ selected: 'selected' });
                                            }
                                        }
                                    }]
                                });
                            }
                        },
                        event: {
                            change: function(d) {
                                var page = parseInt(
                                    $(d.sender)
                                    .val()
                                    .substr(1, $(d.sender).val().length - 2)
                                );
                                callback(page);
                            }
                        }
                    },
                    {
                        e: 'button',
                        t: function(d) {
                            $(d.container).text('下一页');
                            if (d.data.page === d.data.pageCount || !d.data.pageCount) {
                                $(d.container).addClass('disable');
                            }
                        },
                        click: function(d) {
                            var page = d.org_data.page;
                            if (page < d.org_data.pageCount) {
                                callback(page + 1);
                            }
                        }
                    }
                ],
                style: { 'margin-bottom': '30px', 'vertical-align': 'middle', color: 'black' }
            } : ''
        });
    },
    isMobile: function() {
        var userAgentInfo = navigator.userAgent;
        var mobileAgents = [ "Android", "iPhone", "SymbianOS", "Windows Phone", "iPad","iPod"];
        var mobile_flag = false;
        //根据userAgent判断是否是手机
        for (var v = 0; v < mobileAgents.length; v++) {
            if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
                mobile_flag = true;
                break;
            }
        }
         var screen_width = window.screen.width;
         var screen_height = window.screen.height;    
         //根据屏幕分辨率判断是否是手机
         if(screen_width < 500 && screen_height < 800){
             mobile_flag = true;
         }
         return mobile_flag;
    },
    loadScript:function(jsfile,className,callback){
        if(document.getElementsByClassName(className)[0]) {
            callback();
            return
        }
        var head= document.getElementsByTagName('head')[0];
        var script= document.createElement('script');
        script.type= 'text/javascript';
        script.src= jsfile;
        script.className = className;
        head.appendChild(script);
        script.onload = script.onreadystatechange = function() {
            if (!this.readyState || this.readyState === "loaded" ||    this.readyState === "complete" ) {
                script.onload = script.onreadystatechange = null;
                if(callback&&typeof(callback)== 'function'){
                      callback();
     
                }
            }
        };
     
    },
    DateRange:function(value){
        var year,week;
        var month;
        var result = { };
        var s_month=["04","06","09","11"];
        var b_month=["01","03","05","07","08","10","12"];
        if ((/^(\d{4}-\d{2})$/).test(value)){ 				//月份选择
            year = parseInt(value.substring(0, 4));
            month = value.substring(5, 7);
            result.startDate=year+"-"+month+"-"+"01";
            if(s_month.indexOf(month)>-1){ //小月
                result.endDate=year+"-"+month+"-"+"30";
            }
            else if(b_month.indexOf(month)>-1){ //大月
                result.endDate=year+"-"+month+"-"+"31";
            }
            else if(month=="02"){ //2月
                if(year%4!=0)
                    result.endDate=year+"-"+month+"-"+"28";
                else
                    result.endDate=year+"-"+month+"-"+"29";
            }
        }
        else if (value.indexOf("W") != -1){ 			//周选择
            year = parseInt(value.substring(0, 4));
            week = parseInt(value.substring(6, 8));
            var days=week*7;
            var f=year+"-01-01";
            var first= new Date(f).getDay();//一年第一天周几
            var offset=first==1?0:first-1;//偏移
            var monthDays=(year%4==0)?[0,31,29,31,30,31,30,31,31,30,31,30,31]:[0,31,28,31,30,31,30,31,31,30,31,30,31]
            for(month=0;days>0;month++){
                days-=monthDays[month];
            }
            month-=1;
            days+=monthDays[month]-offset;//在原先理解的基础上算出的某一周最后一天,偏移后就是某一周最后一天的日期
            result.endDate=year+"-"+month+"-"+days;
            if(days-6>0)//起始日期是否同一个月
                days=days-6;
            else{
                days=6-days;
                if(month-1<1){ //回到上一年
                    year-=1;
                    month=12;
                }
                else month-=1;
                days=monthDays[month]-days;
            }
            result.startDate=year+"-"+month+"-"+days;
        }
       return result;
    },
    gettWeek:function(dateTime) {
        let temptTime = dateTime
        let weekday = temptTime.getDay() || 7
        //周1+5天=周六
        temptTime.setDate(temptTime.getDate() - weekday + 1 + 5)
        let firstDay = new Date(temptTime.getFullYear(), 0, 1)
        let dayOfWeek = firstDay.getDay()
        let spendDay = 1
        if (dayOfWeek != 0) {
          spendDay = 7 - dayOfWeek + 1
        }
        firstDay = new Date(temptTime.getFullYear(), 0, 1 + spendDay)
        let d = Math.ceil((temptTime.valueOf() - firstDay.valueOf()) / 86400000)
        let result = Math.ceil(d / 7)
        return result
    },
    getBeforeDate:function(n,date) {
        var n = n;
        var d = new Date(date || new Date());
        var year = d.getFullYear();
        var mon = d.getMonth() + 1;
        var day = d.getDate();
        if (day <= n) {
            if (mon > 1) {
                mon = mon - 1;
            }else {
                year = year - 1;
                mon = 12;
            }
        }
        d.setDate(d.getDate() - n);
        year = d.getFullYear();
        mon = d.getMonth() + 1;
        day = d.getDate();
        s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
        return s;
    },
    format:function(timestamp) {
        var date = new Date(timestamp * 1000);
        var Y = date.getFullYear() + "-";
        var M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        var D =
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
        var h =
          (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      
        var m =
          (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
          ":";
        var s =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
    },
    parseURL:function(url) {
         var a = document.createElement('a');
          a.href = url;
          return {
            source: url,
            protocol: a.protocol.replace(':',''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function(){
              var ret = {},
                seg = a.search.replace(/^\?/,'').split('&'),
                len = seg.length, i = 0, s;
              for (;i<len;i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
              }
              return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
            hash: a.hash.replace('#',''),
            path: a.pathname.replace(/^([^\/])/,'/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
            segments: a.pathname.replace(/^\//,'').split('/')
          };
    },
        
}