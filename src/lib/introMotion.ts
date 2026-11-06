export const INTRO_SEQUENCE_SECONDS = 4;

export function advanceIntroProgress(
  current: number,
  target: number,
  elapsedMs: number,
) {
  const from = Number.isFinite(current) ? Math.min(1, Math.max(0, current)) : 0;
  const to = Number.isFinite(target) ? Math.min(1, Math.max(0, target)) : from;
  // A stalled/background frame must not fast-forward the sequence on return.
  const elapsed = Number.isFinite(elapsedMs)
    ? Math.min(64, Math.max(0, elapsedMs))
    : 0;
  const step = elapsed / (INTRO_SEQUENCE_SECONDS * 1000);
  const distance = to - from;
  return Math.abs(distance) <= step ? to : from + Math.sign(distance) * step;
}

export function transitionAt(start: number, end: number, progress: number) {
  const value = Math.min(1, Math.max(0, (progress - start) / (end - start)));
  return value * value * (3 - 2 * value);
}

export function getIntroFrame(progress: number) {
  const p = Math.min(1, Math.max(0, progress));
  const assembly = transitionAt(0.01, 0.29, p);
  const court = transitionAt(0.48, 0.86, p);
  return {
    assembly,
    spin: assembly * Math.PI * 2,
    separation: Math.sin(assembly * Math.PI),
    alignment: transitionAt(0.23, 0.33, p),
    symbolOpacity: 1 - transitionAt(0.29, 0.41, p),
    wordmarkOpacity:
      transitionAt(0.29, 0.41, p) * (1 - transitionAt(0.49, 0.61, p)),
    wordmarkScale: 0.86 + transitionAt(0.29, 0.43, p) * 0.14,
    wordmarkY: -transitionAt(0.46, 0.61, p) * 90,
    court,
    copyOpacity: transitionAt(0.64, 0.8, p),
  };
}
