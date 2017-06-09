import 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as Logging from '../logging';
import * as Index from '../index';
import * as Store from '../store';

chai.use(sinonChai);

const { expect } = chai;

describe('Index', () => {
  const sandbox = sinon.sandbox.create();

  beforeEach(() => {
    Store.reset();
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('reset()', () => {
    it('should invoke `reset()` on the store', () => {
      const resetStub = sandbox.stub(Store, 'reset').returns(undefined);
      Index.reset();
      expect(resetStub).to.have.been.calledOnce;
    });
  });

  context('resetContext()', () => {
    it('should invoke `resetContext()` on the store', () => {
      const resetContextStub = sandbox.stub(Store, 'resetByContext').returns(undefined);
      Index.resetContext('any');
      expect(resetContextStub).to.have.been.calledOnce;
    });
  });

  context('push()', () => {
    it('should invoke `push()` on the store', () => {
      const pushStub = sandbox.stub(Store, 'pushTimingEvents').returns(undefined);
      Index.push();
      expect(pushStub).to.have.been.calledOnce;
    });
  });

  context('log()', () => {
    it('should invoke `log()` on the logger', () => {
      const logStub = sandbox.stub(Logging, 'logByContext').returns(undefined);
      Index.log();
      expect(logStub).to.have.been.calledOnce;
    });
  });

  context('logWithNewlines()', () => {
    it('should invoke `log()` on the logger with the appropriate options', () => {
      const logStub = sandbox.stub(Logging, 'logByContext').returns(undefined);
      Index.logWithNewlines();
      expect(logStub).to.have.been.calledOnce;
      expect(logStub.args[0][1]).to.deep.equal({
        startWithNewline: true,
        endWithNewline: true,
      });
    });
  });
});
