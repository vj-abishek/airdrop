import formatBytes from '../../../Tools/FileConvertor'

export const combaine = data => {
  switch (true) {
    case data.initial === true:
      data.type = 'text/plain'
      data.message = `Send's a photo with file size ${formatBytes(
        data.fileSize
      )} `
      data.Recieved = `Recieved | ${(data.chunk / data.chunks) * 100}%`
      //   console.log('chunk:', data.chunk, 'Chunks:', chunks)
      //   console.log(`Recieved | ${(data.chunk / data.chunks) * 100}%`)
      return data
    case !data.final:
      //   console.log('chunk:', data.chunk, 'Chunks:', data.chunks)
      //   data.Recived = (data.chunk / chunks) * 100
      //   console.log(`Recieved | ${(data.chunk / data.chunks) * 100}%`)

      return {
        name: 'Bot',
        message: `Recieved | ${(data.chunk / data.chunks) * 100}%`,
        type: 'text/plain',
        custom: true
      }
    default:
      return {
        name: 'Bot',
        message: `Recieved | ${(data.chunk / data.chunks) * 100}%`,
        type: 'text/plain',
        custom: true
      }
  }
}
