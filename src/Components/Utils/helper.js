export const isMobile = 'ontouchstart' in window || navigator.msMaxTouchPoints;

export function getChromeVersion() {
    const raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);

    return raw ? parseInt(raw[2], 10) : false;
}
