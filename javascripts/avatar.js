$(function () {

    var lang = $.session.get('lang') === 'EN' ? 'EN' : 'CH';
    var isp = 0
    var is_calc = 1
    var current_name = ""
    var battle_show_stat = 1
    colors = {
        "Fire": "#FF9999",
        "Water": "#80C0FF",
        "Elec": "#FFACFF",
        "Ice": "#99FFFF",
        "Grass": "#99FF88",
        "Wind": "#80FFD7",
        "Rock": "#FFE699",
        "Grey": ""
    }

    var char_id_list = {}
    for (var o = 0; o < computer2.AvatarInfoConfig.length; o++) {
        char_id_list[computer2.AvatarInfoConfig[o]._name] = o
    }

    var reg = /^([1-9]|[1-8]\d|90)$/;

    $('.tls' + lang).css("color", "#df903b");
    $('h3 .title').text(computer.MiscText.Avatar_Title[lang])
    $('h3 .subtitle').html(computer.MiscText.Subtitle[lang])
    $('h3 .links').html(computer.MiscText.Avatar_Links[lang])
    $('h3 .tlsub').html(computer.MiscText.Translate[lang])

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

    $('container').render({
        template: {
            div: [
                {
                    p: computer.MiscText.Avatar_Reminder[lang],
                    style: {
                        'text-align': 'center',
                        'font-size': '20px',
                        'margin-bottom': '20px'
                    }
                },
                {
                    div: {
                        table: [
                            {
                                thead: [
                                    {
                                        tr: function (d) {
                                            $(d.container).render({
                                                data: computer.MiscText.Avatar_Table_Header,
                                                template: {
                                                    th: `[[${lang}]]`
                                                }
                                            })
                                        }
                                    }
                                ]
                            },
                            {
                                tbody: function (d) {
                                    $(d.container).render({
                                        data: computer2.AvatarInfoConfig,
                                        template: {
                                            tr: [
                                                // {
                                                //     td: function (p) {
                                                //         avname = p.data.Icon
                                                //         $(p.container).render({
                                                //             template: {
                                                //                 img: 'images/Avatar/' + avname + '.png',
                                                //                 style: {
                                                //                     height: '100px',
                                                //                     display: 'block',
                                                //                     margin: 'auto'
                                                //                 }
                                                //             }
                                                //         })
                                                //     },
                                                // },
                                                {
                                                    td: `[[Name/${lang}]]`,
                                                    style: {
                                                        'text-align': 'center'
                                                    }
                                                },
                                                {
                                                    td: `[[Title/${lang}]]`,
                                                    style: {
                                                        'text-align': 'center'
                                                    }
                                                },
                                                {
                                                    td: `[[Grade]]`,
                                                    style: {
                                                        'text-align': 'center'
                                                    }
                                                },
                                                {
                                                    td: function (p) {
                                                        if (!p.data.Version) {
                                                            return "-"
                                                        }
                                                        return p.data.Version
                                                    },
                                                    style: {
                                                        'text-align': 'center'
                                                    }
                                                },
                                                {
                                                    td: function (p) {
                                                        elem = computer.ElemNameConfig[p.data.Element]
                                                        if (!elem) {
                                                            return "<b>-</b>"
                                                        }
                                                        $(p.container).render({
                                                            template: {
                                                                span: elem.Text[lang],
                                                                style: {
                                                                    color: computer.TextColorConfig[elem.Color],
                                                                    'font-weight': 'bold'
                                                                }
                                                            }
                                                        })
                                                    },
                                                    style: {
                                                        'text-align': 'center'
                                                    }
                                                },
                                                {
                                                    td: function (p) {
                                                        return computer2.AvatarWeaponConfig[p.data.Weapon][lang]
                                                    },
                                                    style: {
                                                        'text-align': 'center'
                                                    }
                                                },
                                                {
                                                    td: function (p) {
                                                        return p.data.ShowStats.HP
                                                    },
                                                    style: {
                                                        'text-align': 'center'
                                                    }
                                                },
                                                {
                                                    td: function (p) {
                                                        return p.data.ShowStats.ATK
                                                    },
                                                    style: {
                                                        'text-align': 'center'
                                                    }
                                                },
                                                {
                                                    td: function (p) {
                                                        return p.data.ShowStats.DEF
                                                    },
                                                    style: {
                                                        'text-align': 'center'
                                                    }
                                                },
                                                {
                                                    td: function (p) {
                                                        promote_value = p.data.ShowStats.Custom
                                                        if (!p.data.CustomPromote) {
                                                            return "-"
                                                        }
                                                        promote_config = computer2.AvatarCustomPromoteConfig[p.data.CustomPromote]
                                                        if (promote_config.ShowType === "p") {
                                                            promote_value = (promote_value * 100).toFixed(1).toString() + "%"
                                                        } else {
                                                            promote_value = promote_value.toFixed(1).toString()
                                                        }
                                                        return promote_value + " " + promote_config.Text[lang]
                                                    },
                                                    style: {
                                                        'padding': '15px'
                                                    }
                                                },
                                                // {
                                                //     td: {
                                                //         div : [
                                                //             {
                                                //                 a: function (p) {
                                                //                     return '/computer?monster=' + p.data.CommonMat + '&interval=93'
                                                //                 },
                                                //                 t: {
                                                //                     img: function (p) {
                                                //                         var monster = computer.Monsters[p.data.CommonMat]
                                                //                         if (!monster) {
                                                //                             return '/images/monster/keq.png'
                                                //                         }
                                                //                         var choose_icon = monster.Icon[Math.floor(Math.random() * monster.Icon.length)]
                                                //                         return '/images/monster/' + choose_icon + '.png'
                                                //                     },
                                                //                     style: {
                                                //                         height: '45px'
                                                //                     }
                                                //                 },
                                                //                 attr: { target: '_blank', title: lang == 'CH' ? '点击前往详情' : 'Click for more details' }
                                                //             },
                                                //             {
                                                //                 a: function (p) {
                                                //                     return '/computer?monster=' + p.data.BossMat + '&interval=93'
                                                //                 },
                                                //                 t: {
                                                //                     img: function (p) {
                                                //                         var monster = computer.Monsters[p.data.BossMat]
                                                //                         if (!monster) {
                                                //                             return '/images/monster/keq.png'
                                                //                         }
                                                //                         var choose_icon = monster.Icon[Math.floor(Math.random() * monster.Icon.length)]
                                                //                         return '/images/monster/' + choose_icon + '.png'
                                                //                     },
                                                //                     style: {
                                                //                         height: '45px'
                                                //                     }
                                                //                 },
                                                //                 attr: { target: '_blank', title: lang == 'CH' ? '点击前往详情' : 'Click for more details' }
                                                //             },
                                                //             {
                                                //                 a: function (p) {
                                                //                     return '/computer?monster=' + p.data.WeeklyMat + '&interval=90'
                                                //                 },
                                                //                 t: {
                                                //                     img: function (p) {
                                                //                         var monster = computer.Monsters[p.data.WeeklyMat]
                                                //                         if (!monster) {
                                                //                             return '/images/monster/keq.png'
                                                //                         }
                                                //                         var choose_icon = monster.Icon[Math.floor(Math.random() * monster.Icon.length)]
                                                //                         return '/images/monster/' + choose_icon + '.png'
                                                //                     },
                                                //                     style: {
                                                //                         height: '45px'
                                                //                     }
                                                //                 },
                                                //                 attr: { target: '_blank', title: lang == 'CH' ? '点击前往详情' : 'Click for more details' }
                                                //             }
                                                //         ],
                                                //         style: {
                                                //             'width': '100%',
                                                //             'display': 'flex',
                                                //             'justify-content': 'space-evenly'
                                                //         }
                                                //     }
                                                // },
                                                {
                                                    td: function (p) {
                                                        return computer2.AvatarTalentConfig[p.data.TalentMat][lang]
                                                    },
                                                    style: {
                                                        'text-align': 'center'
                                                    }
                                                },
                                            ],
                                            click: function (p) {
                                                battle_show_stat = 1
                                                is_calc = 1
                                                poplayer({
                                                    header: p.org_data.Name[lang] + computer.MiscText.Avatar_Table_Title_Extra[lang],
                                                    width: '90%',
                                                    data: p.org_data,
                                                    template: [
                                                        {
                                                            section: function (g) {
                                                                current_name = g.data._name
                                                                avatar_codename = g.data._name
                                                                $(g.container).render({
                                                                    data: computer.MiscText.Avatar_Info_Select,
                                                                    template: {
                                                                        span: `[[${lang}]]`,
                                                                        a: { 'data-s': `[[${'EN'}]]` },
                                                                        click: function (d) {
                                                                            if ($(d.sender).hasClass('active')) {
                                                                                return
                                                                            }
                                                                            var text = $(d.sender).attr('data-s');
                                                                            if (text == "Basic Info") {
                                                                                is_calc = 1
                                                                            } else {
                                                                                is_calc = 0
                                                                            }
                                                                            $(d.sender).addClass('active').siblings('span').removeClass('active');
                                                                            renderInfo(avatar_codename, text)
                                                                        }
                                                                    }
                                                                })
                                                                $(g.container).find('span').eq(0).addClass('active');
                                                            },
                                                            class: 'a_select'
                                                        },
                                                        {
                                                            section: '',
                                                            class: 'a_data',
                                                            style: {
                                                                'justify-content': 'space-evenly',
                                                                'display': 'flex',
                                                                'flex-wrap': 'wrap'
                                                            }
                                                        }
                                                    ]
                                                });
                                                renderInfo(p.org_data._name, "Basic Info")
                                            },
                                            style: {
                                                'cursor': 'pointer'
                                            }
                                        }
                                    })
                                }
                            }
                        ],
                        style: {
                            width: '100%',
                            'transform': 'rotateX(180deg)',
                        },
                        class: 'main-table'
                    },
                    style: {
                        width: '100%',
                        'overflow-x': 'scroll',
                        'transform': 'rotateX(180deg)',
                    }
                }
            ],
            class: 'content'
        },
    })

    function renderInfo(avatar, type) {
        $('.a_data').empty().render(renderTemplate(avatar, type))
        $('.a_data').show();
        $('.skill_lv_input').on('change', function () {
            var now_lv = $(this).val()
            $('div').has(this).next().next().find('.lv').hide()
            $('div').has(this).next().next().find('.lv' + now_lv).show()
        });
    }

    function renderTemplate(avatar, type) {

        var this_avatar = computer2.AvatarInfoConfig[char_id_list[avatar]]

        var nation = computer2.AvatarNationConfig[this_avatar.Nation]
        var color1 = colors[nation.Color]

        var color0 = colors[this_avatar.Element]
        var avatar_color = "<color style='color:" + color0 + "';><b>"
        
        dr = {
            "Basic Info": {
                data: this_avatar,
                template: [
                    {
                        div: [
                            {
                                div: {
                                    p: function(k) {
                                        return k.data.Name[lang] + (lang == "CH" ? " · " : " - ") + k.data.Title[lang]
                                    }
                                },
                                class: 'a_section_head',
                                style: {
                                    color: color0
                                }
                            },
                            {
                                div: {
                                    p: function(k) {
                                        return k.data.Desc[lang]
                                    }
                                },
                                class: 'a_section_content'
                            },
                        ],
                        class: 'a_section'
                    },
                    {
                        div: [
                            {
                                div: {
                                    p: computer.MiscText.Avatar_BasicInfo_Info[lang]
                                },
                                class: 'a_section_head'
                            },
                            {
                                div: [
                                    {
                                        p: function(k) {
                                            return computer.MiscText.Avatar_BasicInfo_1_1[lang] + avatar_color + k.data.Constellation[lang] + "</b></color>"
                                        }
                                    },
                                    {
                                        p: function(k) {
                                            return computer.MiscText.Avatar_BasicInfo_1_2[lang] + avatar_color + k.data.Birthday + "</b></color>"
                                        }
                                    },
                                    {
                                        p: function(k) {
                                            return computer.MiscText.Avatar_BasicInfo_1_3_0[lang] + "<color style='color:" + color1 + "';><b>" + nation.Text[lang] + "</b></color>"
                                        }
                                    },
                                    {
                                        p: function(k) {
                                            return computer.MiscText.Avatar_BasicInfo_1_3[lang] + avatar_color + k.data.Belong[lang] + "</b></color>"
                                        }
                                    },
                                    {
                                        p: function(k) {
                                            return computer.MiscText.Avatar_BasicInfo_2_1[lang] + avatar_color + k.data.CV.CH[lang] + "</b></color>"
                                        }
                                    },
                                    {
                                        p: function(k) {
                                            return computer.MiscText.Avatar_BasicInfo_2_2[lang] + avatar_color + k.data.CV.EN[lang] + "</b></color>"
                                        }
                                    },
                                    {
                                        p: function(k) {
                                            return computer.MiscText.Avatar_BasicInfo_2_3[lang] + avatar_color + k.data.CV.JP[lang] + "</b></color>"
                                        }
                                    },
                                    {
                                        p: function(k) {
                                            return computer.MiscText.Avatar_BasicInfo_2_4[lang] + avatar_color + k.data.CV.KR[lang] + "</b></color>"
                                        }
                                    },
                                ],
                                class: 'a_section_content'
                            },
                        ],
                        class: 'a_section_smallsmall'
                    },
                    {
                        div: [
                            {
                                div: {
                                    p: computer.MiscText.Avatar_BasicInfo_Battle[lang]
                                },
                                class: 'a_section_head'
                            },
                            {
                                div: [
                                    {
                                        p: function(k) {
                                            return computer.MiscText.Avatar_BasicInfo_Poise_1[lang] + avatar_color + computer2.AvatarPoiseConfig[k.data.Poise].Name[lang] + "</b></color>"
                                        }
                                    },
                                    {
                                        p: function(k) {
                                            return computer.MiscText.Avatar_BasicInfo_Poise_2[lang] + avatar_color + computer2.AvatarPoiseConfig[k.data.Poise].Poise.Endure + "</b></color>"
                                        }
                                    },
                                    {
                                        p: function(k) {
                                            return computer.MiscText.Avatar_BasicInfo_Poise_3[lang] + avatar_color + (computer2.AvatarPoiseConfig[k.data.Poise].Poise.Wane1 / computer2.AvatarPoiseConfig[k.data.Poise].Poise.Wane2).toFixed(5).toString().replace('.00000', '').replace('000', '') + "</b></color>"
                                        }
                                    },
                                    {
                                        p: function(k) {
                                            return computer.MiscText.Avatar_BasicInfo_Poise_4[lang] + avatar_color + computer2.AvatarPoiseConfig[k.data.Poise].Poise.Recover + "</b></color>"
                                        }
                                    }
                                ],
                                class: 'a_section_content'
                            },
                        ],
                        class: 'a_section_smallsmall'
                    },
                    {
                        div: [
                            {
                                div: {
                                    p: computer.MiscText.Avatar_Stats[lang]
                                },
                                class: 'a_section_head',
                            },
                            {
                                div: [
                                    {
                                        div: [
                                            {
                                                input: 'level',
                                                a: {
                                                    type: 'number',
                                                    placeholder: '1~90',
                                                    value: '90',
                                                    min: '1',
                                                    max: '90'
                                                }
                                            },
                                            {
                                                button: computer.MiscText.Avatar_IsPromote[0][lang],
                                                class: 'promote',
                                                click: function () {
                                                    isp = 1 - isp
                                                    $('.promote').html(computer.MiscText.Avatar_IsPromote[isp][lang])
                                                    cur_level = $('input[name=level]').val()
                                                    if (cur_level > 0 && cur_level <= 90) {
                                                        $('.avatar_stat').html(calcstats(cur_level, this_avatar))
                                                    }
                                                }
                                            }
                                        ],
                                        style: {
                                            'display': 'flex',
                                            'justify-content': 'space-between',
                                        }
                                    },
                                    {
                                        div: calcstats(90, this_avatar),
                                        class: 'avatar_stat'
                                    }
                                ],
                                class: 'a_section_content'
                            },
                        ],
                        class: 'a_section_smallsmall'
                    },
                ]
            },
            "Battle Skills": {
                data: computer2.AvatarSkillConfig[avatar].BattleSkills,
                template: [
                    {
                        div: [
                            {
                                div: [
                                    {
                                        span: function(k) {
                                            return k.data.Name[lang]
                                        },
                                        style: {
                                            'font-size': '20px',
                                            'font-weight': 'bold',
                                            'margin-left': '0px',
                                            'margin-right': '5px',
                                        }
                                    },
                                ],
                                class: 'a_section_head'
                            },
                            {
                                div: "",
                                style: {
                                    'height': '1px',
                                    'width': '100%'
                                }
                            },
                            {
                                div: {
                                    p: function(k) {
                                        return k.data.Desc[lang]
                                    }
                                },
                                class: 'a_section_content'
                            },
                        ],
                        class: 'battle_desc',
                    },
                    {
                        div: [
                            {
                                div: [
                                    {
                                        input: 'lv',
                                        a: {
                                            type: 'number',
                                            value: function (s) {
                                                console.log(s.data.Name.CH)
                                                return calcinit(s.data.ParamDesc[0])
                                            },
                                            min: 1,
                                            max: function (s) {
                                                return s.data.ParamDesc[0].ParamLevelList.length
                                            }
                                        },
                                        class: 'skill_lv_input'
                                    }
                                ],
                                class: 'a_section_head'
                            },
                            {
                                div: "",
                                style: {
                                    'height': '1px',
                                    'width': '100%'
                                }
                            },
                            {
                                div: [
                                    {
                                        div: [
                                            {
                                                span: function (s) {
                                                    return s.data.Desc[lang]
                                                },
                                                style: {
                                                    width: 'max-content'
                                                }
                                            },
                                            /*{
                                                span: function (s) {
                                                    var init_lv = s.data.ParamLevelList.length == 15 ? 9 : 0
                                                    return s.data.ParamLevelList[init_lv][lang]
                                                },
                                                style: {
                                                    'text-align': 'right',
                                                    'float': 'right'
                                                },
                                            },*/
                                            {
                                                span: function (s) {
                                                    var active_lv = calcinit(s.data)
                                                    var total_lv = s.data.ParamLevelList.length
                                                    for (var i = 0; i < total_lv; i++) {
                                                        $(s.container).render({
                                                            span: function (s) {
                                                                return s.data.ParamLevelList[i][lang]
                                                            },
                                                            class: 'lv lv' + (i + 1).toString()
                                                        });
                                                    }
                                                    $(s.container).children().hide()
                                                    $(s.container).children('.lv' + active_lv).show()
                                                },
                                                style: {
                                                    'text-align': 'right',
                                                    width: 'max-content'
                                                },
                                            }
                                        ],
                                        datapath: 'ParamDesc',
                                        class: 'param'
                                    },
                                    {
                                        div: [
                                            {
                                                span: computer.MiscText.Avatar_ExtraParamName_Charge[lang],
                                                style: {
                                                    'color': '#FFD780',
                                                }
                                            },
                                            {
                                                span: function (s) {
                                                    return s.data.Num
                                                },
                                                style: {
                                                    'text-align': 'right',
                                                    'color': '#FFD780',
                                                    'height': '30px'
                                                }
                                            },
                                        ],
                                        class: 'param'
                                    },
                                    {
                                        div: [
                                            {
                                                span: computer.MiscText.Avatar_ExtraParamName_Lock[lang],
                                                style: {
                                                    'color': '#FFD780',
                                                }
                                            },
                                            {
                                                span: function (s) {
                                                    return s.data.Lock.toFixed(1)
                                                },
                                                style: {
                                                    'text-align': 'right',
                                                    'color': '#FFD780',
                                                    'height': '30px'
                                                },
                                                class: 'paramstat'
                                            },
                                        ],
                                        class: 'param'
                                    }
                                ],
                                class: 'a_section_content'
                            },
                        ],
                        class: 'battle_stat',
                    }
                ]
            },
            "Passive Skills": {
                data: computer2.AvatarSkillConfig[avatar].PassiveSkills,
                template: [
                    {
                        div: [
                            {
                                div: {
                                    p: function(k) {
                                        return k.data.Name[lang]
                                    }
                                },
                                class: 'a_section_head'
                            },
                            {
                                div: {
                                    p: function(k) {
                                        return k.data.Desc[lang]
                                    }
                                },
                                class: 'a_section_content'
                            },
                        ],
                        class: 'a_section'
                    }
                ]
            },
            "Constellations": {
                data: computer2.AvatarSkillConfig[avatar].Constellations,
                template: [
                    {
                        div: [
                            {
                                div: {
                                    p: function(k) {
                                        return k.data.Level.toString() + " " + k.data.Name[lang]
                                    }
                                },
                                class: 'a_section_head'
                            },
                            {
                                div: {
                                    p: function(k) {
                                        return k.data.Desc[lang]
                                    }
                                },
                                class: 'a_section_content'
                            },
                        ],
                        class: 'a_section'
                    }
                ]
            },
            "Damage Data": {
                div: [
                    {
                        table: [
                            {
                                thead: [
                                    {
                                        tr: function (d) {
                                            $(d.container).render({
                                                data: computer.MiscText.Avatar_Attack_Header,
                                                template: {
                                                    th: `[[${lang}]]`
                                                }
                                            })
                                        }
                                    }
                                ]
                            },
                            {
                                tbody: function (d) {
                                    $(d.container).render({
                                        data: computer2.AvatarAttackConfig[avatar].AttackList,
                                        template: {
                                            tr: [
                                                {
                                                    td: `[[Skill/${lang}]]`
                                                },
                                                {
                                                    td: function (p) {
                                                        return computer2.AvatarShapeConfig[p.data.Shape.Type].Name[lang]
                                                    },
                                                    class: 'attack_center'
                                                },
                                                {
                                                    td: function (p) {
                                                        var out = ""
                                                        size = p.data.Shape.Size
                                                        desc = computer2.AvatarShapeConfig[p.data.Shape.Type].Params
                                                        for (var i = 0; i < size.length; i++) {
                                                            out += desc[i][lang] + " " + size[i].toString()
                                                            if (i + 1 < size.length) {out += "<br>"}
                                                        }
                                                        return out
                                                    }
                                                },
                                                {
                                                    td: `[[AtkTag/${lang}]]`
                                                },
                                                {
                                                    td: function (p) {
                                                        elem = computer.ElemNameConfig[p.data.Element]
                                                        if (!elem) {
                                                            return ""
                                                        }
                                                        return "<color style='color:" + computer.TextColorConfig[elem.Color] + ";'><b>" + elem.Text[lang] + "</b></color>"
                                                    },
                                                    class: 'attack_center'
                                                },
                                                {
                                                    td: `[[GU]]`,
                                                    class: 'attack_center'
                                                },
                                                {
                                                    td: `[[AttTag/${lang}]]`
                                                },
                                                {
                                                    td: `[[AttGrp/${lang}]]`
                                                },
                                                {
                                                    td: function (p) {
                                                        if (p.data.Blunt) {
                                                            return "✔"
                                                        }
                                                        return ""
                                                    },
                                                    class: 'attack_center'
                                                },
                                                {
                                                    td: `[[Poise]]`,
                                                    class: 'attack_center'
                                                },
                                                {
                                                    td: function (p) {
                                                        var a = computer2.AvatarForceConfig[p.data.ForceType][lang]
                                                        if (a == "None" || a == "无") {a = ""}
                                                        return a
                                                    }
                                                },
                                                {
                                                    td: function (p) {
                                                        a = "(" + p.data.Force[0] + ", " + p.data.Force[1] + ")"
                                                        if (a == "(0, 0)") {a = ""}
                                                        return a
                                                    },
                                                    class: 'attack_center'
                                                },
                                                {
                                                    td: function (p) {
                                                        if (p.data.Arkhe) {
                                                            return p.data.Arkhe.toString()
                                                        }
                                                        return ""
                                                    },
                                                    class: 'attack_center'
                                                },
                                                {
                                                    td: function (p) {
                                                        if (p.data.HTime) {
                                                            return p.data.HTime.toString()
                                                        }
                                                        return ""
                                                    },
                                                    class: 'attack_center'
                                                },
                                                {
                                                    td: function (p) {
                                                        if (p.data.HScale) {
                                                            return p.data.HScale.toString()
                                                        }
                                                        return ""
                                                    },
                                                    class: 'attack_center'
                                                },
                                                {
                                                    td: function (p) {
                                                        if (p.data.BeHalt) {
                                                            return "✔"
                                                        }
                                                        return ""
                                                    },
                                                    class: 'attack_center'
                                                },
                                                {
                                                    td: function (p) {
                                                        if (p.data.CanInfuse) {
                                                            return "✔"
                                                        }
                                                        return ""
                                                    },
                                                    class: 'attack_center'
                                                },
                                                {
                                                    td: `[[StrikeType]]`,
                                                    class: 'attack_center'
                                                },
                                                {
                                                    td: `[[AttackType]]`,
                                                    class: 'attack_center'
                                                },
                                            ]
                                        }
                                    })
                                }
                            }
                        ],
                    },
                ],
                class: 'attack_div',
            },
            "Other Data": {
                data: computer2.AvatarDataConfig[avatar],
                template: [
                    {
                        div: [
                            {
                                div: {
                                    p: computer.MiscText.Avatar_Data_Ball[lang]
                                },
                                style: {
                                    color: color0
                                },
                                class: 'a_section_head'
                            },
                            {
                                div: {
                                    table: {
                                        tr: [
                                            {
                                                td: `[[When/${lang}]]`,
                                                width: '60%'
                                            },
                                            {
                                                td: function (k) {
                                                    drop = k.data.DropArray
                                                    if (!drop) {
                                                        return k.data.CD.toString() + "s"
                                                    }
                                                    out = ""
                                                    for (var i = 0; i < drop.length; i++) {
                                                        out += drop[i].Num.toString() + " (" + (drop[i].Chance * 100).toString() + "%)"
                                                        if (i + 1 < drop.length) {out += " / "}                                                    
                                                    }
                                                    return out.replace(' (100%)', '')
                                                },
                                                width: '40%',
                                                style: {
                                                    'text-align': 'right',
                                                    'padding-left': '10px'
                                                }
                                            }
                                        ],
                                        datapath: 'BallList',
                                        width: '100%',
                                        height: '30px',
                                        class: 'other_table'
                                    },
                                    width: '100%'
                                },
                                class: 'a_section_content'
                            },
                        ],
                        class: 'a_section_small'
                    },
                    {
                        div: [
                            {
                                div: {
                                    p: computer.MiscText.Avatar_Data_Endure[lang]
                                },
                                style: {
                                    color: color0
                                },
                                class: 'a_section_head'
                            },
                            {
                                div: {
                                    table: {
                                        tr: [
                                            {
                                                td: `[[Skill/${lang}]]`,
                                                width: '75%'
                                            },
                                            {
                                                td: `[[Endure]]`,
                                                width: '25%',
                                                style: {
                                                    'text-align': 'right'
                                                }
                                            },
                                        ],
                                        datapath: 'EndureList',
                                        style: {
                                            width: '100%',
                                            height: '30px',
                                            'padding-left': '10px'
                                        },
                                        class: 'other_table'
                                    },
                                    width: '100%'
                                },
                                class: 'a_section_content'
                            },
                        ],
                        class: 'a_section_small'
                    },
                    {
                        div: [
                            {
                                div: {
                                    p: computer.MiscText.Avatar_Data_WindZone[lang]
                                },
                                style: {
                                    color: color0
                                },
                                class: 'a_section_head'
                            },
                            {
                                div: {
                                    table: [
                                        {
                                            thead: {
                                                tr: function (d) {
                                                    $(d.container).render({
                                                        data: computer.MiscText.Avatar_WindZone_Header,
                                                        template: {
                                                            th: `[[${lang}]]`,
                                                            style: {
                                                                'padding': "7px"
                                                            }
                                                        }
                                                    })
                                                },
                                                width: '100%'
                                            }
                                        },
                                        {
                                            tbody: function (d) {
                                                $(d.container).render({
                                                    data: d.data,
                                                    template: {
                                                        tr: [
                                                            {
                                                                td: `[[Skill/${lang}]]`
                                                            },
                                                            {
                                                                td: `[[Target/${lang}]]`
                                                            },
                                                            {
                                                                td: `[[Inner]] ~ [[Radius]]`
                                                            },
                                                            {
                                                                td: `[[Strength]]`
                                                            },
                                                            {
                                                                td: `[[Attenuation]]`
                                                            },
                                                            {
                                                                td: function (p) {
                                                                    if (!p.data.Duration) {
                                                                        return ""
                                                                    }
                                                                    return p.data.Duration
                                                                }
                                                            },
                                                            {
                                                                td: function (p) {
                                                                    if (p.data.Reverse) {
                                                                        return "✔"
                                                                    }
                                                                    return ""
                                                                }
                                                            },
                                                        ],
                                                        width: '100%',
                                                        class: 'windzone_table'
                                                    }
                                                })
                                            },
                                            datapath: 'WindZoneList'
                                        }
                                    ],
                                    width: '100%'
                                },
                                class: 'a_section_content'
                            },
                        ],
                        class: 'a_section'
                    },
                    {
                        div: [
                            {
                                div: {
                                    p: computer.MiscText.Avatar_Data_Other[lang]
                                },
                                style: {
                                    color: color0
                                },
                                class: 'a_section_head'
                            },
                            {
                                div: {
                                    ul: {
                                        li: function (k) {
                                            return k.data[lang]
                                        },
                                        datapath: 'OtherDataList'
                                    },
                                },
                                class: 'a_section_content'
                            },
                        ],
                        class: 'a_section'
                    }
                ]
            },
            "Stories": {
                data: computer2.AvatarFetterConfig[this_avatar.Fetter].StoryList,
                template: [
                    {
                        div: [
                            {
                                div: {
                                    p: function(k) {
                                        return k.data.Title[lang]
                                    },
                                    style: {
                                        color: color0
                                    }
                                },
                                class: 'a_section_head'
                            },
                            {
                                div: {
                                    p: function(k) {
                                        return k.data.Content[lang]
                                    }
                                },
                                class: 'a_section_content'
                            },
                        ],
                        class: 'a_section'
                    }
                ]
            },
            "Voicelines": {
                data: computer2.AvatarFetterConfig[this_avatar.Fetter].VoiceList,
                template: [
                    {
                        div: [
                            {
                                div: {
                                    p: function(k) {
                                        return k.data.Title[lang]
                                    },
                                    style: {
                                        color: color0
                                    }
                                },
                                class: 'a_section_head'
                            },
                            {
                                div: {
                                    p: function(k) {
                                        return k.data.Content[lang]
                                    }
                                },
                                class: 'a_section_content'
                            },
                        ],
                        class: 'a_section_small'
                    }
                ]
            },
        }

        return dr[type]

    }

    function calcstats(level, this_avatar) {

        if (!is_calc) {
            return ""
        }

        color0 = colors[this_avatar.Element]
        avatar_color = "<color style='color:" + color0 + "';><b>"

        var i = 0
        if (level < 20) {
            i = 0
        } else if (level == 20) {
            i = isp ? 0 : 1
        } else if (level > 20 && level < 40) {
            i = 1
        } else if (level == 40) {
            i = isp ? 1 : 2
        } else if (level > 40 && level < 50) {
            i = 2
        } else if (level == 50) {
            i = isp ? 2 : 3
        } else if (level > 50 && level < 60) {
            i = 3
        } else if (level == 60) {
            i = isp ? 3 : 4
        } else if (level > 60 && level < 70) {
            i = 4
        } else if (level == 70) {
            i = isp ? 4 : 5
        } else if (level > 70 && level < 80) {
            i = 5
        } else if (level == 80) {
            i = isp ? 5 : 6
        } else if (level > 80 && level <= 90) {
            i = 6
        }

        curve_id = this_avatar.Curve

        custominfo = computer2.AvatarCustomPromoteConfig[this_avatar.CustomPromote]

        hpcalc = computer2.AvatarCurveConfig[level][curve_id] * this_avatar.BaseStats.HP + this_avatar.Promote[i].HP
        atkcalc = computer2.AvatarCurveConfig[level][curve_id] * this_avatar.BaseStats.ATK + this_avatar.Promote[i].ATK
        defcalc = computer2.AvatarCurveConfig[level][curve_id] * this_avatar.BaseStats.DEF + this_avatar.Promote[i].DEF
        customcalc = this_avatar.Promote[i].Custom
        hpshow = avatar_color + hpcalc.toFixed(2) + "</b></color>"
        atkshow = avatar_color + atkcalc.toFixed(2) + "</b></color>"
        defshow = avatar_color + defcalc.toFixed(2) + "</b></color>"
        customshow = avatar_color + "+" + ((custominfo.ShowType == "p") ? ((customcalc * 100).toFixed(1) + "%") : customcalc.toFixed(1)) + "</b></color>"
        
        s = computer.MiscText.Avatar_Stat_HP[lang] + hpshow + "<br>" 
          + computer.MiscText.Avatar_Stat_ATK[lang] + atkshow + "<br>"
          + computer.MiscText.Avatar_Stat_DEF[lang] + defshow + "<br>"
          + custominfo.Text[lang] + ((lang == "CH") ? "：" : ": ") + customshow

        return s

    }

    function calcinit(a) {
        if (a.ParamLevelList.length != 15) {
            return 1
        } else {
            return 10
        }
    }

    $('body').on('change', 'input[name=level]', function () {
        var this_avatar = computer2.AvatarInfoConfig[char_id_list[current_name]]
        cur_level = $('input[name=level]').val()
        if (cur_level > 0 && cur_level < 90) {
            $('.avatar_stat').html(calcstats(cur_level, this_avatar))
        }
    });

    /*$('body').on('click', '.toggle_stat', function () {
        battle_show_stat = 1 - battle_show_stat
        $('.battle_desc').css(battle_desc_css[battle_show_stat])
        $('.battle_stat').css(battle_stat_css[battle_show_stat])
        $('.toggle_stat').html(computer.MiscText.Avatar_Battle_Stat[battle_show_stat][lang])
    });*/

});