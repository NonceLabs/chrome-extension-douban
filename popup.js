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

    const modal = document.getElementById('modal')
    const input = document.getElementById('input')
    const createBtn = document.getElementById('create')
    const confirmBtn = document.getElementById('confirm')
    const errorMsg = document.getElementById('error')
    const list = document.getElementById('doulist')

    const _list = []
    doulist.map().on(function (item, id) {
      _list.push(item)
      const pItem = document.createElement('p')
      list.append(pItem)
      pItem.className = 'item'
      pItem.innerHTML = `<a href="https://doujia.chezhe.dev/u/${uid}?listName=${item}" target="_blank"><span>${item}</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg></a>`
    })

    createBtn.addEventListener('click', () => {
      modal.style = 'display: block'
    })

    confirmBtn.addEventListener('click', () => {
      createList()
    })

    input.addEventListener('keyup', function (e) {
      errorMsg.style = 'display:none'
      if (e.key === 'Enter') {
        e.preventDefault()
        createList()
      }
    })

    function createList() {
      const name = input.value.trim()
      if (!name) {
        errorMsg.innerText = '名称不能为空'
        errorMsg.style = 'display:block'
        return
      }

      if (_list.includes(name)) {
        errorMsg.innerText = '已存在相同名称豆荚'
        errorMsg.style = 'display:block'
        return
      }

      doulist.set(name)
      modal.style = 'display: none'
    }
  }
}
