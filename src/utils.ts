/**
 * Returns last item from an array-like object.
 */
export function last<T>(input: T[]): T {
  return input[input.length - 1];
}

/**
 * Returns first item from an array-like object.
 */
export function first<T>(input: T[]): T {
  return input[0];
}

/**
 * Returns index-1'th item from an array-like object.
 */
export function previous<T>(input: T[], index: number): T {
  return input[index - 1];
}

/**
 * Returns the time-relevant portion of the timing event.
 */
export function toPreciseTimeString(date: Date): string {
  return [
    leftPad(date.getUTCHours().toString(), 2, '0'),
    leftPad(date.getUTCMinutes().toString(), 2, '0'),
    leftPad(date.getUTCSeconds().toString(), 2, '0'),
    leftPad(date.getUTCMilliseconds().toString(), 3, '0'),
  ]
    .join(':');
}

/**
 * Returns delta of milliseconds between two dates.
 */
export function calculateDelta(minuend: Date, subtrahend: Date): number {
  return minuend.getTime() - subtrahend.getTime();
}

/*
 * Code below is taken from the MIT licensed underscore.string library.
 * https://github.com/epeli/underscore.string
 *
 * Copyrights and all credits to their authors.
 */
function pad(str: string, length: number, padStr: string, type: string): string {
  const padLength = length - str.length;

  if (padLength < 0) {
    return str.substring(0, length);
  }

  switch (type) {
    case 'right':
      return `${str}${padStr.repeat(padLength)}`;
    case 'both':
      return `${padStr.repeat(Math.ceil(padLength / 2))}${str}${padStr.repeat(Math.floor(padLength / 2))}`;
    default:
      return `${padStr.repeat(padLength)}${str}`;
  }
}

export function leftPad(input: string, length: number, char: string = ' '): string {
  return pad(input, length, char, 'left');
}

export function rightPad(input: string, length: number, char: string = ' '): string {
  return pad(input, length, char, 'right');
}
