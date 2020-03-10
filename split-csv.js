const input = document.querySelector('#split-csv')

input.addEventListener('change', event => {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = e => {
    const re = /[\u{4e00}-\u{9fa5}]/u

    const t = e.target.result.trim().split('\r\n').map(l => {
      const m = l.match(re)
      const i = m ? l.substring(0, m.index).lastIndexOf(' ') : l.length
      return l.substring(0, i) + '\t' + l.substring(i + 1)
    }).join('\r\n')

    const csvContent = 'data:text/csv;charset=utf-8,' + t
    const encodedUri = encodeURI(csvContent)
    window.open(encodedUri)
  }
  reader.readAsText(file)
})
