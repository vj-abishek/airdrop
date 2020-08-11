const device = () => {
  try {
    const UA = navigator.userAgent;
    const one = UA.split(';');
    const final = one[2].split(')');
    return final;
  } catch (error) {
    return ['iPhone'];
  }
};

export default device;
