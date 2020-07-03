export let bufferArrayuni = []

/**
 * Represents a file,
 * this is for generating chunks based on the file provided.
 * Return a Promise
 *
 * @param {any} file_data Accepts a file
 */
export const share_file = async (file_data) => {
  let FileArray = []
  let chunkSize = 100000
  let fileSize = file_data.size
  let chunks = Math.ceil(file_data.size / chunkSize, chunkSize)
  let chunk = 0


  let data_object = {
    fileName: file_data.name,
    type: file_data.type,
    initial: true,
    send: chunk * chunkSize,
    chunks: chunks,
    final: false,
    chunk,
    fileSize,
  }
  bufferArrayuni = [data_object]

  while (chunk <= chunks) {
    let offset = chunk * chunkSize

    let buffer = await new Blob([file_data.slice(offset, offset + chunkSize)], {
      type: file_data.type,
    }).arrayBuffer()
    FileArray.push(buffer)

    if (chunk === chunks) {
      let another = {
        fileName: file_data.name,
        type: file_data.type,
        initial: false,
        send: chunk * chunkSize,
        chunks: chunks,
        final: true,
        chunk,
        fileSize,
      }
      bufferArrayuni = [...bufferArrayuni, another]
    }
    if (buffer.byteLength === 0) {
      return new Promise((resolve, reject) => {
        if (buffer.byteLength === 0) {
          resolve(FileArray)
        }
      })
    }

    chunk++
  }
}

/**
 * To convert Base64 image to Blob URL.
 * This is used to show images and not files. 
 * 
 * @param {any} dataURI Converts Base64 to Blob
 */

export function dataURItoBlob(dataURI) {
  var mime = dataURI.split(',')[0].split(':')[1].split(';')[0]
  var binary = atob(dataURI.split(',')[1])
  var array = []
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i))
  }
  return new Blob([new Uint8Array(array)], { type: mime })
}
