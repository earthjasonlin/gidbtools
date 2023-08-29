var dialog = {
    timer: null,
    success: function(message) {
        this.sendMessage({ type: 'success', content: message })
    },
    fail: function(message) {
        this.sendMessage({ type: 'fail', content: message })
    },
    sendMessage: function(message) {
        if (document.querySelector('.show-tips')) {
            document.body.removeChild(document.querySelector('.show-tips'))
            clearTimeout(this.timer)
        }
        var messageType = message.type || 'success'
        var messageContent = message.content || '测试消息'
        var productContent = '<div class=\'show-tips ' + messageType + '\'>' +
            '<p>' + messageContent +
            '</p>' +
            '</div>'

        var createMessageElement = document.createElement('div')
        document.body.appendChild(createMessageElement)
        createMessageElement.outerHTML = productContent
        this.setPosition('.show-tips')
        this.timer = setTimeout(function() {
            document.body.removeChild(document.querySelector('.show-tips'))
        }, 3000)
    },
    sendDialog: function(message) {
        var btnHandler = arguments
        if (document.querySelector('.dialog-tips')) {
            document.body.removeChild(document.querySelector('.dialog-tips'))
            document.body.removeChild(document.querySelector('.common-mask'))
        }
        var title = message.title || '信息'
        var content = message.content || '输入您想展示的信息'
        var area = message.area || null
        var submitClose = message.submitClose === false ? message.submitClose : true
        var buttonList = message.button ? message.button : ['确定']
        var btnHtml = ''
        buttonList.forEach(function(item, index) {
            btnHtml += "<button class='small submit-btn submit-btn-"+index+"' >"+item+"</button>"
        })
        var styleList = new Object()
        if (area && Array.isArray(area)) {
            styleList.width = typeof area[0] === 'number' && !isNaN(area[0]) && area[0] > 0 ? area[0] : null
            styleList.height = typeof area[1] === 'number' && !isNaN(area[1]) && area[1] > 0 ? area[1] : null
        }
        var productContent = '<div class=\'dialog-tips\'>' +
            '<div class=\'dialog-tips-title\'>' + title +
            '</div>' +
            '<i class=\'dialog-tips-close dialog-close\'>×</i>' +
            '<div class=\'dialog-tips-content\'>' + content + '</div>' +
            '<div class=\'common-btn\'>' + btnHtml + '</div>' +
            '</div>'
        this.maskLayer()
        var createElement = document.createElement('div')
        document.body.appendChild(createElement)
        createElement.outerHTML = productContent
        this.setPosition('.dialog-tips', styleList)
        var _this = this
        document.body.onclick = function(ev) {
            var event = ev || window.event
            var target = event.target || event.srcElement
            if (target.classList.contains('dialog-close')) {
                _this.closeDialog()
            } else if (target.classList.contains('submit-btn')) {
                //第一个参数是message，其余的参数才是按钮点击处理事件
                var childIndex = 1
                var eleChild = target
                while ((eleChild = eleChild.previousElementSibling) != null) {
                    childIndex++
                }
                if (btnHandler[childIndex]) {
                    btnHandler[childIndex]()
                }
                if (submitClose !== false) {
                    _this.closeDialog()
                }
            }
        }
    },
    //蒙版
    maskLayer: function() {
        var createElement = document.createElement('div')
        createElement.className = 'common-mask'
        document.body.appendChild(createElement)
    },
    //关闭对话框
    closeDialog: function() {
        var dialogTips = document.querySelector('.dialog-tips')
        var commonMask = document.querySelector('.common-mask')
        document.body.removeChild(dialogTips)
        document.body.removeChild(commonMask)
    },
    //计算位置
    setPosition: function(selector, styleList) {
        var tipsElement = document.querySelector(selector)
        var widthVal = styleList && styleList.width ? styleList.width / 2 : Number(window.getComputedStyle(tipsElement, null).width.replace('px', '')) / 2
        var heightVal = styleList && styleList.height ? styleList.height / 2 : Number(window.getComputedStyle(tipsElement, null).height.replace('px', '')) / 2
        tipsElement.style.cssText = 'left:50%;top:50%;margin-left: -' + widthVal + 'px;margin-top:-' + heightVal + 'px;animation: message-show 0.5s;'
        if (styleList) {
            if (styleList.width) {
                tipsElement.style.width = styleList.width + 'px'
            }
            if (styleList.height) {
                var contentElement = document.querySelector('.dialog-tips-content')
                contentElement.style.height = styleList.height - 45 - 26 - 40 + 'px'
                tipsElement.style.height = styleList.height + 'px'
            }
        }
        var runkeyframes =
            '@keyframes message-show {0% {filter: alpha(opacity: 0%);opacity: 0;} \n' +
            '100% {filter: alpha(opacity: 100%);opacity: 1;}}'
        var style = document.createElement('style')
        style.type = 'text/css'
        style.innerHTML = runkeyframes
        document.getElementsByTagName('head')[0].appendChild(style)
    }
}