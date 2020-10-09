export let recievedFile = [];

export const Ripme = (data) => {
  while (data.chunk <= data.chunks) {
    const file = data.file !== undefined ? data.file : '';

    const only = file.split(`data:${data.type};base64,`);
    const base = only[1];
    recievedFile = [...recievedFile, base];
  }
};
