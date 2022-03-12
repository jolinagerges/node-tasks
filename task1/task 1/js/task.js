const customer = document.querySelector("#addTask");
const tableBody = document.querySelector("#tableBody");
const tableSingle = document.querySelector("#tableSingle")


const info = ['name', 'balance' , 'address'];

const save = function (name, data) {
    localStorage.setItem(name, JSON.stringify(data))
}
const read = function (storageKey) {
    let data;
    try {
        data = JSON.parse(localStorage.getItem(storageKey)) || [];
        if (!Array.isArray(data)) {
            throw new Error("not array")
        }
    }
    catch (e) {
        console.log(e.message);
        data = [];
    }
    return data;
}

const formSubmit = function (e) {
    e.preventDefault();
    let user = { accNum: Date.now(), createdAt: new Date() }
    info.forEach((item) => {
        user[item] = this.elements[item].value;
    })
    const users = read("users");
    users.push(user);
    save("users", users);
    this.reset();
    window.location.href = "index.html"
}
if (customer) customer.addEventListener("submit", formSubmit)

const creatMyOwnElements = (parent, htmlElement, txt, classes) => {
    const myEle = document.createElement(htmlElement)
    parent.appendChild(myEle)
    if (txt) myEle.textContent = txt
    if (classes) myEle.className = classes
    return myEle
}

const delUser = (users, i) => {
    users.splice(i, 1);
    save("users", users)
    showAll();
}
const makeEvent = (i, link) => {
    localStorage.setItem("showId", i)
    window.location.href = link
}

const showAll = () => {
    tableBody.innerHTML = "";
    const users = read("users");
    users.forEach((user, i) => {
        showSingle(user, i, users)
    })
}

const showSingle = (user, i, users, tableSingle) => {
    if (tableSingle) {
        var tr = creatMyOwnElements(tableSingle, "tr", null, null)
    }
    else {
        var tr = creatMyOwnElements(tableBody, "tr", null, null)
    }
    const td = creatMyOwnElements(tr, "td", i + 1, null);
    creatMyOwnElements(tr, "td", user.accNum, null);
    info.forEach((item) => {
        creatMyOwnElements(tr, "td", user[item], null);
    })
    const actionId = creatMyOwnElements(tr, "td", null, null);
    const showBtn = creatMyOwnElements(actionId, "button", "Show", "btn btn-primary me-2");
    const editBtn = creatMyOwnElements(actionId, "button", "Edit", "btn btn-warning me-2");
    const DelBtn = creatMyOwnElements(actionId, "button", "Delete", "btn btn-danger me-2");

    showBtn.addEventListener("click", () => { makeEvent(i, "show.html") })
    editBtn.addEventListener("click", () => { makeEvent(i, "edit.html") })
    DelBtn.addEventListener("click", () => { delUser(users, i) })
}

if (tableBody) showAll();

const editUser = document.querySelector("#editTask")
if (editUser) {
    const users = read("users")
    const i = parseInt(localStorage.getItem("showId"))
    info.forEach(head => editUser.elements[head].value = users[i][head])
    editUser.addEventListener("submit", function (e) {
        e.preventDefault()
        info.forEach(head => users[i][head] = e.target.elements[head].value)
        save("users", users)
        this.reset()
        window.location.href = "index.html"
    })
}

if (tableSingle) {
    const users = read("users")
    const i = parseInt(localStorage.getItem("showId"))
    const user = users.find((t, ind) => ind == i)
    showSingle(user, i, users, tableSingle)
}








