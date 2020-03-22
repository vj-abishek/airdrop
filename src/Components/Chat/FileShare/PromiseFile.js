export let recievedFile = []

export const Ripme = data => {
  while (data.chunk <= data.chunks) {
    let file = data.file !== undefined ? data.file : ''

    let only = file.split(`data:${data.type};base64,`)
    let base = only[1]
    recievedFile = [...recievedFile, base]
  }
}
