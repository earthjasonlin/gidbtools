$(function () {
    var MONSTERID = $('#MONSTERID').val();
    var INTERVAL = $('.com_result input[name="interval"]').val();
    var lang = $.session.get('lang') === 'EN' ? 'EN' : 'CH';
    var last_legal_input = "12-3"
    var last_legal_input_2 = "12-3"
    $('h3 .title').text(computer.MiscText.ComputerTitle[lang])
    $('h3 .subtitle').html(computer.MiscText.Computer_Subtitle[lang])
    $('h3 .tlsub').html(computer.MiscText.Translate[lang])
    $('.calculate').text(computer.MiscText.Computer_Button_Calculate[lang]);
    $('input[name="level"]').attr('placeholder', computer.MiscText.Computer_Input_OverworldPlaceholder[lang]);
    $('input[name="interval"]').attr('placeholder', computer.MiscText.Computer_Input_Placeholder[lang]);
    $('.download').html(computer.MiscText.Computer_Download[lang])
    $('.download').click(function () {
        downloadImage(`/images/Abyss/HP.jpg`, `HP.jpg`);
    });
    $('.kingdom').render({
        data: computer.Kingdoms,
        template: {
            kingdom: function (d) {
                return d.data.Name[lang]
            },
            a: { 'data-id': '[[ID]]', class: 'kingdom_[[ID]]' },
            event: {
                click: function (d) {
                    if ($(d.sender).hasClass('active')) {
                        return;
                    }
                    $(d.sender).addClass('active').siblings('kingdom').removeClass('active');
                    monsterRender(d.org_data.Classes);
                }
            }
        }
    })
    $('.com_result button').click(function () {
        var ele = $('.class_monster').find('.active');
        if (!ele.length) {
            return dialog.fail(computer.MiscText.Computer_Warning_NotSelectedMonster[lang]);
        }
        var regLevel = /^([1-9]|[1-9]\d|1\d{2}|200)$/;
        var regInterval = /^(9|1[0-2])-[1-3]$/;
        //var selectVal = $('.com_result select').val();            去除了 大世界/深渊 的选择
        //var level = $('input[name="level"]').val().trim();        永久隐藏大世界等级输入框
        var interval = $('input[name="interval"]').val().trim();
        /*
        if (selectVal === "大世界" && !regLevel.test(level)) {
            return dialog.fail(computer.MiscText.Computer_Warning_OverworldInputIllegal[lang]);
        }
        if (selectVal === "深渊" && !regInterval.test(interval)) {
            return dialog.fail(computer.MiscText.Computer_Warning_AbyssInputIllegal[lang]);
        }
        */
        if (regLevel.test(interval)) {
            selectVal = "大世界";
            level = parseInt(interval);     // 后面还要用到这个变量，不能删
            last_legal_input = interval
        } else if (regInterval.test(interval)) {
            selectVal = "深渊";
            last_legal_input = interval
        } else {
            $('input[name="interval"]').val(last_legal_input)
            var interval = last_legal_input;
            if (regLevel.test(interval)) {
                selectVal = "大世界";
                level = parseInt(interval);
            } else if (regInterval.test(interval)) {
                selectVal = "深渊";
            } else {
                return
            }
        }
        var data = computer.Monsters[ele.attr('data-id')]
        var choose_icon = data.Icon[Math.floor(Math.random() * data.Icon.length)]
        $('.result').empty().render({
            data: data,
            template: [{
                div: [{
                    // img: '/images/monster/' + choose_icon + '.png',
                }, {
                    div: [{
                        h5: function (d) {
                            if (d.data.UseCustomColorName) {
                                return computer.MonsterCustomColorNameConfig[ele.attr('data-id')][lang]
                            }
                            return d.data.Name[lang]
                        },
                        style: {
                            color: function (d) {
                                return computer.TextColorConfig[d.data.Color] || '';
                            }
                        }
                    }, {
                        p: {
                            span: `[[${lang}]]`,
                        },
                        datapath: 'Title',
                        class: 'title'
                    }, {
                        div: [{
                            span: function (d) {
                                var Grade = d.data.Grade ? d.data.Grade : 0
                                return "<b><color style='color:" + computer.GradeConfig[Grade].Color + ";'>" + computer.GradeConfig[Grade].Desc[lang] + "</color></b>"
                            }
                        }, {
                            span: function (d) {
                                var lv = selectVal === "深渊" ? interval : 'LV' + level;
                                return lv
                            }
                        }, {
                            span: $('select[name="multiplayer"] option:selected').text()
                        }]
                    }, {
                        div: [{
                            span: [lang === 'EN' ? "HP：" : "生命值：", {
                                i: function (d) {
                                    var lv = selectVal === "深渊" ? computer.SpiralAbyssFloorEntryToLevelCoeffConfig[interval].Level : level;
                                    var hpc = selectVal === "深渊" && !d.data.NotAffectedBySpiralAbyss ? computer.SpiralAbyssFloorEntryToLevelCoeffConfig[interval].HPCoeff : 1;
                                    var a = computer.LevelCurves[lv][d.data.HPCurve];
                                    var mpid = d.data.MultiPlayerID ? d.data.MultiPlayerID : 1
                                    var mpnum = $('select[name="multiplayer"]').val()
                                    var mpcoeff = computer.MultiPlayerConfig[mpid.toString()].HP[mpnum]
                                    var num = a * d.data.HP * hpc * mpcoeff;
                                    return num.toFixed(0)
                                }
                            }]
                        }, {
                            span: [lang === 'EN' ? "ATK：" : "攻击力：", {
                                i: function (d) {
                                    var lv = selectVal === "深渊" ? computer.SpiralAbyssFloorEntryToLevelCoeffConfig[interval].Level : level;
                                    var a = computer.LevelCurves[lv][d.data.ATKCurve];
                                    var extra = selectVal === "深渊" ? (d.data.ExtraSpiralAbyssCoeff && d.data.ExtraSpiralAbyssCoeff.ATK || 1) : 1;
                                    var mpid = d.data.MultiPlayerID ? d.data.MultiPlayerID : 1
                                    var mpnum = $('select[name="multiplayer"]').val()
                                    var mpcoeff = computer.MultiPlayerConfig[mpid.toString()].ATK[mpnum]
                                    var num = a * d.data.ATK * extra * mpcoeff;
                                    return num.toFixed(0)
                                }
                            }]
                        }]
                    }, {
                        span: "<b><color style='color:#0066FF;'>" + computer.MiscText.Computer_Show[lang] + "</color></b>",
                        class: 'logoshow',
                        style: {
                            'font-size': '15px',
                        }
                    }, ],
                    style: {
                        padding: '20px'
                    }
                }, {
                    div: [
                        {
                            button: computer.MiscText.Computer_Result_Button_Tutorial[lang],
                            when: function (d) {
                                return d.data.Tutorial && !(d.data.DisableTutorial)
                            },
                            click: function (p) {
                                poplayer({
                                    header: computer.MiscText.Computer_Result_Button_Tutorial2[lang],
                                    width: '80%',
                                    template: {
                                        div: function (d) {
                                            $(d.container).html(p.org_data.Tutorial[lang])
                                        },
                                        style: {
                                            'white-space': 'pre-wrap',
                                            'padding': '10px',
                                            'line-height': 2
                                        },
                                        class: 'ignore'
                                    }
                                })
                            }
                        },
                        {
                            button: computer.MiscText.Computer_Result_Button_SkillDMG[lang],
                            when: function (d) {
                                return d.data.SkillDMG && d.data.SkillDMG.length
                            },
                            click: function (p) {
                                poplayer({
                                    header: computer.MiscText.Computer_SkillDMG_Title[lang],
                                    width: '80%',
                                    data: p.org_data,
                                    template: {
                                        div: [
                                            {
                                                div: [
                                                    {
                                                        f1: [
                                                            {
                                                                label: computer.MiscText.Computer_SkillDMG_MonsterLevel[lang],
                                                                width: '100%'
                                                            }, 
                                                            {
                                                                input: 'mon_level',
                                                                a: { 
                                                                    type: 'text', 
                                                                    placeholder: computer.MiscText.Computer_SkillDMG_Input_MonsterLevelPlaceholder[lang] 
                                                                },
                                                                width: '90%',
                                                                style: {
                                                                    'text-align': 'center',
                                                                    'font-size': '15px'
                                                                }
                                                            }
                                                        ]
                                                    }, 
                                                    {
                                                        f1: [
                                                            {
                                                                label: computer.MiscText.Computer_SkillDMG_AvatarDEF[lang],
                                                                width: '100%'
                                                            },
                                                            {
                                                                input: 'dff',
                                                                a: {
                                                                    type: 'number',
                                                                    placeholder: computer.MiscText.Computer_SkillDMG_Input_AvatarDEFPlaceholder[lang] 
                                                                },
                                                                width: '90%',
                                                                style: {
                                                                    'text-align': 'center',
                                                                    'font-size': '15px'
                                                                }
                                                            }
                                                        ]
                                                    }, {
                                                        button: computer.MiscText.Computer_SkillDMG_Button_Calculate[lang],
                                                        click: function (d) {
                                                            var regLevel = /^([1-9]|[1-9]\d|1\d{2}|200)$/;
                                                            var regInterval = /^(9|1[0-2])-[1-3]$/;
                                                            var level = $(d.sender).parents('.skill_warp_input').find('input[name="mon_level"]').val();
                                                            var isAbyss = false;
                                                            if (regLevel.test(level)) {
                                                                level = parseInt(level);
                                                                isAbyss = false;
                                                            } else if (regInterval.test(level)) {
                                                                level = computer.SpiralAbyssFloorEntryToLevelCoeffConfig[level].Level;
                                                                isAbyss = true;
                                                            } else {
                                                                $(d.sender).parents('.skill_warp_input').find('input[name="mon_level"]').val(last_legal_input_2)
                                                                level = last_legal_input_2
                                                                if (regLevel.test(level)) {
                                                                    level = parseInt(level);
                                                                    isAbyss = false;
                                                                } else if (regInterval.test(level)) {
                                                                    level = computer.SpiralAbyssFloorEntryToLevelCoeffConfig[level].Level;
                                                                    isAbyss = true;
                                                                } else {
                                                                    return;
                                                                }
                                                            }
                                                            var dff = $(d.sender).parents('.skill_warp_input').find('input[name="dff"]').val().trim();
                                                            var LevelBase = computer.LevelCurves[level][d.org_data.ATKCurve];
                                                            var ele = $('.skill_warp').find('.DMG_td span');
                                                            ele.each(function (i, item) {
                                                                var Multiplier = Number($(item).attr('data-num'));
                                                                var n = Multiplier * Number(LevelBase) * ((500 + 5 * Number(level)) / (500 + 5 * Number(level) + parseInt(dff)))
                                                                if (isAbyss) {
                                                                    n *= (d.org_data.ExtraSpiralAbyssCoeff && d.org_data.ExtraSpiralAbyssCoeff.ATK || 1)
                                                                }
                                                                $(item).text(Math.floor(n))
                                                            })
                                                            ele.show()
                                                        }
                                                    }],
                                                class: 'skill_warp_input'
                                            }, {
                                                table: [{
                                                    thead: {
                                                        tr: [{
                                                            th: computer.MiscText.Computer_SkillDMG_NameColumnTitle[lang]
                                                        }, {
                                                            th: computer.MiscText.Computer_SkillDMG_DMGColumnTitle[lang]
                                                        }, {
                                                            th: computer.MiscText.Computer_SkillDMG_CalculateColumnTitle[lang]
                                                        }]
                                                    }
                                                }, {
                                                    tbody: [{
                                                        tr: [
                                                            {
                                                                td: `[[Name/${lang}]]`,
                                                                style: {
                                                                    'font-size': '17px'
                                                                }
                                                            },
                                                            {
                                                                td: {
                                                                    span: '[[.]]',
                                                                    datapath: 'DMG',
                                                                    style: {
                                                                        'font-size': '17px'
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                td: {
                                                                    span: '',
                                                                    a: {
                                                                        'data-num': '[[.]]'
                                                                    },
                                                                    datapath: 'DMG',
                                                                    style: {
                                                                        'font-size': '17px'
                                                                    }
                                                                },
                                                                class: 'DMG_td'
                                                            }
                                                        ],
                                                        datapath: 'SkillDMG'
                                                    }]
                                                }]
                                            }],
                                        class: 'skill_warp'
                                    }
                                })
                            }
                        },
                        {
                            button: computer.MiscText.Computer_Result_Button_SkillData[lang],
                            when: function (d) {
                                return d.data.SkillData
                            },
                            click: function (p) {
                                poplayer({
                                    header: computer.MiscText.Computer_Result_Button_SkillData2[lang],
                                    width: '80%',
                                    data: p.org_data,
                                    template: {
                                        div: {
                                            img: '/images/SkillData/[[.]].jpg',
                                            datapath: 'SkillData'
                                        },
                                        class: 'SkillData'
                                    }
                                })
                            }
                        },
                        {
                            button: computer.MiscText.Computer_Result_Button_Loot[lang],
                            click: function (d) {
                                poplayer({
                                    header: computer.MiscText.Computer_Result_Button_Loot[lang],
                                    width: '40%',
                                    data: d.org_data,
                                    template: {
                                        table: [{
                                            thead: { tr: [{ th: "" }, { th: "1★" }, { th: "2★" }, { th: "3★" }, { th: "4★" }] }
                                        }, {
                                            tbody: [{
                                                tr: [{
                                                    td: function (d) {
                                                        return computer.MonsterDropTypes[d.data.Type][lang]
                                                    }
                                                }, function (d) {
                                                    $(d.container).render({
                                                        data: d.data.Amount,
                                                        template: {
                                                            td: '[[.]]'
                                                        }
                                                    })
                                                }],
                                                datapath: 'Drop'
                                            }]
                                        }],
                                        class: 'ignore'
                                    }
                                })
                            },
                            when: function (d) {
                                return d.data.Drop && d.data.Drop.length
                            }
                        },
                        {
                            button: computer.MiscText.Computer_Result_Button_Element[lang],
                            click: function (p) {
                                poplayer({
                                    header: computer.MiscText.Computer_Result_Button_Element[lang],
                                    width: '40%',
                                    template: {
                                        div: function (d) {
                                            var elem_info = computer.ElemNameConfig[p.org_data.Element.Type]
                                            var content = computer.MiscText.Computer_Result_Element_Type[lang] + "<color style='color:" + computer.TextColorConfig[elem_info.Color] + ";'><b>" + elem_info.Text[lang] + "</b></color><br>" + 
                                                computer.MiscText.Computer_Result_Element_Value[lang] + "<color style='color:" + computer.TextColorConfig[elem_info.Color] + ";'><b>" + p.org_data.Element.Value.toString() + "</b></color>" +
                                                (p.org_data.Element.Immutable ? ("<br><br><b>" + computer.MiscText.Computer_Result_Element_Immutable[lang]) + "</b>": "")
                                            $(d.container).html(content)
                                        },
                                        style: {
                                            'white-space': 'pre-wrap',
                                            'padding': '10px'
                                        },
                                        class: 'ignore'
                                    }
                                })
                            },
                            when: function (d) {
                                return d.data.Element
                            }
                        }
                    ]
                }],
                class: 'result_head'
            }, {
                div: [{
                    table: [{
                        thead: {
                            tr: [{
                                th: computer.MiscText.Computer_Result_RESBaseTitle[lang]
                            }, {
                                th: function (d) {
                                    var s = d.data.State;
                                    return computer.RESStateDescTextConfig[s] && computer.RESStateDescTextConfig[s][lang] || "状态未知"
                                },
                                datapath: 'RESState',
                                when: function (d) {
                                    return d.data.RESState && d.data.RESState.length;
                                }
                            }, {
                                th: function (d) {
                                    var s = d.data.State;
                                    return computer.RESStateDescTextConfig[s] && computer.RESStateDescTextConfig[s][lang] || "变化未知"
                                },
                                datapath: 'RESModify',
                                when: function (d) {
                                    return d.data.RESModify && d.data.RESModify.length;
                                }
                            }]
                        }
                    }, {
                        tbody: function (p) {
                            $(p.container).render({
                                data: computer.RESTypeConfig,
                                template: {
                                    tr: [{
                                        td: [function (d) {
                                            return '<span class="res' + lang + '">' + d.data.Text[lang] + '</span>'
                                        }, function (d) {
                                            var resbase = p.data.RESBase && p.data.RESBase[d.data._id] || 0.1;
                                            var immune = p.data.Immune ? p.data.Immune : []
                                            if (immune.includes(d.data._id)) {
                                                var ret =  '<b>' + computer.MiscText.Computer_Result_Immune[lang] + '</b>'
                                            } else {
                                                var ret = resbase * 100 + '%'
                                            }
                                            return (lang == 'EN' ? '\t\t\t' : '') + ret
                                        }],
                                        style: {
                                            color: function (d) {
                                                var color = d.data.Color || '';
                                                return computer.TextColorConfig[color];
                                            }
                                        }
                                    }, function (d) {
                                        if (p.data.RESState && p.data.RESState.length) {
                                            $(d.container).render({
                                                data: p.data.RESState,
                                                template: {
                                                    td: [function (a) {
                                                        var resbase = p.data.RESBase && p.data.RESBase[d.data._id] * 100 || 0.1 * 100;
                                                        if (a.data['All']) {
                                                            resbase = resbase + a.data['All'] * 100;
                                                        }
                                                        if (a.data[d.data._id]) {
                                                            resbase = resbase + a.data[d.data._id] * 100;
                                                        }
                                                        var immune = a.data.Immune ? a.data.Immune : []
                                                        if (immune.includes(d.data._id)) {
                                                            var ret =  '<b>' + computer.MiscText.Computer_Result_Immune[lang] + '</b>'
                                                        } else {
                                                            var ret = resbase + '%'
                                                        }
                                                        return ret
                                                    }],
                                                    style: {
                                                        color: function (a) {
                                                            var color = d.data.Color || '';
                                                            return computer.TextColorConfig[color];
                                                        }
                                                    }
                                                }
                                            })
                                        }
                                        if (p.data.RESModify && p.data.RESModify.length) {
                                            if ($(d.container).parents('tbody').attr(`${d.data.State}-modify`) == 1) {
                                                return;
                                            }

                                            $(d.container).render({
                                                data: p.data.RESModify,
                                                template: {
                                                    td: `[[Show/${lang}]]`,
                                                    a: {
                                                        rowspan: computer.RESTypeConfig.length
                                                    },
                                                    style: {
                                                        'text-align': "center"
                                                    }
                                                }
                                            })
                                            $(d.container).parents('tbody').attr(d.data.State + '-modify', 1);
                                        }

                                    }]
                                }
                            })
                        }
                    }],
                    class: 'table-1'
                }, {
                    table: [{
                        thead: {
                            tr: [{
                                th: computer.MiscText.Computer_Result_BallTitle[lang]
                            }, {
                                th: computer.MiscText.Computer_Result_WeightEndureTitle[lang]
                            }]
                        }
                    }, {
                        tbody: function (d) {
                            var ball = d.data.Ball;
                            var mpnum = $('select[name="multiplayer"]').val()
                            var mpid = d.data.MultiPlayerID ? d.data.MultiPlayerID : 1
                            var mpcoeff = computer.MultiPlayerConfig[mpid.toString()].Endure[mpnum]
                            var row = Number(ball && ball.Point || 0) < 4 ? 4 : ball && ball.Point;
                            var rowArr = new Array(row);
                            var endure_extra = d.data.EndureExtra ? d.data.EndureExtra : 1
                            var endure = ((computer.EndureTemplateConfig[d.data.EndureTemplateID] && computer.EndureTemplateConfig[d.data.EndureTemplateID].Endure) * mpcoeff * endure_extra).toFixed(5).toString().replace('.00000', '')
                            if (endure.includes(".")) {
                                endure = endure.replace('000', '')
                            }
                            var wane = ((computer.EndureTemplateConfig[d.data.EndureTemplateID] && (computer.EndureTemplateConfig[d.data.EndureTemplateID].Wane1 / computer.EndureTemplateConfig[d.data.EndureTemplateID].Wane2 * endure_extra)) * mpcoeff).toFixed(5).toString().replace('.00000', '').replace('000', '')
                            for (var i = 0; i < rowArr.length; i++) {
                                rowArr[i] = {
                                    pointDes: computer.BallPointDescConfig[ball && ball.Point] && computer.BallPointDescConfig[ball && ball.Point][i] || { "CH": "", "EN": "" },
                                    type: computer.BallTypeDescConfig[ball && ball.Type] || {},
                                    drop: ball && ball.Drop.split('')[i] || false
                                }
                            }
                            rowArr[0].WE = {
                                text: computer.MiscText.Computer_Result_Weight,
                                num: d.data.Weight.toFixed(0)
                            }
                            rowArr[1].WE = {
                                text: computer.MiscText.Computer_Result_Endure,
                                num: endure
                            }
                            rowArr[2].WE = {
                                text: computer.MiscText.Computer_Result_EndureRecover,
                                num: wane
                            }
                            rowArr[3].WE = {
                                text: computer.MiscText.Computer_Result_EndureReset,
                                num: computer.EndureTemplateConfig[d.data.EndureTemplateID] && computer.EndureTemplateConfig[d.data.EndureTemplateID].Recover.toFixed(0)
                            }
                            $(d.container).render({
                                data: rowArr,
                                template: {
                                    tr: [{
                                        td: function (d) {
                                            if (d.data.drop === false) {
                                                return ''
                                            }
                                            $(d.container).render({
                                                data: d.data,
                                                template: [`[[pointDes/${lang}]]`, {
                                                    span: `[[type/Text/${lang}]]`,
                                                    style: {
                                                        color: function (d) {
                                                            return computer.TextColorConfig[d.data.type.Color] || '';
                                                        }
                                                    }
                                                }, 'x[[drop]]']
                                            })
                                        }
                                    }, {
                                        td: `[[WE/text/${lang}]][[WE/num]]`
                                    }]
                                }
                            })
                            $(d.container).render({
                                template: {
                                    tr: [{
                                        td: {
                                            button: computer.MiscText.Computer_Result_Button_BallIntro[lang],
                                            click: function (p) {
                                                poplayer({
                                                    header: computer.MiscText.Computer_Result_Button_BallIntro2[lang],
                                                    width: '65%',
                                                    template: {
                                                        div: function (d) {
                                                            $(d.container).html(computer.MiscText.Computer_Result_Window_BallIntro[lang])
                                                        },
                                                        style: {
                                                            'white-space': 'pre-wrap',
                                                            'padding': '10px'
                                                        },
                                                        class: 'ignore'
                                                    }
                                                })
                                            }
                                        },
                                    }, {
                                        td: {
                                            button: computer.MiscText.Computer_Result_Button_WeightEndureIntro[lang],
                                            click: function (p) {
                                                poplayer({
                                                    header: computer.MiscText.Computer_Result_Button_WeightEndureIntro2[lang],
                                                    width: '55%',
                                                    template: {
                                                        div: function (d) {
                                                            $(d.container).html(computer.MiscText.Computer_Result_Window_WeightEndureIntro[lang])
                                                        },
                                                        style: {
                                                            'white-space': 'pre-wrap',
                                                            'padding': '10px'
                                                        },
                                                        class: 'ignore'
                                                    }
                                                })
                                            }
                                        }
                                    }],
                                    style: {
                                        "text-align": "center"
                                    }
                                }
                            })
                        }
                    }],
                    class: 'table-2'
                }],
                class: 'mon_table'
            }, {
                p: `[[Desc/${lang}]]`,
                class: 'mon_intro',
                style: {
                    'line-height': 2
                }
            }, {
                img: "images/Csxylic/[[Csxylic]].png",
                data: data,
                when: function (d) {
                    return d.data.Csxylic && d.data.Csxylic.length;
                },
                style: {
                    width: '100%',
                    'object-fit': 'scale-down'
                }
            }]
        })
        $('.scroller').scrollTop($('.scroller')[0].scrollHeight - $('.com_result').height() - 150)
    })
    if (!MONSTERID) {
        $('.kingdom').find('kingdom').eq(99).addClass('active');
        monsterRender(computer.Kingdoms[7].Classes);
    } else {
        var m_object = computer.Monsters[MONSTERID];
        if (m_object && (m_object.KingdomID || m_object.KingdomID === 0)) {
            var ele = $('.kingdom').find(`.kingdom_${m_object.KingdomID}`);
            ele.addClass('active');
            monsterRender(computer.Kingdoms[ele.index()].Classes, function () {
                $('.class_monster').find(`.monster_${MONSTERID}`).addClass('active');
                $('.calculate').click();
            });
        }
    }
    function monsterRender(p, cd) {
        $('.class_monster').empty().render({
            data: p,
            template: [{
                category: [{
                    text: function (d) {
                        return d.data.Name[lang]
                    }
                }, {
                    monster: {
                        span: function (d) {
                            var monster = computer.Monsters[d.data]
                            var choose_icon = monster.Icon[Math.floor(Math.random() * monster.Icon.length)]
                            $(d.container).render({
                                data: monster,
                                template: [{
                                    // img: '/images/monster/' + choose_icon + '.png',
                                    style: {
                                        'border-color': function (d) {
                                            var grade = d.data.Grade;
                                            return computer.GradeConfig[grade].Color;
                                        }
                                    }
                                }, function (d) {
                                    return d.data.Name[lang]
                                }]
                            })
                        },
                        a: {
                            "data-id": '[[.]]',
                            class: 'monster_[[.]]'
                        },
                        datapath: 'Monsters',
                        event: {
                            click: function (d) {
                                $('.class_monster').find('span').removeClass('active');
                                $(d.sender).addClass('active');
                                if (!$('.com_result input[name="interval"]').val()){
                                    $('.com_result input[name="interval"]').val(last_legal_input)
                                }
                                $('.calculate').click();
                            }
                        }
                    }
                }],
                class: 'clearfix',
                a: { 'data-id': '[[ID]]' }
            }
            ]
        })
        cd && cd();
    }

    $("body").on("change", 'select[name="multiplayer"]', function() {
        $('.calculate').click();
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
    
    /* 不再切换大世界输入框和深渊输入框，只用深渊输入框，CSS也做了相应改动
    $('.com_result select').change(function () {
        $(this).siblings('input').hide();
        if ($(this).val() === "大世界") {
            $(this).siblings('input[name="level"]').show();
        } else {
            $(this).siblings('input[name="interval"]').show();
        }
    })
    */
})