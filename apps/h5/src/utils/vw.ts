import { round } from 'lodash-es';

const VIEWPORT_WIDTH = 375;

const MAX_DISPLAY_WIDTH = 600;

export function vw(n: number) {
  if (n === 0) return n;

  const vwN = round((n * 100) / VIEWPORT_WIDTH, 3);
  const maxN = round((n * MAX_DISPLAY_WIDTH) / VIEWPORT_WIDTH, 3);
  const cssF = n > 0 ? 'min' : 'max';

  return `${cssF}(${vwN}vw, ${maxN}px)`;
}
