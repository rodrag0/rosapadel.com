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
