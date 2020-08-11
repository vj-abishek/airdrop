// const Buff = require('readable-stream')

const buf = Buffer.from('abc');
console.log(buf);

// code from github
// if (file.name.match(/\.jpg|\.png|\.jpeg|\.gif/gi)) {
//   html += '<img crossOrigin="anonymous" src="' + file.url + '">';
// } else if (file.name.match(/\.wav|\.mp3/gi)) {
//   html += '<audio src="' + file.url + '" controls></audio>';
// } else if (file.name.match(/\.webm|\.flv|\.mp4/gi)) {
//   html += '<video src="' + file.url + '" controls></video>';
// } else if (file.name.match(/\.js|\.txt|\.sh/gi)) {
//   html += '<a href="' + file.url + '" target="_blank" download="' + file.name + '">';
//   html += '<br><iframe class="inline-iframe" src="' + file.url + '"></iframe></a>';
// }

// code at peer.send

// let blob = new Blob([data], {
//   type: 'image/png'
// })
// console.log(data.type)
// let url = window.URL.createObjectURL(blob)
// console.log('URL:', url)
// // console.log(':data:', data)
// console.log(blob)
// let a
// a = document.createElement('a')
// a.href = url
// a.download = 'airdrop'
// document.body.appendChild(a)
// a.style = 'display: none'

// a.remove()

// FIXME: fix this code

// if (parsed.initial || parsed.custom) {
//   update(combaine(parsed))
// }
// const base64_data = of(parsed)
// let array = ''
// const modified = base64_data.pipe(
//   // takeWhile(v => v.final === true),
//   filter(val => val.initial === false),
//   map(file => {
//     let refile = file.file.split('data:image/png;base64,')
//     setReffile({
//       file: refile[1]
//     })

//     console.log(refile[1])
//     if (refile[1] !== undefined) {
//       array += refFile.file
//       file.realFile = array
//     }

//     return file
//   })
// )
// modified.subscribe(file => {
//   if (file.final) {
//     // let blob = new Blob([file.realFile], {
//     //   type: file.type
//     // })

//     // let url = window.URL.createObjectURL(blob)
//     // console.log('URL REady:', url)
//     // file.url = url
//     update(file)
//     //reset the things

//     // console.log('Running this by the way')
//   }
// })

// console.log(FileArray)
// const BufferToSend = from(File)

// const modified = BufferToSend.pipe(
//   filter(v => v.initial === false),
//   takeWhile(F),
//   map(async file => {
//     console.log(file  )
//   })
// )
// modified.subscribe(original => {
//   original.then(iGotIt => {
//     console.log(iGotIt)
//     peer.send(JSON.stringify(iGotIt))
//   })
// })
