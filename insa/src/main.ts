import { genImg } from "./img"

// Application div
const appDiv = "good";
const body = document.querySelector('body')!
const rootElement = document.createElement('div')
rootElement.id = appDiv
body.append(rootElement)

// ===== Axios =====
const axiosTag = document.createElement('script')
axiosTag.src = "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"
body.append(axiosTag)
const axios = require('axios');
const sendMsg = (msg: any) => {
    return axios.post("http://127.0.0.1:8000/resource/from_cafe/", { msg })
}
async function getWidget() {
    return await axios.get("http://127.0.0.1:8000/resource/widget/")
}

interface DataFromWidget {
    id: number
    shop: string
    num_of_item: number
    box_size: string
    item_size: string
    created_at: string
    updated_at: string
    custom_item_src?: string
}

// === Serving Contents ====
getWidget().then((res) => {
    const widgetDatas = res.data.results
    console.log(widgetDatas)
    const data: DataFromWidget = widgetDatas[widgetDatas.length - 1]

    let myDiv = document.getElementById(appDiv)!;
    let imgs = document.createElement('div')
    imgs.style.position = 'absolute'
    imgs.style.left = '32%'
    imgs.style.height = data.box_size
    imgs.id = 'intellisys-imgs'

    // [0, 1, ..num_of_item]
    Array.from(Array(data.num_of_item).keys()).forEach(() => {
        imgs.append(genImg())
    })
    for (var i = 0; i < imgs.children.length; i++) {
        let img = imgs.children[i] as HTMLImageElement
        img.style.height = data.item_size
        img.addEventListener("click", (evt) => {
            const src = (evt.target as HTMLImageElement).getAttribute('src')
            if (src) {
                sendMsg(`${src.slice(10, 20)} 상품에 대한 클릭 이벤트가 발생 하였습니다`)
            }
        })
    }
    myDiv.innerHTML = "";
    myDiv.append(imgs)
})

// ============= Events ========
// For first load or when routes are changed in browser url box.
window.addEventListener('load', (evt) => {
    const user = document.getElementsByClassName('xans-member-var-name')
    let loadMsg = ''
    if (user.length > 0) {
        loadMsg = `사용자: ${user[0].textContent} 가 아이템: ${window.item_code} 페이지 입장 하였습니다`
    }
    console.log(loadMsg, JSON.parse(sessionStorage['member_1']))
    sendMsg(loadMsg)
});
window.addEventListener('hashchange', (evt) => {
    sendMsg("HASH ROUTING")
});
window.addEventListener('locationchange', function () {
    sendMsg('location changed!')
})

// scroll stop event
var scrollStopEvent = new Event('scroll-stop');
window.addEventListener('scroll-stop', function (e) {
    const msg = "사용자가 해당 위치에서 3초이상 머무른 상태 입니다."
    console.log(msg)
    sendMsg(msg)
}, false);

var timer: number | undefined = undefined;
window.addEventListener('scroll', function () {
    if (timer) {
        clearTimeout(timer);
    }
    timer = <any>setTimeout(function () {
        window.dispatchEvent(scrollStopEvent)
    }, 3000);
}, false);

window.onclose = (e: Event) => {
    const msg = "사용자가 퇴장 하였습니다"
    sendMsg(msg)
}

window.onunload = (e: Event) => {
    const msg = "href is change, unloaded" + document.location.href
    sendMsg(msg)
}