import { SimpleSignal } from './SimpleSignal';


const Signal = new SimpleSignal();

const peer = Signal.peer

Signal.on('signal', (data) => {
  console.log("This is from the class component", data)
  Signal.print();
})

Signal.on('offer', () => {
  Signal.print();
})



export { peer }

export default Signal
