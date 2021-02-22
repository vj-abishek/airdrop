const isMobile =
  navigator.maxTouchPoints || 'ontouchstart' in document.documentElement;

export default isMobile;
