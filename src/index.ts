export interface RGB {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}
export interface Stop {
  readonly at: number;
  readonly color: RGB;
}
export function sampleGradient(stops: readonly Stop[], position: number): RGB {
  if (!Array.isArray(stops) || stops.length < 2 || stops.length > 4096)
    throw new RangeError('Expected 2..4096 gradient stops');
  if (typeof position !== 'number' || !Number.isFinite(position))
    throw new TypeError('Position must be finite');
  for (let i = 0; i < stops.length; i++) {
    const s = stops[i]!;
    if (
      typeof s.at !== 'number' ||
      !Number.isFinite(s.at) ||
      s.at < 0 ||
      s.at > 1 ||
      (i > 0 && s.at <= stops[i - 1]!.at)
    )
      throw new RangeError('Stops must have strictly increasing offsets in [0,1]');
    for (const v of [s.color.r, s.color.g, s.color.b])
      if (typeof v !== 'number' || !Number.isFinite(v) || v < 0 || v > 1)
        throw new RangeError('RGB channels must be in [0,1]');
  }
  const p = Math.max(0, Math.min(1, position));
  if (p <= stops[0]!.at) return { ...stops[0]!.color };
  if (p >= stops[stops.length - 1]!.at) return { ...stops[stops.length - 1]!.color };
  let i = 1;
  while (stops[i]!.at < p) i++;
  const a = stops[i - 1]!,
    b = stops[i]!,
    t = (p - a.at) / (b.at - a.at);
  return {
    r: a.color.r + (b.color.r - a.color.r) * t,
    g: a.color.g + (b.color.g - a.color.g) * t,
    b: a.color.b + (b.color.b - a.color.b) * t,
  };
}
