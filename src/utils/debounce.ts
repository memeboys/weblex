export function debounce<T extends (...args: any[]) => void>(
  delay: number,
  fn: T
): T {
  if (Number.isNaN(delay) || delay <= 0) return fn;
  let timer = 0;
  const _fn: any = (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay) as any;
  };
  return _fn;
}
