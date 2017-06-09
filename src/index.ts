import * as Store from './store';
import * as Logging from './logging';
import {ILoggingOptions} from './logging';

const { TimingEvent } = Store;

/*
 * Exports in this module define the public
 * interface for users of the library.
 */

/**
 * Removes all events.
 */
export function reset(): void {
  Store.reset();
}

/**
 * Removes events with `context`.
 */
export function resetContext(context: string): void {
  Store.resetByContext(context);
}

/**
 * Pushes new timing event into the store.
 */
export function push(
  message: string = '',
  context: string = 'default',
  datetime: Date = new Date(),
): void {
  Store.pushTimingEvents(new TimingEvent(datetime, context, message));
}

/**
 * Logs timing table for `context` to console.
 */
export function log(
  context: string = 'default',
  {
    startWithNewline = false,
    endWithNewline = false,
  }: ILoggingOptions = {},
): void {
  Logging.logByContext(context, {startWithNewline, endWithNewline});
}

/**
 * Logs timing table with newlines at beginning and end.
 */
export function logWithNewlines(context: string = 'default'): void {
  Logging.logByContext(context, {startWithNewline: true, endWithNewline: true});
}
