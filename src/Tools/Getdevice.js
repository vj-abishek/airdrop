const device = () => {
  const UA = navigator.userAgent
  const another = UA.split('))')
  const any = another[0].split('(')
  const final = any[1].split(';')
  return final
}

export default device
