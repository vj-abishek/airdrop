const device = () => {
  const UA = navigator.userAgent
  UA.split(';')
  return UA
}

export default device
