/* tslint:disable no-console */
import * as Store from './store';
import * as Utils from './utils';

/*
 * Interfaces.
 */

export interface ILoggingOptions {
  startWithNewline?: boolean;
  endWithNewline?: boolean;
}

/*
 * Data Classes.
 */

export class EventLogLineItem {
  constructor(
    readonly datetime: Date,
    readonly context: string,
    readonly message: string,
    readonly deltaRelative: string,
    readonly deltaAbsolute: string,
  ) {}
}

export class EventLogData {
  started: Date;
  ended: Date;
  duration: number;
  eventLogs: EventLogLineItem[] = [];
}

/*
 * Internal Helpers.
 */

function buildEventLogData(logEvents: Store.TimingEvent[]): EventLogData {
  const eventLogData = new EventLogData();
  eventLogData.started = Utils.first(logEvents).datetime;
  eventLogData.ended = Utils.last(logEvents).datetime;
  eventLogData.duration = eventLogData.ended.getTime() - eventLogData.started.getTime();

  return logEvents
    .reduce((acc: EventLogData, current: Store.TimingEvent, index: number): EventLogData => {
      const deltaRelative: string = index > 0
        ? `+${Utils.calculateDelta(current.datetime, Utils.previous(logEvents, index).datetime)}ms`
        : ' 0ms';

      const deltaAbsolute = index > 0
        ? `+${Utils.calculateDelta(current.datetime, Utils.first(logEvents).datetime)}ms`
        : ' 0ms';

      acc.eventLogs.push(
        new EventLogLineItem(
          current.datetime,
          current.context,
          current.message,
          deltaRelative,
          deltaAbsolute,
        ),
      );

      return eventLogData;
    }, eventLogData);
}

function buildHeadersOutput(): string {
  const separator: string = '-'.repeat(122);
  return [[
    Utils.rightPad('Time', 12),
    Utils.rightPad('Context', 10),
    Utils.rightPad('Message', 60),
    Utils.rightPad('Rel. Delta', 10),
    Utils.rightPad('Abs. Delta', 10),
  ].join('  |  '), separator].join('\n');
}

function buildBodyOutput(eventLogData: EventLogData): string {
  return eventLogData.eventLogs.map(logItem => [
    Utils.toPreciseTimeString(logItem.datetime),
    Utils.rightPad(logItem.context, 10, '.'),
    Utils.rightPad(logItem.message, 60, '.'),
    Utils.leftPad(logItem.deltaRelative, 10),
    Utils.leftPad(logItem.deltaAbsolute, 10),
  ].join('  |  ')).join('\n');
}

/*
 * Function Exports.
 */

export function logByContext(
  context: string = 'default',
  {
    startWithNewline = false,
    endWithNewline = false,
  }: ILoggingOptions = {},
): void {
  const timingEvents: Store.TimingEvent[] = Store.findByContext(context);

  const before: string = startWithNewline ? '\n' : '';
  const after: string = endWithNewline ? '\n' : '';

  if (timingEvents.length === 0) {
    console.log(`${before}No entries found for context ${context}${after}`);
    return;
  }

  const tableHead: string = buildHeadersOutput();
  const tableBody: string = buildBodyOutput(buildEventLogData(timingEvents));

  console.log(`${before}${tableHead}\n${tableBody}${after}`);
}
