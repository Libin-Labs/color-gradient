import * as api from '@lp-labs/color-gradient';
import { sampleGradient } from '@lp-labs/color-gradient';
const middle = sampleGradient(
  [
    { at: 0, color: { r: 0, g: 0, b: 0 } },
    { at: 1, color: { r: 1, g: 1, b: 1 } },
  ],
  0.5,
);
if (middle.r !== 0.5) throw new Error('Unexpected midpoint');
// @ts-expect-error invalid argument must be rejected by declarations
api.sampleGradient([], 'bad');
