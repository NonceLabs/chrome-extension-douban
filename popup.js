let uid, ck

init()

async function init() {
  let cookies = await new Promise((resolve) =>
    chrome.cookies.getAll({ url: 'https://*.douban.com' }, resolve)
  )
  let uid
  for (let cookie of cookies) {
    switch (cookie.name) {
      case 'dbcl2':
        uid = parseInt(cookie.value.match(/^\"(\w*):.+\"$/)[1])
        break
      case 'ck':
        ck = cookie.value
        break
    }
  }

  chrome.storage.sync.set({ uid })

  if (uid) {
    const gun = Gun('https://doujia.herokuapp.com/gun')

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
      pItem.innerHTML = `<a href="https://doujia.chezhe.dev/u/${uid}?listName=${item}" target="_blank">${item}</a>`
    })

    input.addEventListener('keyup', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault()
        const name = e.target.value
        doulist.set(name)
        input.style = 'display: none'
      }
    })
  }
}
