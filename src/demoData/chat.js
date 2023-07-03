export function initChat() {
    if (!isNeedChat()) {
        return
    }

    // Your CSS as text
    let styles = `
body {
    background-color: #f5f5f5;
}

#chat-assistant-container {
    position: fixed;
    right: 40px;
    bottom: 86px;
    z-index:9990;
}

#chat-assistant-button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: linear-gradient(135deg, rgb(215 98 150 / 55%),rgb(34 78 139 / 71%), rgb(114 222 172));
    box-shadow: 0px 0px 8px 1px rgb(0 0 0 / 22%);
    color: #fff;
    text-shadow: 1px 1px 3px rgb(0 0 0 / 56%);
}


#chat-container {
    position: fixed;
    padding: 10px;
    top: 45%;
    left: 50%;
    z-index:9990;
    transform: translate(-50%, -50%);
    display: none;
    border-radius: 5px;
    width: 40%;
    background: linear-gradient(135deg, rgb(215 98 150 / 92%),rgb(34 78 139 / 93%), rgb(114 222 172 / 94%));
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}



#chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px 10px 0;
    border-radius: 5px 5px 0 0;
    cursor: move;
}

#loading-indicator {
    width: 14px;
    height: 14px;
    margin: 0 10px 0 10px;
    border: 2px solid #ccc;
    border-top-color: #4caf50;
    border-radius: 50%;
    animation: spin 2s linear infinite;
    visibility: hidden;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

#chat-header .show-loading {
    visibility: visible;
}

#chat-header .hide-loading {
    visibility: hidden;
}


#circle-button {
    padding: 0;
    border: none;
    background-color: transparent;
    font-size: 16px;
    user-select: none;
    display: flex;
    align-items: center;
    color: #fff; 
    text-shadow: 1px 1px 3px black;
}

#close-button {
    cursor: pointer;
    padding: 0;
    border: none;
    background-color: transparent;
    font-size: 24px;
    color: #fff; 
    text-shadow: 1px 1px 3px black;
}
#send-button {
    cursor: pointer;
    padding: 0;
    border: none;
    background-color: transparent;
    font-size: 16px;
}

#close-button:hover,
#send-button:hover {
    color: #888;
}

#chat-input-container,
#chat-input {
    border: none;
}

#chat-input-container {
    display: flex;
    align-items: center;
    border-radius: 5px;
    background-color: #fff;
    padding: 10px;
}

#chat-input {
    flex: 1;
    padding: 0;
    margin-right: 5px;
    border-radius: 5px;
    overflow-y: auto;
    height: 24px;
    font-size: 1rem;
    outline: none;
    resize: none;
    background: transparent;
}

#send-button {
    background-color: transparent;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    width: 32px;
}

#send-button>span {
    height: 16px;
    width: 16px;
}

#send-button:enabled {
    background-color: rgb(120,198,174);
}

#send-button:enabled svg path {
    fill: #fff;
}
`

    let styleSheet = document.createElement("style")
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet)


    const html = `<div id="chat-assistant-container">
            <button id="chat-assistant-button">🤖AI</button>
        </div>
    
        <div id="chat-container">
            <div id="chat-header">
                <span id="circle-button">Univer AI 助手<div id="loading-indicator"></div></span>
    
                <button id="close-button">×</button>
            </div>
            <div id="chat-input-container">
                <textarea id="chat-input" placeholder="请输入问题"></textarea>
                <!-- <textarea id="chat-input" placeholder="请输入问题"></textarea> -->
                <button id="send-button" disabled>
                    <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" class="h-4 w-4 m-1 md:m-0"
                            stroke-width="2">
                            <path
                                d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
                                fill="currentColor"></path>
                        </svg></span>
                </button>
            </div>
    
        </div>`;
    document.body.insertAdjacentHTML('beforeend', html)


    const assistantButton = document.getElementById('chat-assistant-button');
    const chatContainer = document.getElementById('chat-container');
    const closeButton = document.getElementById('close-button');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const loadingIndicator = document.getElementById('loading-indicator');

    assistantButton.addEventListener('click', function () {
        chatContainer.style.display = 'block';
    });

    closeButton.addEventListener('click', function () {
        chatContainer.style.display = 'none';
    });

    sendButton.addEventListener('click', function () {
        const message = chatInput.value;
        if (message.trim() !== '') {
            // 处理发送消息的逻辑

            chatInput.value = '';
            resetButton(chatInput)

            // 显示 Loading
            loadingIndicator.classList.add('show-loading');
            setTimeout(() => {
                setFormuala(message);
                // 隐藏 Loading
                loadingIndicator.classList.remove('show-loading');
            }, 1000);
        }


    });

    chatInput.addEventListener('input', function () {
        inputHandler(this)
    });

    function inputHandler(input) {
        if (input.scrollHeight > 24) {
            input.style.height = 'auto'
        }
        input.style.height = input.scrollHeight + 'px'; // 根据内容高度设置 textarea 高度
        if (input.scrollHeight > 200) {
            input.style.overflowY = 'scroll'
        } else {
            input.style.overflowY = 'hidden'
        }

        resetButton(input)

    }

    function resetButton(input) {
        if (input.value.trim() !== '') {
            sendButton.disabled = false;
            sendButton.classList.add('enabled');
        } else {
            input.style.height = '24px'; // 重置高度为一行
            sendButton.disabled = true;
            sendButton.classList.remove('enabled');
        }
    }

    // 快捷键
    let isComposing = false;

    chatInput.addEventListener('compositionstart', function () {
        isComposing = true;
    });

    chatInput.addEventListener('compositionend', function () {
        isComposing = false;
    });

    chatInput.addEventListener('keydown', function (event) {
        const isWindows = navigator.platform.includes('Win');
        const isMac = navigator.platform.includes('Mac');

        const key = event.key;

        if (isWindows && event.key === 'Enter' && !isComposing && !event.altKey) {
            // Windows 上的 Enter 键触发发送
            event.preventDefault();
            sendButton.click();
        } else if (isWindows && event.key === 'Enter' && !isComposing && event.altKey) {
            // Windows 上的 Alt+Enter 键触发换行
            event.preventDefault();
            this.value += '\n';
        } else if (isMac && event.key === 'Enter' && !isComposing && !event.metaKey) {
            // Mac 上的 Enter 键触发发送
            event.preventDefault();
            sendButton.click();
        } else if (isMac && event.key === 'Enter' && !isComposing && event.metaKey) {
            // Mac 上的 Command+Enter 键触发换行
            event.preventDefault();
            this.value += '\n';
        } else if (!isComposing && (key === "Backspace" || key === "Delete")) {

        }

        inputHandler(this)
    });


    // 添加拖拽功能
    let isDragging = false;
    let offset = { x: 0, y: 0 };

    const chatHeader = document.getElementById('chat-header');

    chatHeader.addEventListener('mousedown', function (event) {
        isDragging = true;
        offset.x = event.clientX - chatContainer.offsetLeft;
        offset.y = event.clientY - chatContainer.offsetTop;
    });

    document.addEventListener('mousemove', function (event) {
        if (isDragging) {
            chatContainer.style.left = `${event.clientX - offset.x}px`;
            chatContainer.style.top = `${event.clientY - offset.y}px`;
        }
    });

    document.addEventListener('mouseup', function () {
        isDragging = false;
    });
}

