export type TimingEvents = TimingEvent[];

/** Data class holding a single time event entry. */
export class TimingEvent {
  constructor(
    readonly datetime: Date,
    readonly context: string,
    readonly message: string,
  ) {}
}

let timingEvents: TimingEvents = [];

/**
 * Returns current store.
 */
export function getTimingEvents(): TimingEvents {
  return timingEvents;
}

/**
 * Pushes instances of `TimingEvents` on the store.
 */
export function pushTimingEvents(...events: TimingEvents): void {
  timingEvents.push(...events);
}

/**
 * Removes all events.
 */
export function reset(): void {
  timingEvents = [];
}

/**
 * Removes all events with `context`.
 * @param context
 */
export function resetByContext(context: string = 'default'): void {
  timingEvents = timingEvents
    .filter(entry => entry.context !== context);
}

/**
 * Returns array of timing events with `context`.
 */
export function findByContext(context: string = 'default'): TimingEvent[] {
  return getTimingEvents()
    .filter(entry => entry.context === context);
}
