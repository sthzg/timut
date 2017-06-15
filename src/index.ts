import * as Store from './store';
import * as Logging from './logging';
import {ILoggingOptions} from './logging';

const { TimingEvent } = Store;

/*
 * Exports in this module define the public
 * interface for users of the library.
 */

/**
 * Removes all events from the log store.
 */
export function reset(): void {
  Store.reset();
}

/**
 * Removes events with `context` from the log store.
 */
export function resetContext(context: string): void {
  Store.resetByContext(context);
}

/**
 * Pushes new timing event into the store.
 *
 * @param message log message
 * @param [context=default] context for the message
 * @param [datetime=Date] event time
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
 *
 * @param [context=default] context for the message
 * @param [startWithNewline=false] append \n before log output
 * @param [endWithNewline=false] prepend \n after log output
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
 *
 * @param [context=default] context for the message
 */
export function logWithNewlines(context: string = 'default'): void {
  Logging.logByContext(context, {startWithNewline: true, endWithNewline: true});
}