const needChatHosts = [
    'crm.lashuju.com',
    'localhost:3000'
]
function isNeedChat() {
    const host = location.host;
    if (needChatHosts.includes(host)) {
        return true
    }

    return false
}


function setFormuala(sentence = '') {

    let link = getLink(sentence)

    if (link !== '') {
        setGET_AIRTABLE(link)
    } else {
        setASK_AI(sentence)
    }

}

function setASK_AI(sentence = '') {

    let range = getRange(sentence);

    range = range === '' ? '' : ',' + range
    const data = [
        [
            {
                "f": "=ASK_AI(\"" + sentence + "\"" + range + ")"
            }
        ]
    ]
    luckysheet.setRangeValue(data)
}

function setGET_AIRTABLE(link) {
    const data = [
        [
            {
                "f": "=GET_AIRTABLE_DATA(\"" + link + "\")"
            }
        ]
    ]
    luckysheet.setRangeValue(data)
}

function getLink(sentence = '') {
    const regex = /(https?:\/\/(?:www\.)?airtable\.com\/\S+)/gi;
    const matches = sentence.match(regex);

    if (matches) {
        return matches[0];
    }

    return ''

}

function getRange(text) {
    const regex = /([A-Z]+[0-9]*):([A-Z]+[0-9]*)/g;
    const matche = text.match(regex);
    if (matche) {
        return matche[0]
    }
    return ''
}