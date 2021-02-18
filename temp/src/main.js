import { genImg } from "./img.js"

// import { configure, getLogger } from "./node_modules/log4js/lib/";
// configure("./filename");
// const logger = getLogger();
// logger.level = "trace";

// configure({
//   appenders: { cheese: { type: "file", filename: "cheese.log" } },
//   categories: { default: { appenders: ["cheese"], level: "error" } }
// });



// Application div
const appDiv = "good";

const body = document.querySelector('body')

const axiosTag = document.createElement('script')
axiosTag.src = "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"
body.append(axiosTag)

const axios = require('axios');
const sendMsg = (msg) => {
    return axios.post("http://127.0.0.1:8000/from_cafe/", { msg })
}

const rootElement = document.createElement('div')
rootElement.id = appDiv
body.append(rootElement)


// Both set of different routes and template generation functions
let routes = {};
let templates = {};
// Register a template (this is to mimic a template engine)
let template = (name, templateFunction) => {
    return templates[name] = templateFunction;
};
// Define the routes. Each route is described with a route path & a template to render
// when entering that path. A template can be a string (file name), or a function that
// will directly create the DOM objects.
let route = (path, template) => {
    if (typeof template == "function") {
        return routes[path] = template;
    }
    else if (typeof template == "string") {
        return routes[path] = templates[template];
    }
    else {
        return;
    }
};

// Register the templates.
template('template1', () => {
    let myDiv = document.getElementById(appDiv);
    let imgs = document.createElement('div')
    imgs.style = `
        position: absolute;
        top: 50vh;
        left: 32%;
    `
    imgs.id = 'intellisys-imgs'
    imgs.append(genImg())
    imgs.append(genImg())
    imgs.append(genImg())
    for (var i = 0; i < imgs.children.length; i++) {
        imgs.children[i].addEventListener("mouseenter", (evt) => {
            const src = evt.target.getAttribute('src')
            if (src) {
                sendMsg(`${src.slice(0, 10)} 상품에 대한 클릭 이벤트가 발생 하였습니다`)
            }
        })
    }
    myDiv.innerHTML = "";
    myDiv.append(imgs)
    const link1 = createLink('view1', 'Go to view1', '#/view1');
    const link2 = createLink('view2', 'Go to view2', '#/view2');
    const lists = document.createElement('ul')
    lists.append(link1);
    lists.append(link2);
    myDiv.append(lists)
    return myDiv
});
template('template-view1', () => {
    let myDiv = document.getElementById(appDiv);
    myDiv.innerHTML = "";
    const link1 = createDiv('view1', "<div><h1>This is View 1 </h1><a href='#/'>Go Back to Index</a></div>");
    myDiv.append(genImg())
    return myDiv.appendChild(link1);
});
template('template-view2', () => {
    let myDiv = document.getElementById(appDiv);
    myDiv.innerHTML = "";
    const link2 = createDiv('view2', "<div><h1>This is View 2 </h1><a href='#/'>Go Back to Index</a></div>");
    myDiv.append(genImg())
    return myDiv.appendChild(link2);
});
// Define the mappings route->template.
route('/', 'template1');
route('/view1', 'template-view1');
route('/view2', 'template-view2');

// Generate DOM tree from a string
let createDiv = (id, xmlString) => {
    let d = document.createElement('div');
    d.id = id;
    d.innerHTML = xmlString;
    return d.firstChild;
};
// Helper function to create a link.
let createLink = (title, text, href) => {
    const list = document.createElement('li')
    let a = document.createElement('a');
    let linkText = document.createTextNode(text);
    a.appendChild(linkText);
    a.title = title;
    a.href = href;
    list.append(a)
    return list;
};

// Give the correspondent route (template) or fail
let resolveRoute = (route) => {
    try {
        return routes[route];
    } catch (error) {
        throw new Error("The route is not defined");
    }
};
// The actual router, get the current URL and generate the corresponding template
let loadRouter = (evt) => {
    const url = window.location.hash.slice(1) || "/";
    const routeResolved = resolveRoute(url);
    const user = document.getElementsByClassName('xans-member-var-name')[0].textContent
    const loadMsg = `사용자: ${user} 가 아이템: ${item_code} 페이지 입장 하였습니다`
    console.log(loadMsg, JSON.parse(sessionStorage['member_1']))
    sendMsg(loadMsg)
    routeResolved();
};
let hashRouter = (evt) => {
    const url = window.location.hash.slice(1) || "/";
    const routeResolved = resolveRoute(url);
    sendMsg("HASH ROUTING")
    routeResolved();
};
// For first load or when routes are changed in browser url box.
window.addEventListener('load', loadRouter);
window.addEventListener('hashchange', hashRouter);
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
var timer = null;
window.addEventListener('scroll', function () {
    if (timer !== null) {
        clearTimeout(timer);
    }
    timer = setTimeout(function () {
        window.dispatchEvent(scrollStopEvent)
    }, 3000);
}, false);

window.onclose = (e) => {
    const msg = "사용자가 퇴장 하였습니다"
    sendMsg(msg)
}

window.onunload = (e) => {
    const msg = "href is change, unloaded" + document.location.href
    sendMsg(msg)
}