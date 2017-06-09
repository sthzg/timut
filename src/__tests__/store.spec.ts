import 'mocha';
import {expect} from 'chai';
import * as Store from '../store';

const { TimingEvent } = Store;

const ANY_TIMING_EVENTS = [
  new TimingEvent(new Date(), 'default', 'any message'),
  new TimingEvent(new Date(), 'non-default', 'any other message'),
];

describe('Store', () => {
  beforeEach(() => {
    Store.reset();
  });

  context('default behavior', () => {
    it('should have an empty store by default', () => {
      expect(Store.getTimingEvents()).to.deep.eq([]);
    });
  });

  context('reset()', () => {
    it('should be empty after calling `reset()`', () => {
      Store.pushTimingEvents(...ANY_TIMING_EVENTS);
      expect(Store.getTimingEvents()).to.have.length(2);
      Store.reset();
      expect(Store.getTimingEvents()).to.have.length(0);
    });
  });

  context('resetByContext()', () => {
    it('should reset store by context', () => {
      Store.pushTimingEvents(...ANY_TIMING_EVENTS);
      expect(Store.getTimingEvents()).to.have.length(2);
      Store.resetByContext('non-default');
      expect(Store.getTimingEvents()).to.have.length(1);
    });
  });

  context('pushTimingEvents()', () => {
    it('should allow pushing a single event', () => {
      const ev = new TimingEvent(new Date(), 'any', 'any');
      Store.pushTimingEvents(ev);
      expect(Store.getTimingEvents()).to.have.length(1);
      expect(Store.getTimingEvents()[0]).to.eq(ev);
    });

    it('should allow pushing multiple events at once', () => {
      const ev1 = new TimingEvent(new Date(), 'any', 'any-one');
      const ev2 = new TimingEvent(new Date(), 'any', 'any-other');
      Store.pushTimingEvents(ev1, ev2);
      expect(Store.getTimingEvents()).to.have.length(2);
      expect(Store.getTimingEvents()).to.deep.eq([ev1, ev2]);
    });
  });

  context('find by context', () => {
    it('should return events by context', () => {
      const ev1 = new TimingEvent(new Date(), 'any', 'any-one');
      const ev2 = new TimingEvent(new Date(), 'any', 'any-two');
      const ev3 = new TimingEvent(new Date(), 'any-other', 'any-other');
      Store.pushTimingEvents(ev1, ev2, ev3);
      expect(Store.findByContext('any')).to.have.length(2);
    });
  });
});
