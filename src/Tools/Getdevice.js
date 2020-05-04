const device = () => {
  const UA = navigator.userAgent
  const one = UA.split(';')
  const final = one[0].split('(')
  return final
}

export default device
