import formatBytes from '../../../Tools/FileConvertor';
// import { v4 } from 'uuid'

export const combaine = (data) => {
  switch (true) {
    case data.initial === true:
      data.id = 'v4()';
      data.type = 'text/plain';
      data.message = `Sending a file with size ${formatBytes(data.fileSize)}...`;
      data.Recieved = `Recieved | ${(data.chunk / data.chunks) * 100}%`;
      //   console.log('chunk:', data.chunk, 'Chunks:', chunks)
      //   console.log(`Recieved | ${(data.chunk / data.chunks) * 100}%`)
      return data;
    case data.final:
      //   console.log('chunk:', data.chunk, 'Chunks:', data.chunks)
      //   data.Recived = (data.chunk / chunks) * 100
      //   console.log(`Recieved | ${(data.chunk / data.chunks) * 100}%`)

      // return {
      //   name: 'Bot',
      //   id: v4(),
      //   message: `Recieved | ${(data.chunk / data.chunks) * 100}%`,
      //   type: type,
      //   custom: true,
      // }
      break;

    // let a
    // a = document.createElement('a')
    // a.href = url
    // a.download = `airdrop-${Date.now()}`
    // document.body.appendChild(a)
    // a.style = 'display: none'

    default:
      console.log('This is default');
  }
};
