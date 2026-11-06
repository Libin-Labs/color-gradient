# @lp-labs/color-gradient

Validated multi-stop RGB gradient sampling with deterministic endpoint and duplicate-stop policies.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/color-gradient
```

## Working example

```js
import { sampleGradient } from '@lp-labs/color-gradient';
const middle = sampleGradient(
  [
    { at: 0, color: { r: 0, g: 0, b: 0 } },
    { at: 1, color: { r: 1, g: 1, b: 1 } },
  ],
  0.5,
);
if (middle.r !== 0.5) throw new Error('Unexpected midpoint');
```

CommonJS: `const api = require('@lp-labs/color-gradient')`.

## Behavior, customization and limits

Samples ordered opaque sRGB stops by linear interpolation of encoded channel values. Stops must have strictly increasing offsets in [0,1]; endpoint positions clamp to the first and last stop.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export interface RGB {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}
export interface Stop {
  readonly at: number;
  readonly color: RGB;
}
export declare function sampleGradient(stops: readonly Stop[], position: number): RGB;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
