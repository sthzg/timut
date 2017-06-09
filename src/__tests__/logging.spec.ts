import 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as Logging from '../logging';
import * as Store from '../store';

chai.use(sinonChai);

const { expect } = chai;
const { TimingEvent } = Store;

const ANY_TIMESTAMP_START: number = 1483228861007;
const ANY_TIMESTAMP_MIDDLE: number = ANY_TIMESTAMP_START + 2134;
const ANY_TIMESTAMP_END: number = ANY_TIMESTAMP_MIDDLE + 2134;

/* tslint:disable max-line-length */
const ANY_OUTPUT = [
  'Time          |  Context     |  Message                                                       |  Rel. Delta  |  Abs. Delta',
  '--------------------------------------------------------------------------------------------------------------------------',
  '00:01:01:007  |  any.......  |  any-one.....................................................  |         0ms  |         0ms',
  '00:01:05:275  |  any.......  |  any-other...................................................  |     +4268ms  |     +4268ms',
].join('\n');
/* tslint-enable: max-len */

describe('Logging', () => {
  const sandbox = sinon.sandbox.create();

  beforeEach(() => {
    Store.reset();
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('log by context', () => {
    it('should log time events to console', () => {
      const consoleStub = sandbox.stub(console, 'log').returns(undefined);

      const ev1 = new TimingEvent(new Date(ANY_TIMESTAMP_START), 'any', 'any-one');
      const ev2 = new TimingEvent(new Date(ANY_TIMESTAMP_END), 'any', 'any-other');
      Store.pushTimingEvents(ev1, ev2);

      Logging.logByContext('any');

      expect(consoleStub).to.have.been.calledOnce;
      expect(consoleStub.args[0][0]).to.eq(ANY_OUTPUT);
    });

    it('should support `startWithNewline` option', () => {
      const consoleStub = sandbox.stub(console, 'log').returns(undefined);

      const ev1 = new TimingEvent(new Date(ANY_TIMESTAMP_START), 'any', 'any-one');
      const ev2 = new TimingEvent(new Date(ANY_TIMESTAMP_END), 'any', 'any-other');
      Store.pushTimingEvents(ev1, ev2);

      Logging.logByContext('any', { startWithNewline: true });

      expect(consoleStub.args[0][0]).to.eq(`\n${ANY_OUTPUT}`);
    });

    it('should support `endWithNewline` option', () => {
      const consoleStub = sandbox.stub(console, 'log').returns(undefined);

      const ev1 = new TimingEvent(new Date(ANY_TIMESTAMP_START), 'any', 'any-one');
      const ev2 = new TimingEvent(new Date(ANY_TIMESTAMP_END), 'any', 'any-other');
      Store.pushTimingEvents(ev1, ev2);

      Logging.logByContext('any', { endWithNewline: true });

      expect(consoleStub.args[0][0]).to.eq(`${ANY_OUTPUT}\n`);
    });
  });
});
