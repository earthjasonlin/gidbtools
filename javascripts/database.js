$(function () {
    var lang = $.session.get('lang') === 'EN' ? 'EN' : 'CH';
    $('.tls' + lang).css("color", "#df903b");
    var currentSpiralAbyss = computer.SpiralAbyssSchedule[0].Name;
    var non_break = 1;
    var now;
    for (var i_ = 1; non_break && i_ <= computer.SpiralAbyssSchedule.length; i_++) {
        now = computer.SpiralAbyssSchedule[computer.SpiralAbyssSchedule.length - i_];
        if (!now.Name.includes("t")) {
            currentSpiralAbyss = now.Name;
            currentGeneration = now.Generation
            non_break = 0;
        }
    }
    var V_OPTIONS = {
        'CH': [ '正式服', '测试服v1', '测试服v2', '测试服v3', '测试服v4', '测试服v5', '测试服v6', 'test' ],
        'EN': [ 'Live', 'Beta v1', 'Beta v2', 'Beta v3', 'Beta v4', 'Beta v5', 'Beta v6', 'test' ]
    }
    //var qwq = { 0: 0, 1: 6, 2: 5, 3: 4, 4: 3, 5: 2, 6: 1 }
    $('h3 .title').text(computer.MiscText.AbyssTitle[lang])
    $('h3 .subtitle').html(computer.MiscText.Subtitle[lang])
    $('h3 .links').html(computer.MiscText.Abyss_Links[lang])
    $('h3 .tlsub').html(computer.MiscText.Translate[lang])
    $('container').render({
        template: [{
            div: [{
                section: function (d) {
                    $(d.container).render({
                        data: computer.SpiralAbyssGenerationConfig,
                        template: {
                            schedule: function (p) {
                                return p.data.Name[lang]
                            },
                            a: {
                                class: function (d) {
                                    return d.data._id === currentGeneration ? 'activeg' : ''
                                },
                                'data-id': function (d) {
                                    return d.data._id
                                },
                            }
                        }
                    })
                },
                class: 'generation'
            }, {
                section: function (d) {
                    $(d.container).render({
                        data: computer.SpiralAbyssSchedule,
                        template: {
                            schedule: '[[Name]]',
                            a: {
                                class: function (d) {
                                    gen = d.data.Generation
                                    return d.data.Name === currentSpiralAbyss ? 'active' + ' gg g' + gen : 'gg g' + gen
                                },
                                'data-json': function (d) {
                                    return JSON.stringify(d.data)
                                },
                                style: function (d) {
                                    var dsp = d.data.Generation == currentGeneration ? '' : 'none'
                                    return 'display:' + dsp + ";"
                                }
                            }
                        }
                    })
                },
                class: 'schedule'
            }, {
                section: renderResult,
                class: 'result'
            }],
            class: 'content'
        }]
    })

    $(document).on('click', '.schedule schedule', function () {
        var _this = $(this);
        if (_this.hasClass('active')) {
            return;
        }
        _this.addClass('active').siblings('schedule').removeClass('active');
        renderResult()
    })

    $(document).on('click', '.generation schedule', function () {
        var _this = $(this);
        if (_this.hasClass('activeg')) {
            return;
        }
        _this.addClass('activeg').siblings('schedule').removeClass('activeg');
        sVersion(_this.attr('data-id'))
    })

    function sVersion(generation) {
        $('.gg').hide();
        $('.g' + generation).show()
    }

    function renderResult() {
        var sData = JSON.parse($('schedule.active').attr('data-json'));
        var Phases = sData.Phases;
        var Blessings = sData.Blessings;
        var Floors = sData.Floors
        var Download = sData.Download;
        var p_b = [];
        Phases.forEach(function (item, i) {
            var a = {
                p_name: computer.SpiralAbyssPhaseConfig[item][lang],
                b: computer.SpiralAbyssBlessingConfig[Blessings[i]]
            }
            if (a.b.ShockWaveConfig && a.b.ShockWaveConfig.length) {
                var a_f = []
                Floors.forEach(function (item) {
                    a_f.push(computer.SpiralAbyssFloorConfig[item])
                })
                a.b.ShockWaveConfig.forEach(function (item) {
                    item.a_f = a_f;
                })
            }
            p_b.push(a)
        })
        function downloadImage(path, imgName) {
            var _OBJECT_URL;
            var request = new XMLHttpRequest();
            request.addEventListener('readystatechange', function (e) {
                if (request.readyState == 4) {
                    _OBJECT_URL = URL.createObjectURL(request.response);
                    var $a = $("<a></a>").attr("href", _OBJECT_URL).attr("download", imgName);
                    $a[0].click();
                }
            });
            request.responseType = 'blob';
            request.open('get', path);
            request.send();
        }
        $('.result').empty().render({
            template: [{
                h4: [{
                    span: sData.Name
                }, {
                    em: sData.OpenTime
                }/*, {
                    div: function (d) {
                        $(d.container).render({
                            data: Download,
                            template: {
                                button: function (d) {
                                    return "<b>" + computer.MiscText.Abyss_Button_Download[lang] + " " + d.data + "</b>"
                                },
                                click: function (d) {
                                    downloadImage(`/images/Abyss/${d.org_data}.jpg`, `${d.org_data}.jpg`);
                                },
                                style: {
                                    'font-size': '17px',
                                    'height': '36px',
                                    'color': '#0066FF'
                                }
                            }
                        })
                    },
                    when: function (d) {
                        return Download && Download.length
                    },
                    style: {
                        'display': 'flex',
                        'flex-wrap': 'wrap',
                        'justify-content': 'space-evenly'
                    }
                }*/]
            }, {
                section: function (d) {
                    $(d.container).render({
                        data: computer.MiscText.Abyss_Select,
                        template: {
                            span: `[[${lang}]]`,
                            a: { 'data-s': `[[${lang}]]` },
                            click: function (d) {
                                if ($(d.sender).hasClass('active')) {
                                    return
                                }
                                var text = $(d.sender).attr('data-s');
                                var s = computer.MiscText.Abyss_Select[1];
                                var h = computer.MiscText.Abyss_Select[0];
                                $(d.sender).addClass('active').siblings('span').removeClass('active');
                                if (h[lang] === text) {
                                    $('.p_b').hide();
                                    $('.p_h').show();
                                    $('.a_floor').hide();
                                } else if (s[lang] === text) {
                                    $('.p_b').show();
                                    $('.p_h').hide();
                                    $('.a_floor').hide();
                                } else {
                                    $('.p_b').hide();
                                    $('.p_h').hide();
                                    renderFloor(Floors[$(d.sender).index() - 2])
                                }
                            }
                        }
                    })
                    $(d.container).find('span').eq(0).addClass('active');
                },
                class: 'a_select'
            }, {
                section: function (d) {
                    var SpiralAbyssDPSDatas = computer.SpiralAbyssDPSData;
                    for (var i = 0; i < SpiralAbyssDPSDatas.length; i++) {
                        $(d.container).render({
                            template: {
                                div: function (d) {
                                    var chartDom = d.container;
                                    var myChart = echarts.init(chartDom);
                                    var SpiralAbyssDPSData = SpiralAbyssDPSDatas[i];
                                    var label_array = [];
                                    var value_array = [];
                                    for (var j = 0; j < SpiralAbyssDPSData.Data.length; j++) {
                                        label_array.push(SpiralAbyssDPSData.Data[j].Ver)
                                        value_array.push(SpiralAbyssDPSData.Data[j].DPS)
                                    }
                                    var option = {
                                        title: {
                                            text: SpiralAbyssDPSData.Title[lang],
                                            subtext: SpiralAbyssDPSData.SubTitle[lang],
                                            left: 'center'
                                        },
                                        tooltip: {},
                                        xAxis: {
                                            data: label_array,
                                            axisLabel: {
                                                interval: 0,
                                                rotate: 40
                                            }
                                        },
                                        yAxis: {},
                                        series: [
                                            {
                                                type: "bar",
                                                data: value_array,
                                                color: SpiralAbyssDPSData.Color
                                            }
                                        ]
                                    }
                                    myChart.setOption(option);
                                },
                                class: 'eachets'
                            }
                        })
                    }
                },
                class: 'p_h'
            }, {
                section: function (d) {
                    $(d.container).render({
                        data: p_b,
                        template: {
                            div: [{
                                p: `<b>[[p_name]] - [[b/Name/${lang}]]</p>`
                            }, {
                                p: `[[b/Desc/${lang}]]`
                            }, {
                                ul: {
                                    li: [{
                                        p: `[[ShockWaveDesc/${lang}]]`
                                    }, {
                                        ul: {
                                            li: {
                                                span: ['[[Name]]：', { em: 0 }],
                                                a: { 'data-level': '[[Level]]' },
                                                datapath: 'Chambers',
                                            },
                                            datapath: 'a_f',
                                            when: function (d) {
                                                return d.data.a_f && d.data.a_f.length
                                            }
                                        },
                                        a: { 'data-ra': '[[ShockWaveDMG]]' },
                                        class: 's_w_f'
                                    }],
                                    datapath: 'b/ShockWaveConfig',
                                },
                                class: 'p_b_ul',
                                when: function (d) {
                                    return d.data.b.ShockWaveConfig && d.data.b.ShockWaveConfig.length
                                }
                            }]
                        }
                    })
                },
                class: 'p_b'
            }, {
                section: '',
                class: 'a_floor'
            }]
        })

        $('.s_w_f').find('li span').each(function (i, item) {
            var ra = $(item).parents('.s_w_f').attr('data-ra');
            var Level = $(item).attr('data-level');
            $(item).find('em').text(Math.floor(Number(ra) * computer.LevelCurves[Level]['5']))
        })
    }

    function renderFloor(index) {
        cur_floor_showver = computer.SpiralAbyssFloorConfig[index].ShowVers ? computer.SpiralAbyssFloorConfig[index].ShowVers : [0]
        show_vops = {}
        for (var j = 0; j < cur_floor_showver.length; j++) {
            show_vops[V_OPTIONS[lang][cur_floor_showver[j]]] = cur_floor_showver[j]
        }
        if (Math.min(...cur_floor_showver)) {
            var selected = Math.max(...cur_floor_showver)
        } else {
            var selected = 0
        }
        $('.a_floor').empty().render({
            data: computer.SpiralAbyssFloorConfig[index],
            template: [{
                h5: `[[Disorder/${lang}]]`
            }, {
                ul: {
                    li: [{
                        h6: [{
                            p: ['[[Name]] LV[[Level]] ', function (d) {
                                return computer.SpiralAbyssGoalTypeTemplateConfig[d.data.GoalType][lang]
                            }],
                            style: {
                                'font-size': '18px',
                            }
                        }, {
                            span: computer.MiscText.Abyss_Reminder[lang],
                            style: {
                                'display': 'block',
                                'color': '#6f6f6f',
                                'font-weight': '500',
                                'font-size': '14px',
                                'line-height': '25px'
                            }
                        }],
                        a: {
                            'data-name': '[[Name]]'
                        }
                    }, {
                        div: [{
                            button: computer.MiscText.Abyss_Chamber_Button_Buff[lang],
                            click: bufferPop
                        }, {
                            select: '',
                            options: show_vops,
                            style: {
                                'text-align': 'center',
                                width: '100px'
                            },
                            class: 'version-choose',
                        }, {
                            button: computer.MiscText.Abyss_Chamber_Button_Cond[lang],
                            click: condPop
                        }],
                        class: 'a_floor_button'
                    }, {
                        div: [{
                            div: [
                                function(p) {
                                    var ver_list = p.data.GadgetVers;
                                    if (!ver_list) {
                                        var this_class = 'u_l_g'
                                    } else {
                                        var this_class = 'u_l_g sw'
                                        for (var j = 0; j < ver_list.length; j++) {
                                            this_class = this_class.concat(' sw-' + ver_list[j].toString())
                                        }
                                    }
                                    $(p.container).render({
                                        div: {
                                            span: [
                                                function (d) {
                                                    return computer.SpiralAbyssGadgetDescConfig[d.data.Gadgets[0]].Show.Text[lang]
                                                },
                                                {
                                                    i: function (d) {
                                                        return computer.MiscText.Abyss_Show[lang] + "<br><br>" + computer.SpiralAbyssGadgetDescConfig[d.data.Gadgets[0]].Hover[lang]
                                                    },
                                                    when: function (d) {
                                                        return computer.SpiralAbyssGadgetDescConfig[d.data.Gadgets[0]].Hover
                                                    },
                                                    width: '450px'
                                                }
                                            ],
                                            style: {
                                                'font-weight': function (d) {
                                                    return computer.SpiralAbyssGadgetDescConfig[d.data.Gadgets[0]].Show.Bold ? 600 : 500
                                                },
                                                color: function (d) {
                                                    var color = computer.SpiralAbyssGadgetDescConfig[d.data.Gadgets[0]].Show.Color || '';
                                                    return computer.TextColorConfig[color];
                                                }
                                            }
                                        },
                                        when: function (d) {
                                            return d.data.Gadgets && d.data.Gadgets.length && d.data.Gadgets[0]
                                        },
                                        click: function (d) {
                                            var hover =  computer.SpiralAbyssGadgetDescConfig[d.org_data.Gadgets[0]].Hover[lang]
                                            if (!hover) {
                                                return;
                                            }
                                            poplayer({
                                                header: computer.SpiralAbyssGadgetDescConfig[d.org_data.Gadgets[0]].Show.Text[lang],
                                                width: '50%',
                                                height: '400px',
                                                template: {
                                                    div: "<span style='font-size:13px'><b>" + computer.MiscText.Abyss_Show[lang] + "</b></span><br><br>" + hover
                                                },
                                                class: 'need_header'
                                            })
                                        },
                                        class: this_class
                                    });
                                },
                                {
                                    ul: {
                                        li: function (p) {
                                            var weav = computer.SpiralAbyssWaveDescConfig[p.data.WaveDesc];
                                            var extraDesc = p.data.ExtraDesc && p.data.ExtraDesc[lang];
                                            var monsters = p.data.Monsters;
                                            var ver_list = p.data.Vers;
                                            if (!ver_list) {
                                                var this_class = ''
                                            } else {
                                                var this_class = 'sw'
                                                for (var j = 0; j < ver_list.length; j++) {
                                                    this_class = this_class.concat(' sw-' + ver_list[j].toString())
                                                }
                                            }
                                            $(p.container).render({
                                                data: { monsters: monsters },
                                                template: [{
                                                    div: [{
                                                        span: [weav.Show.Text[lang], {
                                                            i: weav.Hover && weav.Hover[lang],
                                                            when: function () {
                                                                return weav.Hover && weav.Hover[lang]
                                                            },
                                                            width: '240px'
                                                        }],
                                                        class: 'weav_hover'
                                                    }, {
                                                        span: extraDesc,
                                                        when: function () {
                                                            return extraDesc
                                                        },
                                                        style: {
                                                            color: '#808080',
                                                            "font-size": '12px'
                                                        }
                                                    }],
                                                    class: this_class
                                                }, {
                                                    ol: {
                                                        li: [{
                                                            monster: function (m) {
                                                                var monster = computer.Monsters[m.data.ID];
                                                                var monsterId = m.data.ID;
                                                                var num = m.data.Num;
                                                                var mask = m.data.Mark || false;
                                                                var hpDown = m.data.HPDown || false;
                                                                var hpOverride = m.data.HPOverride;
                                                                var choose_icon = monster.Icon[Math.floor(Math.random() * monster.Icon.length)]
                                                                if (!monster) {
                                                                    return;
                                                                }
                                                                $(m.container).render({
                                                                    data: monster,
                                                                    template: [{
                                                                        div: [{
                                                                            a: function (d) {
                                                                                var interval = $(d.container).parents('.up_low').siblings('h6').attr('data-name')
                                                                                return '/computer?monster=' + monsterId + '&interval=' + interval
                                                                            },
                                                                            t: [{
                                                                                // img: '/images/monster/' + choose_icon + '.png',
                                                                            }, {
                                                                                span: [{
                                                                                    em: '*',
                                                                                    style: {
                                                                                        "font-style": "normal",
                                                                                        "font-weight": "600",
                                                                                        "color": "#000"
                                                                                    },
                                                                                    when: function () {
                                                                                        return mask;
                                                                                    }
                                                                                }, function (d) {
                                                                                    if (d.data.UseCustomColorName) {
                                                                                        return computer.MonsterCustomColorNameConfig[monsterId][lang]
                                                                                    }
                                                                                    return d.data.Name[lang]
                                                                                }],
                                                                                style: {
                                                                                    color: function (d) {
                                                                                        return computer.TextColorConfig[d.data.Color] || '';
                                                                                    }
                                                                                },
                                                                                class: 'monster-name'
                                                                            }, {
                                                                                span: ' x' + num
                                                                            },
                                                                            {
                                                                                em: ' *',
                                                                                style: {
                                                                                    "font-style": "normal",
                                                                                    "font-weight": "600",
                                                                                    "color": "#000"
                                                                                },
                                                                                when: function () {
                                                                                    return mask;
                                                                                },
                                                                                class: 'monster-name-ast'
                                                                            }
                                                                            ],
                                                                            attr: { target: '_blank', title: '点击前往详情' }
                                                                        }, {
                                                                            span: function (d) {
                                                                                var affix = m.data.Affix;
                                                                                $(d.container).render({
                                                                                    data: affix,
                                                                                    template: {
                                                                                        span: [
                                                                                            {
                                                                                                em: function (d) {
                                                                                                    return computer.SpiralAbyssAffixDescConfig[d.data].Show.Text[lang]
                                                                                                },
                                                                                                click: function (d) {
                                                                                                    var hover = computer.SpiralAbyssAffixDescConfig[d.org_data].Hover && (computer.SpiralAbyssAffixDescConfig[d.org_data].Hover[lang]);
                                                                                                    if (!hover) {
                                                                                                        return;
                                                                                                    }
                                                                                                    poplayer({
                                                                                                        header: computer.SpiralAbyssAffixDescConfig[d.org_data].Show.Text[lang],
                                                                                                        width: '50%',
                                                                                                        height: '400px',
                                                                                                        template: {
                                                                                                            div: "<p style='font-size:13px;color:#FFCC44;text-align:center;padding-bottom:12px'>" + computer.MiscText.Abyss_Show[lang] + "</p>" + hover
                                                                                                        },
                                                                                                        class: 'need_header'
                                                                                                    })
                                                                                                }
                                                                                            }, {
                                                                                                i: function (d) {
                                                                                                    var hover = computer.SpiralAbyssAffixDescConfig[d.data].Hover && (computer.MiscText.Abyss_Show[lang] + "<br><br>" + computer.SpiralAbyssAffixDescConfig[d.data].Hover[lang])
                                                                                                    return hover
                                                                                                },
                                                                                                when: function (d) {
                                                                                                    return computer.SpiralAbyssAffixDescConfig[d.data].Hover && computer.SpiralAbyssAffixDescConfig[d.data].Hover[lang]
                                                                                                },
                                                                                                width: '270px'
                                                                                            }],
                                                                                        style: {
                                                                                            color: function (d) {
                                                                                                var color = computer.SpiralAbyssAffixDescConfig[d.data].Show.Color;
                                                                                                return computer.TextColorConfig[color] || '';
                                                                                            },
                                                                                            'font-weight': function (d) {
                                                                                                return computer.SpiralAbyssAffixDescConfig[d.data].Show.Bold ? 600 : 500;
                                                                                            }
                                                                                        },
                                                                                        class: 'affix_s_h',
                                                                                    }
                                                                                })
                                                                            },
                                                                            when: function () {
                                                                                return m.data.Affix && m.data.Affix.length
                                                                            }
                                                                        }]
                                                                    }, {
                                                                        div: [{
                                                                            em: '↓',
                                                                            when: function () {
                                                                                return hpDown
                                                                            },
                                                                            style: {
                                                                                'margin-right': "10px"
                                                                            }
                                                                        }, {
                                                                            span: function (d) {
                                                                                var interval = $(d.container).parents('.up_low').siblings('h6').attr('data-name')
                                                                                var lv = computer.SpiralAbyssFloorEntryToLevelCoeffConfig[interval].Level;
                                                                                var hpc = computer.SpiralAbyssFloorEntryToLevelCoeffConfig[interval].HPCoeff;
                                                                                var a = computer.LevelCurves[lv][d.data.HPCurve];
                                                                                var hp = hpOverride ? hpOverride : d.data.HP;
                                                                                var num = a * hp * hpc;
                                                                                return num.toFixed(0);
                                                                            }
                                                                        }],
                                                                        style: {
                                                                            display: 'flex',
                                                                            'align-items': 'center',
                                                                            'margin-left': '5px',
                                                                        }
                                                                    }]
                                                                })
                                                            }
                                                        }],
                                                        datapath: 'monsters'
                                                    },
                                                    class: this_class
                                                }]
                                            })
                                        },
                                        datapath: 'Upper'
                                    },
                                    class: 'u_l_w'
                                }
                            ],
                            class: 'upper'
                        },
                        {
                            div: [
                                function(p) {
                                    var ver_list = p.data.GadgetVers;
                                    if (!ver_list) {
                                        var this_class = 'u_l_g'
                                    } else {
                                        var this_class = 'u_l_g sw'
                                        for (var j = 0; j < ver_list.length; j++) {
                                            this_class = this_class.concat(' sw-' + ver_list[j].toString())
                                        }
                                    }
                                    $(p.container).render({
                                        div: {
                                            span: [function (d) {
                                                return computer.SpiralAbyssGadgetDescConfig[d.data.Gadgets[1]].Show.Text[lang]
                                            }, {
                                                i: function (d) {
                                                    return computer.MiscText.Abyss_Show[lang] + "<br><br>" + computer.SpiralAbyssGadgetDescConfig[d.data.Gadgets[1]].Hover[lang]
                                                },
                                                when: function (d) {
                                                    return computer.SpiralAbyssGadgetDescConfig[d.data.Gadgets[1]].Hover
                                                },
                                                width: '450px'
                                            }],
                                            style: {
                                                'font-weight': function (d) {
                                                    return computer.SpiralAbyssGadgetDescConfig[d.data.Gadgets[1]].Show.Bold ? 600 : 500
                                                },
                                                color: function (d) {
                                                    var color = computer.SpiralAbyssGadgetDescConfig[d.data.Gadgets[1]].Show.Color || '';
                                                    return computer.TextColorConfig[color];
                                                }
                                            }
                                        },
                                        when: function (d) {
                                            return d.data.Gadgets && d.data.Gadgets.length && d.data.Gadgets[1]
                                        },
                                        click: function (d) {
                                            var hover = computer.SpiralAbyssGadgetDescConfig[d.org_data.Gadgets[1]].Hover[lang]
                                            if (!hover) {
                                                return;
                                            }
                                            poplayer({
                                                header: computer.SpiralAbyssGadgetDescConfig[d.org_data.Gadgets[1]].Show.Text[lang],
                                                width: '50%',
                                                height: '400px',
                                                template: {
                                                    div: "<span style='font-size:13px'><b>" + computer.MiscText.Abyss_Show[lang] + "</b></span><br><br>" + hover
                                                },
                                                class: 'need_header'
                                            })
                                        },
                                        class: 'u_l_g'
                                    });
                                },
                                {
                                    ul: {
                                        li: function (p) {
                                            var weav = computer.SpiralAbyssWaveDescConfig[p.data.WaveDesc];
                                            var extraDesc = p.data.ExtraDesc && p.data.ExtraDesc[lang];
                                            var monsters = p.data.Monsters;
                                            var ver_list = p.data.Vers;
                                            if (!ver_list) {
                                                var this_class = ''
                                            } else {
                                                var this_class = 'sw'
                                                for (var j = 0; j < ver_list.length; j++) {
                                                    this_class = this_class.concat(' sw-' + ver_list[j].toString())
                                                }
                                            }
                                            $(p.container).render({
                                                data: { monsters: monsters },
                                                template: [{
                                                    div: [{
                                                        span: [weav.Show.Text[lang], {
                                                            i: weav.Hover && weav.Hover[lang],
                                                            when: function () {
                                                                return weav.Hover && weav.Hover[lang]
                                                            },
                                                            width: '240px'
                                                        }],
                                                        class: 'weav_hover'
                                                    }, {
                                                        span: extraDesc,
                                                        when: function () {
                                                            return extraDesc
                                                        },
                                                        style: {
                                                            'font-weight': function (d) {
                                                                return weav.Show.Bold ? 600 : 500
                                                            },
                                                            color: function (d) {
                                                                var color = weav.Show.Color;
                                                                return computer.TextColorConfig[color] || '#808080';
                                                            },
                                                            "font-size": '12px'
                                                        }
                                                    }],
                                                    class: this_class
                                                }, {
                                                    ol: {
                                                        li: [{
                                                            monster: function (m) {
                                                                var monster = computer.Monsters[m.data.ID];
                                                                var monsterId = m.data.ID;
                                                                var num = m.data.Num;
                                                                var mask = m.data.Mark || false;
                                                                var hpDown = m.data.HPDown || false;
                                                                var hpOverride = m.data.HPOverride;
                                                                var choose_icon = monster.Icon[Math.floor(Math.random() * monster.Icon.length)]
                                                                if (!monster) {
                                                                    return;
                                                                }
                                                                $(m.container).render({
                                                                    data: monster,
                                                                    template: [{
                                                                        div: [{
                                                                            a: function (d) {
                                                                                var interval = $(d.container).parents('.up_low').siblings('h6').attr('data-name')
                                                                                return '/computer?monster=' + monsterId + '&interval=' + interval
                                                                            },
                                                                            t: [{
                                                                                // img: '/images/monster/' + choose_icon + '.png',
                                                                            }, {
                                                                                span: [{
                                                                                    em: '*',
                                                                                    style: {
                                                                                        "font-style": "normal",
                                                                                        "font-weight": "600",
                                                                                        "color": "#000"
                                                                                    },
                                                                                    when: function () {
                                                                                        return mask;
                                                                                    }
                                                                                }, function (d) {
                                                                                    if (d.data.UseCustomColorName) {
                                                                                        return computer.MonsterCustomColorNameConfig[monsterId][lang]
                                                                                    }
                                                                                    return d.data.Name[lang]
                                                                                }],
                                                                                style: {
                                                                                    color: function (d) {
                                                                                        return computer.TextColorConfig[d.data.Color] || '';
                                                                                    }
                                                                                },
                                                                                class: 'monster-name'
                                                                            }, {
                                                                                span: ' x' + num,
                                                                                whne: function () {
                                                                                    return num
                                                                                }
                                                                            },
                                                                            {
                                                                                em: ' *',
                                                                                style: {
                                                                                    "font-style": "normal",
                                                                                    "font-weight": "600",
                                                                                    "color": "#000"
                                                                                },
                                                                                when: function () {
                                                                                    return mask;
                                                                                },
                                                                                class: 'monster-name-ast'
                                                                            }],
                                                                            attr: { target: '_blank', title: '点击前往详情' }
                                                                        }, {
                                                                            span: function (d) {
                                                                                var affix = m.data.Affix;
                                                                                $(d.container).render({
                                                                                    data: affix,
                                                                                    template: {
                                                                                        span: [{
                                                                                            em: function (d) {
                                                                                                return computer.SpiralAbyssAffixDescConfig[d.data].Show.Text[lang]
                                                                                            },
                                                                                            click: function (d) {
                                                                                                var hover = computer.SpiralAbyssAffixDescConfig[d.org_data].Hover && (computer.SpiralAbyssAffixDescConfig[d.org_data].Hover[lang]);
                                                                                                if (!hover) {
                                                                                                    return;
                                                                                                }
                                                                                                poplayer({
                                                                                                    header: computer.SpiralAbyssAffixDescConfig[d.org_data].Show.Text[lang],
                                                                                                    width: '50%',
                                                                                                    height: '400px',
                                                                                                    template: {
                                                                                                        div: "<p style='font-size:13px;color:#FFCC44;text-align:center;padding-bottom:12px'>" + computer.MiscText.Abyss_Show[lang] + "</p>" + hover
                                                                                                    },
                                                                                                    class: 'need_header'
                                                                                                })
                                                                                            }
                                                                                        }, {
                                                                                            i: function (d) {
                                                                                                var hover = computer.SpiralAbyssAffixDescConfig[d.data].Hover && (computer.MiscText.Abyss_Show[lang] + "<br><br>" + computer.SpiralAbyssAffixDescConfig[d.data].Hover[lang])
                                                                                                return hover
                                                                                            },
                                                                                            when: function (d) {
                                                                                                return computer.SpiralAbyssAffixDescConfig[d.data].Hover && computer.SpiralAbyssAffixDescConfig[d.data].Hover[lang]
                                                                                            },
                                                                                            width: '270px'
                                                                                        }],
                                                                                        style: {
                                                                                            color: function (d) {
                                                                                                var color = computer.SpiralAbyssAffixDescConfig[d.data].Show.Color;
                                                                                                return computer.TextColorConfig[color] || '';
                                                                                            },
                                                                                            'font-weight': function (d) {
                                                                                                var bold = computer.SpiralAbyssAffixDescConfig[d.data].Show.Bold;
                                                                                                return bold ? 600 : 500;
                                                                                            }
                                                                                        },
                                                                                        class: 'affix_s_h',
                                                                                    }
                                                                                })
                                                                            },
                                                                            when: function () {
                                                                                return m.data.Affix && m.data.Affix.length
                                                                            }
                                                                        }]
                                                                    }, {
                                                                        div: [{
                                                                            em: '↓',
                                                                            when: function () {
                                                                                return hpDown
                                                                            },
                                                                            style: {
                                                                                'margin-right': "10px"
                                                                            }
                                                                        }, {
                                                                            span: function (d) {
                                                                                var interval = $(d.container).parents('.up_low').siblings('h6').attr('data-name')
                                                                                var lv = computer.SpiralAbyssFloorEntryToLevelCoeffConfig[interval].Level;
                                                                                var hpc = computer.SpiralAbyssFloorEntryToLevelCoeffConfig[interval].HPCoeff;
                                                                                var a = computer.LevelCurves[lv][d.data.HPCurve];
                                                                                var hp = hpOverride ? hpOverride : d.data.HP;
                                                                                var num = a * hp * hpc;
                                                                                return num.toFixed(0);
                                                                            }
                                                                        }],
                                                                        style: {
                                                                            display: 'flex',
                                                                            'align-items': 'center',
                                                                            'margin-left': '5px',
                                                                        }
                                                                    }]
                                                                })
                                                            }
                                                        }],
                                                        datapath: 'monsters'
                                                    },
                                                    class: this_class
                                                }]
                                            })
                                        },
                                        datapath: 'Lower'
                                    },
                                    class: 'u_l_w'
                                }
                            ],
                            class: 'lower'
                        }
                        ],
                        class: 'up_low'
                    }],
                    datapath: 'Chambers'
                }
            }]
        })
        $('.a_floor').show();
        $('.version-choose').val(selected);
        toggle_ver_instant(selected);
    }

    function bufferPop(d) {
        poplayer({
            header: "",
            width: '90%',
            data: d.org_data.Buff,
            template: {
                ul: [{
                    li: {
                        ol: {
                            li: function (d) {
                                var s_a_b = computer.SpiralAbyssBuffDescConfig[d.data];
                                $(d.container).render({
                                    data: s_a_b,
                                    template: [
                                        {
                                            img: '/images/monster/[[Icon]].png',
                                            class: 'b_icon'
                                        },
                                        {
                                            span: `[[LastingTypeDesc/Text/${lang}]]`,
                                            style: {
                                                color: function (d) {
                                                    var color = d.data.LastingTypeDesc.Color || '';
                                                    return computer.TextColorConfig[color];
                                                }
                                            }
                                        }, {
                                            span: `[[EffectDesc/${lang}]]`,
                                            class: 'buffer_desc'
                                        }]
                                })
                            },
                            datapath: 'Buff1'
                        }
                    },
                    class: 'buff_1'
                }, {
                    li: {
                        ol: {
                            li: function (d) {
                                var s_a_b = computer.SpiralAbyssBuffDescConfig[d.data];
                                $(d.container).render({
                                    data: s_a_b,
                                    template: [
                                        {
                                            img: '/images/monster/[[Icon]].png',
                                            class: 'b_icon'
                                        },
                                        {
                                            span: `[[LastingTypeDesc/Text/${lang}]]`,
                                            style: {
                                                color: function (d) {
                                                    var color = d.data.LastingTypeDesc.Color || '';
                                                    return computer.TextColorConfig[color];
                                                }
                                            }
                                        }, {
                                            span: `[[EffectDesc/${lang}]]`,
                                            class: 'buffer_desc'
                                        }]
                                })
                            },
                            datapath: 'Buff2'
                        }
                    },
                    class: 'buff_2'
                }, {
                    li: {
                        ol: {
                            li: function (d) {
                                var s_a_b = computer.SpiralAbyssBuffDescConfig[d.data];
                                $(d.container).render({
                                    data: s_a_b,
                                    template: [
                                        {
                                            img: '/images/monster/[[Icon]].png',
                                            class: 'b_icon'
                                        },
                                        {
                                            span: `[[LastingTypeDesc/Text/${lang}]]`,
                                            style: {
                                                color: function (d) {
                                                    var color = d.data.LastingTypeDesc.Color || '';
                                                    return computer.TextColorConfig[color];
                                                }
                                            }
                                        }, {
                                            span: `[[EffectDesc/${lang}]]`,
                                            class: 'buffer_desc'
                                        }]
                                })
                            },
                            datapath: 'Buff3'
                        }
                    },
                    class: 'buff_3'
                }],
                class: 'buffer_pop'
            },
            class: 'buffer_poplayer'
        })
    }

    function condPop(d) {
        var data = {
            GoalType: computer.SpiralAbyssGoalTypeTemplateConfig[d.org_data.GoalType],
            GoalParam: computer.SpiralAbyssGoalParamTemplateConfig[d.org_data.GoalParam]
        }
        poplayer({
            header: computer.SpiralAbyssGoalTypeTemplateConfig[d.org_data.GoalType][lang],
            width: '40%',
            data: data,
            template: {
                div: [{
                    ul: {
                        li: `[[${lang}]]`,
                        datapath: 'GoalParam'
                    }
                }],
                class: 'cond_pop'
            },
            class: 'need_header'
        })
    }

    function toggle_ver_fade(select_value) {
        select_class = '.sw-' + select_value.toString();
        $('.sw').fadeOut(600);
        $(select_class).delay(800).fadeIn(600);
    }

    function toggle_ver_instant(select_value) {
        select_class = '.sw-' + select_value.toString();
        $('.sw').hide();
        $(select_class).show();
    }

    $("body").on("change", ".version-choose", function(){
        select_value = $(this).val();
        $('.version-choose').val(select_value);
        toggle_ver_instant(select_value)
    });

    $("body").on("mouseenter", ".u_l_g span,.affix_s_h,.weav_hover", function () {
        $(this).find("i").show();
    });
    $("body").on("mouseleave", ".u_l_g span,.affix_s_h,.weav_hover", function () {
        $(this).find("i").hide();
    });

    
    $('.tlsub').ready(function () {
        $('.tls').css("color", "#ffffff");
        $('.tls' + lang).css("color", "#df903b");
    });
    $("body").on("click", ".tlsCH", function() {
        $("a[data-id='CN']").click()
    });
    $("body").on("click", ".tlsEN", function() {
        $("a[data-id='EN']").click()
    });

    /*
    $(".tlsub").ready(function() {
        $('.tls').css("color", "#ffffff");
        $('.tls' + lang).css("color", "#df903b");
    });

    $("body").on("click", ".tlsCH", function() {
        $("a[data-id='CN']").click()
        $("*").css("font-family", "")
    });
    $("body").on("click", ".tlsEN", function() {
        $("a[data-id='EN']").click()
        $('.tls').css("color", "#ffffff");
        $('.tls' + lang).css("color", "#df903b");
        $("*").css("font-family", "")
    });
    $("body").on("click", ".tlsXZ", function() {
        $("a[data-id='EN']").click().delay(3000);
        $('.tls').css("color", "#ffffff");
        $('.tlsXZ').css("color", "#df903b");
        $("*").css("font-family", "Custom");
        $(".tls").css("font-family", "");
    });
    */
})