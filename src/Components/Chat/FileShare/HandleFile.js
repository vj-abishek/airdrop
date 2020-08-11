let array = '';
export default HandleFile = (file) => {
  while (file.final) {
    const split = file.files.split('data:image/png;base64,');
    array += split;
    return (file.realFile = array);
  }
};
