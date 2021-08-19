const uid = 'chezhevip'

const gun = Gun('https://dougun.herokuapp.com/gun')

const doulist = gun.get(uid)

const input = document.getElementById('input')
const button = document.getElementById('create')
const list = document.getElementById('doulist')

button.addEventListener('click', () => {
  input.style = 'display: block'
})

const _list = []
doulist.map().on(function (item, id) {
  _list.push(item)
  const pItem = document.createElement('p')
  list.append(pItem)
  pItem.className = 'item'
  // const link = document.createElement('a')
  // link.setAttribute('href', ``)
  pItem.innerHTML = `<a href="https://douban.chezhe.dev/u/${uid}?listName=${item}" target="_blank">${item}</a>`
})

input.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault()
    const name = e.target.value
    doulist.set(name)
    input.style = 'display: none'
  }
})

// let changeColor = document.getElementById('changeColor')

// chrome.storage.sync.get('color', ({ color }) => {
//   changeColor.style.backgroundColor = color
// })

// changeColor.addEventListener('click', async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: setPageBackgroundColor,
//   })
// })

// // The body of this function will be executed as a content script inside the
// // current page
// function setPageBackgroundColor() {
//   chrome.storage.sync.get('color', ({ color }) => {
//     document.body.style.backgroundColor = color
//   })
// }
