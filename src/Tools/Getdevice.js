const device = () => {
  const UA = navigator.userAgent
  const final = UA.split(';')
  return final
}

export default device
