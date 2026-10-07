export const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');

export const pad = (n: number, length = 2) => String(n).padStart(length, '0');
