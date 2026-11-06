import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('samples two-stop midpoint', () => {
  assert.deepEqual(
    api.sampleGradient(
      [
        { at: 0, color: { r: 0, g: 0, b: 0 } },
        { at: 1, color: { r: 1, g: 1, b: 1 } },
      ],
      0.5,
    ),
    { r: 0.5, g: 0.5, b: 0.5 },
  );
});
test('selects exact interior stop', () => {
  assert.deepEqual(
    api.sampleGradient(
      [
        { at: 0, color: { r: 0, g: 0, b: 0 } },
        { at: 0.5, color: { r: 1, g: 0, b: 0 } },
        { at: 1, color: { r: 1, g: 1, b: 1 } },
      ],
      0.5,
    ),
    { r: 1, g: 0, b: 0 },
  );
});
test('clamps below and above endpoints', () => {
  const s = [
    { at: 0.2, color: { r: 0.2, g: 0.3, b: 0.4 } },
    { at: 0.8, color: { r: 0.8, g: 0.7, b: 0.6 } },
  ];
  assert.deepEqual(api.sampleGradient(s, -1), s[0].color);
  assert.deepEqual(api.sampleGradient(s, 2), s[1].color);
});
test('supports uneven stop spacing', () => {
  const c = api.sampleGradient(
    [
      { at: 0, color: { r: 0, g: 0, b: 0 } },
      { at: 0.25, color: { r: 1, g: 0, b: 0 } },
      { at: 1, color: { r: 1, g: 1, b: 1 } },
    ],
    0.625,
  );
  assert.equal(c.g, 0.5);
});
test('rejects unordered duplicate stops', () => {
  assert.throws(
    () =>
      api.sampleGradient(
        [
          { at: 0, color: { r: 0, g: 0, b: 0 } },
          { at: 0, color: { r: 1, g: 1, b: 1 } },
        ],
        0.5,
      ),
    RangeError,
  );
});
test('rejects invalid channel', () => {
  assert.throws(
    () =>
      api.sampleGradient(
        [
          { at: 0, color: { r: 0, g: 0, b: 0 } },
          { at: 1, color: { r: 1.1, g: 1, b: 1 } },
        ],
        0.5,
      ),
    RangeError,
  );
});
